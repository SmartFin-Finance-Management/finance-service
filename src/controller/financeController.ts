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
        res.status(201).json(newTransaction);
        const fontPath = path.join(__dirname, 'roboto.regular.ttf');
    
        // Generate PDF using purchase order data
        const documentDefinition = generateFinancePdf(newTransaction);
    
        var fonts = {
          Roboto: {
            normal: fontPath,
          }
        };
        var printer = new pdfMake(fonts);
    
        const pdfDoc = printer.createPdfKitDocument(documentDefinition);
        
        res.setHeader('Content-Disposition', `attachment; filename="purchase_order.pdf_${newTransaction.transaction_id}"`);
        res.setHeader('Content-Type', 'application/pdf');
    
    
        pdfDoc.pipe(res);
        pdfDoc.end();
      }  catch (error) {
        console.error(error); // Log the error for debugging
        
        if (error instanceof Error) {
          res.status(500).json({ error: 'Error creating ', details: error.message });
        } else {
          res.status(500).json({ error: 'Error creating ', details: 'An unknown error occurred.' });
        }
      }
};

// Update a financial transaction by ID
export const updateFinance = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedTransaction = await financeService.updateFinance(id, updatedData);
        if (!updatedTransaction) {
            res.status(404).json({ message: 'Transaction not found' });
            return;
        }
        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ error: "error updating" });
    }
};

// Delete a financial transaction by ID
export const deleteFinance = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedTransaction = await financeService.deleteFinance(id);
        if (!deletedTransaction) {
            res.status(404).json({ message: 'Transaction not found' });
            return;
        }
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: "error deleting" });
    }
};
