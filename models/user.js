import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const User = new Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});
export default mongoose.model('User', User);
