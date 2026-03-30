const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authMiddleware');

const { createCompany, getCompany, getCompanyById, updateCompany } = require('../../controllers/admin/companyController');
router.post('/createCompany', authenticate, createCompany);
router.get('/getCompany', authenticate, getCompany);
router.get('/getCompany/:id', getCompanyById);
router.put('/updateCompany/:id', updateCompany);


module.exports = router;