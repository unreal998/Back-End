const mongoose = require( `mongoose`);
const bcrypt = require(`bcrypt-nodejs`);
const userSchem = mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password:{
    type: String,

  },
  name:{
    type:String,
    unique: false,
  },
  lastName:{
    type:String,
    unique: false,
  },
  avatar:{
    type: String,
    unique: false,
  }
});

userSchem.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};
userSchem.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user", userSchem );
