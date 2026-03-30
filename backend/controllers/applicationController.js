const Application = require('../models/applicationSchema')
const Job = require('../models/jobScheam')
const Candidate = require("../models/cadidateSchema");
const user = require("../models/userScheam")

exports.applyJob = async (req, res) => {
    try {
        const { jobId, candidateId } = req.body;

        const job = await Job.findById(jobId);
        if (!job) {
            res.json({ message: "Job Not Found" });
        }

        const candidate = await Candidate.findOne({ userId: candidateId });
        const application = await Application.create({
            jobId,
            candidateId: candidate._id,
            employerId: job.createdBy
        })

        res.status(200).json({ message: "Applied Successfully", application })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Already applied"
            });
        }

        res.status(500).json({ message: "Server Error" })
    }
}

exports.checkApply = async (req, res) => {
    try {
        const { jobId, candidateId } = req.params;

        const application = await Application.findOne({
            jobId,
            candidateId,
        })

        if (application) {
            return res.status(200).json({
                applied: true
            });
        }

        return res.status(200).json({
            applied: false
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
}

exports.getApplicantsByJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        const application = await Application.find({ jobId })
            .populate({
                path: "candidateId",
                populate: {
                    path: "userId",
                }
            })
            .sort({ createdAt: -1 })

        res.status(200).json({
            applicants: application
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
}

exports.updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        if (!["pending", "shortlisted", "rejected"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        const application = await Application.findByIdAndUpdate(
            applicationId,
            { status },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.status(200).json({
            message: "Status updated successfully",
            application
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

exports.getMyApplications = async (req, res) => {
    try {

        const { candidateId } = req.params;

        const applications = await Application.find({ candidateId })
            .populate({
                path: "jobId",
                populate: {
                    path: "company"
                }
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            applications
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};