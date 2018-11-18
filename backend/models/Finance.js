var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Finance Schema
var FinanceSchema = new Schema({
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
        required: true,
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
    return '/api/finance/' + this._id;
});

module.exports = mongoose.model('Finance', FinanceSchema);