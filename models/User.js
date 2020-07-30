const mongoose =require('mongoose') 
require('mongoose-type-email');
const bcrypt = require('bcrypt');

mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid';

    const UserSchema = new mongoose.Schema({
        username:{
            type: String,
            required: true,
            min: 6,
            max: 15
        },
        password:{
            type: String,
            required:true
        },
        role:{
            type: String,
            enum: ['user','admin'],
            required: true
        },
        email:{
            type: mongoose.SchemaTypes.Email,
            required: true
        },
        firstname:{
            type: String,
            required: true,
        },
        lastname:{
            type: String,
            required: true,
        },
        notes:[{type:mongoose.Schema.Types.ObjectId, ref:'Note'}]
    },
        {
            collection: 'UserData'
        }
    );

UserSchema.pre('save',function(next){
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

UserSchema.methods.MatchPassword = function(password,callback){
    bcrypt.compare(password,this.password,(err,isMatch) =>{
        if(err)
            return callback(err);
        else
        {
            if(!isMatch)
                return callback(null,isMatch);
            else
                return callback(null,this);
        }
    });
}

module.exports =mongoose.model('UserData',UserSchema);