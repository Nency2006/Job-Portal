const express = require("express");
const router = express.Router();

const { getDashboardStats, getUsers, getJobs, getCompanies, getApplication } = require("../controllers/adminController");

router.get("/dashboard", getDashboardStats);
router.get("/users", getUsers);
router.get("/jobs", getJobs);
router.get("/company", getCompanies);
router.get("/application", getApplication);
module.exports = router;