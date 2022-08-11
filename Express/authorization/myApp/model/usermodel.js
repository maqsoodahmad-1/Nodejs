const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const passportLocalMongoose = require('passport-local-mongoose');
// require('dotenv').config();
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
const userSchema = new mongoose.Schema ({
   first_name: { type: String, default: null,required:true },
  //  last_name: { type: String, default: null,required:true },
   email: { type: String, unique: true },
   password: { type: String,required:true},
   token: { type: String },
 });

//Exporting 
// Setting up the passport plugin
userSchema.plugin(passportLocalMongoose);
 var userModel= mongoose.model("users", userSchema);

module.exports = userModel;

module.exports.createUser = (newUser, callback) => {
bcryptjs.genSalt(10, (err, salt) => {
bcryptjs.hash(newUser.password, salt, (error, hash) => {
// store the hashed password
const newUserResource = newUser;
newUserResource.password = hash;
newUserResource.save(callback);
});
});
};

module.exports.getUserByEmail = (email, callback) => {
const query = { email };
User.findOne(query, callback);
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
bcryptjs.compare(candidatePassword, hash, (err, isMatch) => {
if (err) throw err;
callback(null, isMatch);
});
};