const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    jobId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Job",
        require : true
    },
    candidateId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "candidate",
        require : true
    },
    employerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true
    },
    status : {
        type : String,
        enum : ["pending", "shortlisted", "rejected"],
        default : "pending"
    },
    appliedAt: {
    type: Date,
    default: Date.now
    }
});

applicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true });
module.exports = mongoose.model("Application", applicationSchema);