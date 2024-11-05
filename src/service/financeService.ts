// services/financeService.ts
import financeModel from "../models/financeModel";
import { Finance } from "../models/types";

// Get all financial transactions
export const getAllFinance = async (): Promise<Finance[]> => {
    return await financeModel.find();
};

// Get a financial transaction by ID
export const getFinanceById = async (id: string): Promise<Finance | null> => {
    return await financeModel.findById(id);
};

// Add a new financial transaction
export const addFinance = async (data: Partial<Finance>): Promise<Finance> => {
    const newTransaction = new financeModel(data);
    return await newTransaction.save();
};

// Update a financial transaction by transaction_id
export const updateFinance = async (transactionId: number, data: Partial<Finance>): Promise<Finance | null> => {
    return await financeModel.findOneAndUpdate({ transaction_id: transactionId }, data, { new: true });
};

// Delete a financial transaction by ID
export const deleteFinance = async (transactionId: number): Promise<Finance | null> => {
    return await financeModel.findOneAndDelete({ transaction_id: transactionId });
};

export const getInvoiceByProjectId = async (projectId: string): Promise<Finance[]> => {
    // Fetch employees based on the project ID from your database
    const employees = await financeModel.find({ project_id: projectId }); // Adjust according to your database querying method
    return employees;
};

export const getMaxTransactionId = async (): Promise<number> => {
    try {
      const maxTransaction = await financeModel.findOne({}, { transaction_id: 1 })
        .sort({ transaction_id: -1 })
        .limit(1);
  
      // Return the max transaction_id, or 0 if no transactions found
      return maxTransaction ? maxTransaction.transaction_id : 0;
    } catch (error) {
      console.error(`Error fetching max transaction_id: ${error}`);
      throw new Error(`Error fetching maximum transaction_id: ${error}`);
    }
  };
