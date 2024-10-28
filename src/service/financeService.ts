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

// Update a financial transaction by ID
export const updateFinance = async (id: string, data: Partial<Finance>): Promise<Finance | null> => {
    return await financeModel.findByIdAndUpdate(id, data, { new: true });
};

// Delete a financial transaction by ID
export const deleteFinance = async (id: string): Promise<Finance | null> => {
    return await financeModel.findByIdAndDelete(id);
};

