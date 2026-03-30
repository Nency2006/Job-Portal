const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');

const { getAllJobs, createJob, getJobsByUserId, updateJobs,singleJob, deleteJob } = require('../controllers/jobController');

router.get('/getJobs', getAllJobs);
router.post('/createJobs', authenticate, createJob);
router.get('/singleJob/:id', authenticate, singleJob);
router.get('/jobsById/:id', authenticate, getJobsByUserId);
router.put('/updateJobs/:id', authenticate, updateJobs);
router.delete('/deleteJob/:id', authenticate, deleteJob);

module.exports = router;
