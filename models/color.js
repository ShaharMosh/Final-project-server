import mongoose from 'mongoose'

const ColorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});
const Color = mongoose.model('Color', ColorSchema);

// Connect to the MongoDB server
mongoose.connect('mongodb://127.0.0.1:27017/db_server', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
export default Color;
