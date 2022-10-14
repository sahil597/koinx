const config = require("config");
const universal = require("../../utils");
const MESSAGES = require("../../constants").Messages;
const CODES = require("../../constants").Codes;
const Models = require('../../models');
const fetch = require('node-fetch');
module.exports = {
    /* Admin On-Boarding */
    getTransactions: async (req, res, next) => {
        try {
            let address = req.params.address;
            let API_KEY = config.get('API_KEY');
            let result = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${API_KEY}`);
            result = await result.json();
            result.result = await result.result.map(v => ({ ...v, address }));
            result.result.forEach(async element => {
                element.value = parseInt(element.value);
                let record = await Models.Transaction.findOne({ hash: element.hash, blockHash: element.blockHash }).lean();
                if (!record) new Models.Transaction(element).save();
            });
            return await universal.response(res, CODES.OK, MESSAGES.DATA_FETCHED_SUCCESSFULLY, result, req.lang);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getBalance: async (req, res, next) => {
        try {
            const address = req.params.address;
            const ETH_PRICE = (await Models.Etherium.findOne().lean()).price;
            const addTransactions = await Models.Transaction.aggregate([
                {
                    $match: { address, to: address }
                },
                { $group: { _id: null, sum: { $sum: "$value" } } }
            ]);
            const subTransactions = await Models.Transaction.aggregate([
                {
                    $match: { address, from: address }
                },
                { $group: { _id: null, sum: { $sum: "$value" } } }
            ]);
            let balance = 0;
            if (addTransactions && addTransactions[0]) {
                balance += addTransactions[0].sum;
            }
            if (subTransactions && subTransactions[0]) {
                balance = balance - subTransactions[0].sum;
            }
            return await universal.response(res, CODES.OK, MESSAGES.DATA_FETCHED_SUCCESSFULLY, {ethPrice:ETH_PRICE, walletBalance: balance }, req.lang);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
};
