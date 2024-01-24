import mongoose from 'mongoose'

const StoreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});
const Store = mongoose.model('Store', StoreSchema);

// Connect to the MongoDB server
mongoose.connect('mongodb://127.0.0.1:27017/db_server', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
export default Store;
