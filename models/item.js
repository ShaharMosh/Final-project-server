import mongoose from 'mongoose'

const ItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    gender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gender',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    color: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
        required: true
    }],
    size: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        validate: {
            validator: async function (value) {
                const sizeModel = this.sizeModel;

                if (sizeModel === 'Size') {
                    const SizeModel = mongoose.model('Size');
                    const size = await SizeModel.findById(value);
                    return size !== null;
                } else if (sizeModel === 'ShoeSize') {
                    const ShoeSizeModel = mongoose.model('ShoeSize');
                    const shoeSize = await ShoeSizeModel.findById(value);
                    return shoeSize !== null;
                }

                return false; // Invalid sizeModel value
            },
            message: 'Invalid size ID for the specified sizeModel',
        },
    }],
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    sizeModel: {
        type: String,
        required: true,
        enum: ['Size', 'ShoeSize'],
    },
});
const Item = mongoose.model('Item', ItemSchema);

// Connect to the MongoDB server
mongoose.connect('mongodb://127.0.0.1:27017/db_server', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
export default Item;
