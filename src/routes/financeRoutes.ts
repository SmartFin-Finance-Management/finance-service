import express from 'express';
import { getAllFinance, getFinanceById, addFinance, updateFinance, deleteFinance } from '../controller/financeController';
const router = express.Router();

router.get('/finance', getAllFinance); 
router.get('/finance/:id', getFinanceById); 
router.post('/finance', addFinance); 
router.put('/finance/:id', updateFinance);  
router.delete('/finance/:id', deleteFinance); 


export default router;
