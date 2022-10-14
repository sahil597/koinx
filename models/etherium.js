const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EtheriumModel = new Schema({
   price: {
       type: String,
       default: '0'
   }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
const Etherium = mongoose.model('Etherium', EtheriumModel);
module.exports = Etherium;
