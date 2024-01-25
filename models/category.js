import mongoose from 'mongoose'

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});
const Category = mongoose.model('Category', CategorySchema);

// Connect to the MongoDB server
mongoose.connect('mongodb://127.0.0.1:27017/db_server', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
export default Category;
