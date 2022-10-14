const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TransactionModel = new Schema({
    "address":  {
        type: String,
        default: ''
    },
    "blockNumber": {
        type: String,
        default: ''
    },
    "timeStamp": {
        type: String,
        default: ''
    },
    "hash": {
        type: String,
        default: ''
    },
    "nonce": {
        type: String,
        default: ''
    },
    "blockHash": {
        type: String,
        default: ''
    },
    "transactionIndex": {
        type: String,
        default: ''
    },
    "from": {
        type: String,
        default: ''
    },
    "to": {
        type: String,
        default: ''
    },
    "value": {
        type: Number,
        default: ''
    },
    "gas": {
        type: String,
        default: ''
    },
    "gasPrice": {
        type: String,
        default: ''
    },
    "isError": {
        type: String,
        default: ''
    },
    "txreceipt_status": {
        type: String,
        default: ''
    },
    "input": {
        type: String,
        default: ''
    },
    "contractAddress": {
        type: String,
        default: ''
    },
    "cumulativeGasUsed": {
        type: String,
        default: ''
    },
    "gasUsed": {
        type: String,
        default: ''
    },
    "confirmations": {
        type: String,
        default: ''
    },
    "methodId":{
        type: String,
        default: ''
    },
    "functionName": {
        type: String,
        default: ''
    }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
const Transaction = mongoose.model('Transaction', TransactionModel);
module.exports = Transaction;
