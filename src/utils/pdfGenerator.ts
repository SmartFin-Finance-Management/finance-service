export const generateFinancePdf = (financeData: any): any => {
    return {
        content: [
            { text: 'Finance Transaction', style: 'header' },
            `Transaction ID: ${financeData.transaction_id}`,
            `Project ID: ${financeData.project_id}`,
            `Client ID: ${financeData.client_id}`,
            `Finance User ID: ${financeData.finance_user_id}`,
            `Invoice Number: ${financeData.invoice_number}`,
            `Amount: ${financeData.amount}`,
            `Status: ${financeData.status}`,
            `Transaction Date: ${financeData.transaction_date.toDateString()}`,
            { text: 'Bank Details', style: 'subheader' },
            `Bank Name: ${financeData.bank_name}`,
            `Bank Account No: ${financeData.bank_account_no}`,
            `Bank Payee Name: ${financeData.bank_payee_name}`,
            `Bank IFSC: ${financeData.bank_ifsc}`,
        ],
        styles: {
            header: {
                fontSize: 18,
                // bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 14,
                // bold: true,
                margin: [0, 10, 0, 5]
            }
        }
    };
};
