import mongoose from 'mongoose'

const SizeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});
const Size = mongoose.model('Size', SizeSchema);

// Connect to the MongoDB server
mongoose.connect('mongodb://127.0.0.1:27017/db_server', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
export default Size;
