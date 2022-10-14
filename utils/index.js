const Messages = require('../langs');
module.exports = {
    /*
    Response Functions
    */
    errMessage: async (res, status, message, lang) => { await res.status(status).send({ status: status, message: Messages[lang][message] }); },
    sucMessage: async (res, status, message, data, lang) => { await res.send({ status: status, message: Messages[lang][message], result: data }); },
    response: async (res, status, message, data, lang) => {
        if (status != 200) {
            console.log(status, message, data, lang)
            await res.status(status).send({ status: status, message: Messages[lang][message], result: data });
        }
        else {

            await res.status(status).send({ status: status, message: Messages[lang][message], result: data });
        }
    }
};