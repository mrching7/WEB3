var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Insert your full name!'
    },
    email: {
        type: String,
        required: 'Insert your email!',
        unique: true
    },
    password: {
        type: String,
        required: 'Insert your password',
        minlength : [4, 'Password must be atleast 4 char long']
    },
    saltSecret: String
});

userSchema.pre('save', function (next){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateJwt = function() {
    return jwt.sign({_id: this._id},
    process.env.JWT_SECRET || "SECRET#123",
    {
        expiresIn: process.env.JWT_EXP || "2m"
    });
}

mongoose.model('User', userSchema);
