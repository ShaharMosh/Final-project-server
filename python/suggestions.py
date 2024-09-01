import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient
from bson import ObjectId
import sys
import json
import numpy as np

def get_top_similar_items(selected_ids, wishlist_ids):
    # Connect to MongoDB
    client = MongoClient('mongodb://localhost:27017/')
    db = client['db_server']
    collection = db['items']

    # Extract data from MongoDB collection
    clothes_data = collection.find()

    # Create a DataFrame from MongoDB data
    clothes = pd.DataFrame(list(clothes_data))

    # Specify column names for the clothes data
    column_names = ["_id", "category", "color", "gender", "size"]

    # Select only required columns and rename them
    clothes = clothes[column_names]

    # Add ItemID as a counter index
    clothes['ItemID'] = range(1, len(clothes) + 1)
    clothes.set_index('ItemID', inplace=True)

    # Extract the item names and other attributes into separate lists
    obj_ids = clothes['_id'].tolist()

    # Set weights for category and color
    category_weight = 3  
    color_weight = 3     

    # Create a combined list of attributes for each item
    def create_bow(row):
        bow = {}
        bow[row['category']] = category_weight
        bow[row['color'][0]] = color_weight
        bow[row['gender']] = 1
        bow[row['size'][0]] = 1
        return bow

    # Create a list of bags of words representations of the item attributes
    bags_of_words = clothes.apply(create_bow, axis=1).tolist()

    # Create a dataframe to store the bags of words representation of the item attributes
    attribute_df = pd.DataFrame(bags_of_words, index=obj_ids).fillna(0)

    # Calculate the cosine similarity matrix between the items
    cosine_sim = cosine_similarity(attribute_df)

    # Create a dataframe with the cosine similarity scores
    similarity_df = pd.DataFrame(cosine_sim, index=attribute_df.index, columns=attribute_df.index)

    # Precompute gender and wishlist mask for faster application inside the loop
    genders = clothes['gender'].values
    wishlist_set = set(wishlist_ids)

    # Store top 3 similar items for each object ID
    all_top_items = []
    detailed_similar_items = {}

    # Convert selected_ids to ObjectId for matching with the DataFrame index
    selected_ids = [ObjectId(id) for id in selected_ids]

    for obj_id in selected_ids:
        # Find the index of the item in the similarity dataframe
        item_index = similarity_df.index.get_loc(obj_id)

        # Get the gender of the input item
        input_gender = genders[item_index]

        # Create mask to zero out similarities with different gender and wishlist items
        gender_mask = (genders == input_gender)
        wishlist_mask = np.array([str(oid) not in wishlist_set for oid in similarity_df.index])
        mask = gender_mask & wishlist_mask

        # Zero out non-matching items directly in the similarity matrix
        similarity_df.iloc[item_index] *= mask

        # Get the top 3 most similar items to the item
        top_3 = similarity_df.iloc[item_index].sort_values(ascending=False)[0:3]

        # Store top 3 similar items for this objID
        detailed_similar_items[str(obj_id)] = [str(item_id) for item_id in top_3.index.tolist()]

        # Append top 3 similar items to all_top_items in the order
        all_top_items.extend(top_3.index.tolist())

    # Ensure unique items in the order they were added
    all_top_items = list(dict.fromkeys([str(item_id) for item_id in all_top_items]))

    return all_top_items, detailed_similar_items

if __name__ == "__main__":
    args = sys.argv[1:]
    selected_item_ids = args[0].split(',')
    wishlist_item_ids = args[1].split(',')
    top_similar_items, detailed_similar_items = get_top_similar_items(selected_item_ids, wishlist_item_ids)
    print(json.dumps({"similar_items": top_similar_items, "detailed_similar_items": detailed_similar_items}))
