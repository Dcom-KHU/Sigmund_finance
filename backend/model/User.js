var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// User schema
var UserSchema = new Schema({
    userid: {
        type: String, 
        required: true, 
        max:20
    },
    password: {
        type: String, 
        required: true,
        max: 30
    },
    name: {
        type: String, 
        required: true,
        max: 10
    },
    grade: {
        type: Number, 
        required: true, 
        min: 1, 
        max: 6, 
        set: v => Math.round(v), 
        get: v => Math.round(v)
    },
    student_id: {
        type: String, 
        required: true, 
        min: 10, 
        max: 10
    },
    status: {
        type: String, 
        enum: ['Attending', 'Leave', 'Military leave', 'Graduated'], 
        default: 'Leave'
    },
    posision: {
        type: String,
        enum: ['Admin', 'Member'],
        default: 'Member'
    },
    is_inactive: {
        type: Boolean, 
        default: false
    },
    phone: {
        type: String, 
        min: 12, 
        max: 13
    },
    email: {
        type: String, 
        max: 30
    },
    lastlogin: {
        type: Date
    },
    reg_date: {
        type: Date,
        default: Date.now()
    }
});

// Virtual for User's admission year
UserSchema
.virtual('admission_year')
.get(function() {
    return this.student_id.substring(2, 4);
});

// Virtual for User's url
UserSchema
.virtual('url')
.get(function() {
    return '/user/' + this._id;
});

module.exports = mongoose.model('User', UserSchema);