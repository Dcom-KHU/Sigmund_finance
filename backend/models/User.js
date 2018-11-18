var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// User schema
var UserSchema = new Schema({
    user_id: {
        type: String, 
        required: [true, "Please check ID"], 
        min: 5,
        max: 20
    },
    password: {
        type: String, 
        required: [true, "Please check password"],
        min: 10,
        max: 30
    },
    name: {
        type: String, 
        required: [true, "Please check name"],
        max: 10
    },
    grade: {
        type: Number, 
        required: [true, "Please check grade"],
        min: 1, 
        max: 6, 
        set: v => Math.round(v), 
        get: v => Math.round(v)
    },
    student_id: {
        type: String, 
        required: [true, "Please check student id"],
        min: 10, 
        max: 10
    },
    status: {
        type: String, 
        required: [true, "Please check status"],
        enum: ['Attending', 'Leave', 'Military leave', 'Graduated'], 
        default: 'Leave'
    },
    position: {
        type: String,
        required: [true, "Please check position"],
        enum: ['Admin', 'Member'],
        default: 'Member'
    },
    is_active: {
        type: Boolean, 
        required: true,
        default: true
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
        type: Date,
        required: true
    },
    reg_date: {
        type: Date,
        required: true,
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
    return '/api/user/' + this._id;
});

module.exports = mongoose.model('User', UserSchema);