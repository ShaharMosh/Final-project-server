import mongoose from 'mongoose';

const ShoeSizeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const ShoeSize = mongoose.model('ShoeSize', ShoeSizeSchema);

const predefinedShoeSizes = [
    { name: '35' },
    { name: '36' },
    { name: '37' },
    { name: '38' },
    { name: '39' },
    { name: '40' },
    { name: '41' },
    { name: '42' },
    { name: '43' },
    { name: '44' },
    { name: '45' },
    { name: '46' },
    { name: '47' },
    { name: '48' },
    { name: '49' },
    { name: '50' },
];

const createPredefinedShoeSizes = async () => {
    try {
        for (const shoesizeData of predefinedShoeSizes) {
            const existingSize = await ShoeSize.findOne({ name: shoesizeData.name });
            if (!existingSize) {
                await ShoeSize.create(shoesizeData);
            }
        }
    } catch (error) {
        console.error('Error adding predefined ShoeSizes:', error);
    }
};

// Connect to the MongoDB server
mongoose.connect('mongodb://127.0.0.1:27017/db_server', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => createPredefinedShoeSizes());

export default ShoeSize;