import pandas as pd
import random
import json
import sys
from sklearn.preprocessing import OneHotEncoder
from sklearn.cluster import KMeans
from pymongo import MongoClient
from bson.objectid import ObjectId

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['db_server']
users_collection = db['users']
items_collection = db['items']

# Specify the user ID
user_id = sys.argv[1]

# user_id = '66327b0bc9832a77d3553082'
# user_id = '662b664f3034a21aeec1745f'
object_id = ObjectId(user_id)

# Fetch the specific user
user = users_collection.find_one({'_id': object_id})
if user:
    wishlist = user.get('wishlist', [])
    wishlist_items = []

    for item_id in wishlist:
        item = items_collection.find_one({'_id': ObjectId(item_id)})
        if item:
            color = [str(c) if isinstance(c, ObjectId) else c for c in item.get('color', [])]
            category = item.get('category', [])
            if isinstance(category, ObjectId):
                category = [str(category)]
            elif isinstance(category, list):
                category = [str(c) if isinstance(c, ObjectId) else c for c in category]
            else:
                category = [str(category)]
            wishlist_items.append({
                'item_id': str(item['_id']),
                'color': color,
                'category': category,
            })

    # Convert wishlist items to DataFrame for analysis
    wishlist_db = pd.DataFrame(wishlist_items)
    wishlist_ids = [item['item_id'] for item in wishlist_items]
else:
    wishlist_db = pd.DataFrame()

# If we have wishlist items
if not wishlist_db.empty:
    # Preprocess data
    wishlist_db['color'] = wishlist_db['color'].apply(lambda x: ' '.join(map(str, x)) if isinstance(x, list) else x)
    wishlist_db['category'] = wishlist_db['category'].apply(lambda x: ' '.join(map(str, x)) if isinstance(x, list) else x)

    # Create a unique identifier for each combination of color and category
    wishlist_db['color_category'] = wishlist_db['color'] + '_' + wishlist_db['category']

    # Encode the unique color_category combinations
    encoder = OneHotEncoder(sparse_output=False)
    encoded_features = encoder.fit_transform(wishlist_db[['color_category']])

    X = encoded_features

    # Ensure number of clusters is equal to number of unique color_category combinations
    num_clusters = wishlist_db['color_category'].nunique()

    # Apply K-Means clustering
    kmeans = KMeans(n_clusters=num_clusters, random_state=42)
    wishlist_db['cluster'] = kmeans.fit_predict(X)

    # Print clusters
    clusters = wishlist_db.groupby('cluster')['item_id'].apply(list).to_dict()

    # Sort clusters by number of items
    sorted_clusters = sorted(clusters.items(), key=lambda x: len(x[1]), reverse=True)

    # If there are less than 3 clusters
    if len(sorted_clusters) < 3:
        selected_items = [random.choice(cluster[1]) for cluster in sorted_clusters]
    else:
        top_3_clusters = sorted_clusters[:3]
        selected_items = [random.choice(cluster[1]) for cluster in top_3_clusters]

    # Output the selected items as JSON
    output = {
        "selected_items": selected_items,
        "wishlist_ids": wishlist_ids
    }
    print(json.dumps(output))
else:
    output = {
        "selected_items": [],
        "wishlist_ids": []
    }
    print(json.dumps(output))