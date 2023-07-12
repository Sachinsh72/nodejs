const mongoose = require('mongoose');
const {Schema} = mongoose;
const JWT = require('jsonwebtoken')
const userSchema = new Schema({

    name: {
        type: String,
        require: [true, 'Username is Required'],
        minLength : [5,'Name must be at least 5 char'],
        maxLength : [50, 'Name must be less than 50 char'],
        trim: true
    },
    email: {
        type: String,
        require: [true, 'user email is Required'],
        unique: true,
        lowercase: true,
        unique: [true,'already registered']
    },
    password: {
        type: String,
        select:false
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordExpiryDate: {
        type: Date,
    },
    
},{timestamp : true});

userSchema.methods = {
    jwtToken(){
        return JWT.sign(
            {id: this._id, email: this.email},
            process.env.SECRET,
            {expiresIn: '24h'})
    }
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;