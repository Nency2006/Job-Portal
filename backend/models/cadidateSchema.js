const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    phone: {
        type: String
    },

    location: {
        type: String
    },

    experiences: [
        {
            jobTitle: String,
            companyName: String,
            employmentType: String,
            startDate: Date,
            endDate: Date,
            currentlyWorking: Boolean,
        }
    ],

    skills: [
        {
            skillName: String,
            level: String
        }
    ],

    education: [
        {
            degree: String,
            fieldOfStudy: String,
            university: String,
            passingYear: Number,
            grade: String
        }
    ],

    certification: [
        {
            name: String,
            organization: String,
            issueDate: Date
        }
    ],

    resume: {
        resumeFile: String
    }
});

module.exports = mongoose.model("candidate", candidateSchema)