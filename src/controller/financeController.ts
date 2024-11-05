// controllers/financeController.ts
import { Request, Response } from 'express';
import * as financeService from '../service/financeService';
import { generateFinancePdf } from '../utils/pdfGenerator';
import pdfMake from 'pdfmake';
const path = require('path');

// Get all financial transactions
export const getAllFinance = async (req: Request, res: Response): Promise<void> => {
    try {
        const transactions = await financeService.getAllFinance();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: "error fetching" });
    }
};

// Get a financial transaction by ID
export const getFinanceById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const transaction = await financeService.getFinanceById(id);
        if (!transaction) {
            res.status(404).json({ message: 'Transaction not found' });
            return;
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: "error fetching" });
    }
};

// Add a new financial transaction
export const addFinance = async (req: Request, res: Response): Promise<void> => {
    const transactionData = req.body;

    try {
        const newTransaction = await financeService.addFinance(transactionData);

        // Set headers for the PDF response
        res.setHeader('Content-Disposition', `attachment; filename="purchase_order_${newTransaction.transaction_id}.pdf"`);
        res.setHeader('Content-Type', 'application/pdf');

        // Generate PDF using finance transaction data
        const fontPath = path.join(__dirname, 'roboto.regular.ttf');
        const documentDefinition = generateFinancePdf(newTransaction);

        const fonts = {
            Roboto: {
                normal: fontPath,
            }
        };
        const printer = new pdfMake(fonts);
        const pdfDoc = printer.createPdfKitDocument(documentDefinition);

        // Stream the PDF directly to the client
        pdfDoc.pipe(res);
        pdfDoc.end();

    } catch (error) {
        console.error(error); // Log the error for debugging

        if (!res.headersSent) {  // Check if response headers are already sent
            res.status(500).json({ error: 'Error creating transaction', details: error instanceof Error ? error.message : 'An unknown error occurred.' });
        }
    }
};


// controllers/financeController.ts
export const updateFinance = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // This should be the transaction_id
        const updatedData = req.body;
        
        // Convert id to number if it's supposed to be a number
        const transactionId = parseInt(id, 10);

        if (isNaN(transactionId)) {
            res.status(400).json({ message: 'Invalid ID format. Must be a number.' });
            return;
        }

        const updatedTransaction = await financeService.updateFinance(transactionId, updatedData);
        if (!updatedTransaction) {
            res.status(404).json({ message: 'Transaction not found' });
            return;
        }
        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ error: "Error updating transaction: " + error });
    }
};


// controllers/financeController.ts
export const deleteFinance = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const transactionId = parseInt(id, 10); // Convert the string ID to a number

        if (isNaN(transactionId)) {
            res.status(400).json({ message: 'Invalid ID format. Must be a number.' });
            return;
        }

        const deletedTransaction = await financeService.deleteFinance(transactionId);
        if (!deletedTransaction) {
            res.status(404).json({ message: 'Transaction not found' });
            return;
        }
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: "Error deleting transaction: " + error });
    }
};



// Get all employees by project ID
export const getInvoiceByProjectId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { projectId } = req.params; // Get projectId from request parameters
        const Invoice = await financeService.getInvoiceByProjectId(projectId);
        if (Invoice.length === 0) {
            res.status(404).json({ message: 'No invoice found for this project' });
            return;
        }
        res.status(200).json(Invoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching invoice" });
    }
};


// Controller function to get the maximum transaction_id
export const getMaxTransactionId = async (req: Request, res: Response): Promise<void> => {
    console.log("Fetching max transaction ID");
  
    try {
      const maxTransactionId = await financeService.getMaxTransactionId();
      res.status(200).json({ max_transaction_id: maxTransactionId });
    } catch (error) {
      console.error(`Error fetching max transaction_id: ${error}`);
      res.status(500).json({ error: `Error fetching maximum transaction_id: ${error}` });
    }
  };