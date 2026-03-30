const express = require('express')
const router = express.Router();

const {applyJob, checkApply, getApplicantsByJob, updateApplicationStatus, getMyApplications} = require('../controllers/applicationController');

router.post('/apply', applyJob);
router.get('/check/:jobId/:candidateId', checkApply);
router.get('/applicant/:jobId', getApplicantsByJob);
router.put('/status/:applicationId', updateApplicationStatus);
router.get("/myApplications/:candidateId", getMyApplications);

module.exports = router;
