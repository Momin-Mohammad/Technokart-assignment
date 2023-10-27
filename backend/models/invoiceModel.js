const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema({
    date : String,
    invoiceNumber : Number,
    amount : Number,
    year : Number
});

const invoiceModel = mongoose.model("invoices",invoiceSchema);

module.exports = invoiceModel;