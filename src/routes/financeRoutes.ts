import express from 'express';
import { getAllFinance, getFinanceById, addFinance, updateFinance, deleteFinance, getInvoiceByProjectId, getMaxTransactionId } from '../controller/financeController';
const router = express.Router();

router.get('/finance', getAllFinance); 
router.get('/finance/:id', getFinanceById); 
router.post('/finance', addFinance);
router.put('/finance/:id', updateFinance);  
router.delete('/finance/:id', deleteFinance); 

router.get('/finance/project/:projectId', getInvoiceByProjectId);

router.get('/uniqueTransaction_id', getMaxTransactionId);

export default router;
