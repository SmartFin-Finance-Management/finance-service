import { Schema, model } from 'mongoose';


const financeSchema = new Schema({
    transaction_id: {
        type: Number,
        required: true,
        // unique: true,
        //auto: true // Mongoose does not support AUTO_INCREMENT by default, but you can handle it manually.
    },
    project_id: {
        type: Number,
        required: true,
    },
    client_id: {
        type: Number,
        required: true,
    },
    finance_user_id: {
        type: Number,
        required: true,
    },
    invoice_number: {
        type: String,
        required: true,
        // unique: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    transaction_date: {
        type: Date,
        required: true,
    },
    bank_name: {
        type: String,
        required: true,
    },
    bank_account_no: {
        type: String,
        required: true,
    },
    bank_payee_name: {
        type: String,
        required: true,
    },
    bank_ifsc: {
        type: String,
        required: true,
    },

});

export default model('Finance', financeSchema);