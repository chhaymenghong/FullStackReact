const mongoose = require('mongoose');
const { Schema } = mongoose;
// If we decide to use Mongoose to interact with MongoDB, we lose the Schema-less property of
// MongoDB since Mongoose requires us to create a schema to interact with data in MongoDB
const userSchema = new Schema({
   googleId: String
});

// Create a User model class (using userSchema) if not yet exist
// This model class allows creation of new user instance and querying of user instances
mongoose.model('users', userSchema);