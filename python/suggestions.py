import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient
from bson import ObjectId
import sys
import json

def get_top_similar_items(ids):
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

    # Create a combined list of attributes for each item
    attributes = clothes.apply(lambda row: [row['category'], row['color'][0], row['gender'], row['size'][0]], axis=1).tolist()

    # Create a bag of words representation of the item attributes
    def create_bow(attribute_list):
        bow = {}
        for attribute in attribute_list:
            bow[attribute] = 1
        return bow

    # Create a list of bags of words representations of the item attributes
    bags_of_words = [create_bow(item_attributes) for item_attributes in attributes]

    # Create a dataframe to store the bags of words representation of the item attributes
    attribute_df = pd.DataFrame(bags_of_words, index=obj_ids).fillna(0)

    # Calculate the cosine similarity matrix between the items
    cosine_sim = cosine_similarity(attribute_df)

    # Create a dataframe with the cosine similarity scores
    similarity_df = pd.DataFrame(cosine_sim, index=attribute_df.index, columns=attribute_df.index)

    # List to store top 3 similar items for each object ID
    all_top_items = []

    # Iterate over the provided ids
    for obj_id in ids:
        # Convert obj_id to ObjectId
        obj_id = ObjectId(obj_id)

        # Find the index of the item in the similarity dataframe
        item_index = similarity_df.index.get_loc(obj_id)

        # Get the gender of the input item
        input_gender = clothes.loc[clothes['_id'] == obj_id, 'gender'].iloc[0]

        # Adjust the similarity scores based on gender
        for idx, other_obj_id in enumerate(similarity_df.index):
            item_gender = clothes.loc[clothes['_id'] == other_obj_id, 'gender'].iloc[0]
            if item_gender != input_gender or other_obj_id == obj_id:
                similarity_df.iloc[item_index, idx] = 0

        # Get the top 3 most similar items to the item
        top_3 = similarity_df.iloc[item_index].sort_values(ascending=False)[0:3]

        # Store top 3 similar items for this objID
        all_top_items.extend(top_3.index.tolist())

    # Return all 9 items without ObjectId wrapper
    return [str(item_id) for item_id in all_top_items]

if __name__ == "__main__":
    # Get the list of selected item IDs from the command-line arguments
    selected_item_ids = sys.argv[1:]
    top_similar_items = get_top_similar_items(selected_item_ids)
    print(json.dumps({"similar_items": top_similar_items}))