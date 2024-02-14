import mongoose from 'mongoose';

const SizeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const Size = mongoose.model('Size', SizeSchema);

const predefinedSizes = [
    { name: 'XXS' },
    { name: 'XS' },
    { name: 'S' },
    { name: 'M' },
    { name: 'L' },
    { name: 'XL' },
    { name: 'XXL' },
    { name: 'XXXL' },
    { name: '32' },
    { name: '34' },
    { name: '36' },
    { name: '38' },
    { name: '40' },
    { name: '42' },
    { name: '44' },
    { name: '46' },
    { name: '48' },
];

const createPredefinedSizes = async () => {
    try {
        for (const sizeData of predefinedSizes) {
            const existingSize = await Size.findOne({ name: sizeData.name });
            if (!existingSize) {
                await Size.create(sizeData);
            }
        }
    } catch (error) {
        console.error('Error adding predefined sizes:', error);
    }
};

// Connect to the MongoDB server
mongoose.connect('mongodb://127.0.0.1:27017/db_server', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => createPredefinedSizes());

export default Size;