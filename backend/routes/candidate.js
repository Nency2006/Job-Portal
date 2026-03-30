const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');

const {
    getAllCandidate,
    createCandidate,
    getCandidateById,
    addCandidateDetails
} = require('../controllers/candidateController');


router.get('/', (req,res) => {
    res.json('hello candidate')
})
router.get('/allCandidate', getAllCandidate)
router.post('/addCandidate',authenticate, createCandidate)
router.put("/addDetails/:candidateId", addCandidateDetails);
router.get('/candidateById/:id',  getCandidateById)

module.exports = router;