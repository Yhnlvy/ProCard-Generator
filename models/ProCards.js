/**
 * Created by Yohan on 23/05/2016.
 */

var mongoose = require('mongoose');

var ProCardSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    number: {type: Number, default: 0},
    birthday: { type: Date, default: Date.now }
});

mongoose.model('ProCard', ProCardSchema);