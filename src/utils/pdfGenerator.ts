export const generateFinancePdf = (financeData: any): any => {
    return {
        content: [
            
            // Invoice Header
            { text: 'INVOICE', style: 'header' },
            {
                style: 'invoiceTable',
                table: {
                    widths: ['*'],
                    body: [
                        [{ text: `Invoice Number: ${financeData.invoice_number}`, style: 'invoiceDetails' }],
                        [{ text: `Transaction ID: ${financeData.transaction_id}`, style: 'invoiceDetails' }],
                        [{ text: `Transaction Date: ${financeData.transaction_date.toDateString()}`, style: 'invoiceDetails' }],
                        [{ text: `Client ID: ${financeData.client_id}`, style: 'invoiceDetails' }],
                        [{ text: `Project ID: ${financeData.project_id}`, style: 'invoiceDetails' }],
                        [{ text: `Finance User ID: ${financeData.finance_user_id}`, style: 'invoiceDetails' }],
                        [{ text: `Amount: ${financeData.amount.toFixed(2)} Rs.`, style: 'invoiceAmount' }],
                        [{ text: `Status: ${financeData.status}`, style: 'invoiceStatus' }],
                    ]
                },
                layout: {
                    hLineWidth: () => 0.5,
                    vLineWidth: () => 0.5,
                    hLineStyle: () => ({ dash: { length: 2, space: 2 } }),
                    vLineStyle: () => ({ dash: { length: 2, space: 2 } })
                }
            },

            // Spacer
            { text: '', margin: [0, 20] },

            // Bank Details Section
            { text: 'Bank Details', style: 'subheader' },
            {
                style: 'bankTable',
                table: {
                    widths: ['*'],
                    body: [
                        [{ text: `Bank Name: ${financeData.bank_name}`, style: 'bankDetails' }],
                        [{ text: `Bank Account No: ${financeData.bank_account_no}`, style: 'bankDetails' }],
                        [{ text: `Bank Payee Name: ${financeData.bank_payee_name}`, style: 'bankDetails' }],
                        [{ text: `Bank IFSC: ${financeData.bank_ifsc}`, style: 'bankDetails' }],
                    ]
                },
                layout: {
                    hLineWidth: () => 0.5,
                    vLineWidth: () => 0.5,
                    hLineStyle: () => ({ dash: { length: 2, space: 2 } }),
                    vLineStyle: () => ({ dash: { length: 2, space: 2 } })
                }
            }
        ],
        styles: {
            header: {
                fontSize: 22,
                medium: true,
                margin: [0, 0, 0, 20],
                alignment: 'center',
            },
            invoiceDetails: {
                fontSize: 12,
                alignment: 'center',
                margin: [0, 5, 0, 5],
            },
            invoiceAmount: {
                fontSize: 14,
                medium: true,
                alignment: 'center',
                margin: [0, 5, 0, 5],
            },
            invoiceStatus: {
                fontSize: 12,
                medium: true,
                alignment: 'center',
                margin: [0, 5, 0, 5],
            },
            subheader: {
                fontSize: 16,
                medium: true,
                alignment: 'center',
                margin: [0, 15, 0, 5],
            },
            bankDetails: {
                fontSize: 12,
                alignment: 'center',
                margin: [0, 5, 0, 5],
            },
            invoiceTable: {
                margin: [0, 10, 0, 10],
            },
            bankTable: {
                margin: [0, 10, 0, 10],
            }
        }
    };
};
