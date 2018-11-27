var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

// Finance Schema
var FinanceSchema = new Schema({
    order: {
        type: Number,
        default: null,
        required: true,
    },
    use_date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    usage: {
        type: String,
        required: true,
        enum: ['dues', 'dining expenses', 'study subsidy', 'etc'],
        default: 'etc'
    },
    detail: {
        type: String,
        max: 50
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    income: {
        type: Number,
        required: true,
        default: 0
    },
    outcome: {
        type: Number,
        required: true,
        default: 0
    },
    total: {
        type: Number,
        required: true
    }
});

// Virtual for finance's url
FinanceSchema
.virtual('url')
.get(function() {
    return '/api/finances/' + this._id;
});

// Virtual for finance's use_date formatted
FinanceSchema
.virtual('use_date_formatted')
.get(function(){
    return moment(this.use_date).format('YYYY. MM. DD.');
});

module.exports = mongoose.model('Finance', FinanceSchema);