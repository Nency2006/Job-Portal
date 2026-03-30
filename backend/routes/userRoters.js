const express = require('express');
const router = express.Router();

const { getallUsers, registerUser, loginUser, getUserById, updateUser, forgotPassword,resetPassword } = require('../controllers/users');

router.get('/all', getallUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);   
router.get('/:id', getUserById);
router.put('/updateUser/:id', updateUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);


module.exports = router;