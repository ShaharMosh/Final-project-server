import mongoose from 'mongoose';

// Define the UserPassName schema
const UserPassNameSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    password: {
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
    },
   
    // contacts: [{
    //     username:{
    //     type: String
    //     }
    // }],

});

// Create a Mongoose model
const UserPassName = mongoose.model('Users', UserPassNameSchema);

// Connect to the MongoDB server
mongoose.connect('mongodb://127.0.0.1:27017/db_server', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export default UserPassName;