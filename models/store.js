import mongoose from 'mongoose'

const StoreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});
const Store = mongoose.model('Store', StoreSchema);

const predefinedStores = [
    { name: 'Castro' },
    { name: 'Renuar' },
    { name: 'FashionClub' },
    { name: 'Golf' },
    { name: 'H&O' },
    { name: 'StudioPasha' },
    { name: 'Urbanica' },
    { name: 'TwentyFourSeven' },
    { name: 'Hoodies' },
];

const createPredefinedStores = async () => {
    try {
        for (const storeData of predefinedStores) {
            const existingStore = await Store.findOne({ name: storeData.name });
            if (!existingStore) {
                await Store.create(storeData);
            }
        }
    } catch (error) {
        console.error('Error adding predefined stores:', error);
    }
};

// Connect to the MongoDB server
mongoose.connect('mongodb://127.0.0.1:27017/db_server', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => createPredefinedStores());

export default Store;