const job = require('../models/jobScheam.js');


exports.createJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, position, company } = req.body;
        const userId = req.id;

        // const company = await Company.findOne({ createdBy: userId });
        // if (!company) {
        //     return res.status(404).json({ message: 'Company not found for the user', success: false });
        // }

        if (!title || !description || !requirements || !salary || !location || !jobType || !position) {
            return res.status(400).json({ message: 'All fields are required', success: false });

        }
        const newJob = await job.create({
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            position,
            company,
            createdBy: userId
        });
        return res.status(201).json({
            message: 'Job created successfully',
            success: true,
            newJob
        });
    } catch (error) {
        console.error('CreateJob error:', error);
        console.error(error.stack);
        return res.status(500).json({
            message: error.message || 'Internal server error',
            success: false
        });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await job.find().populate('company', 'name').populate('createdBy', 'name');
        if (!jobs) {
            return res.status(404).json({ message: 'No jobs found', success: false });

        }
        return res.status(200).json({
            message: 'Jobs retrieved successfully',
            success: true,
            jobs
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

exports.getJobsByUserId = async (req, res) => {
    try {
        const userId = req.params.id;

        const jobs = await job.find({ createdBy: userId })
            .populate("company")
            .populate("createdBy", "name")

        res.json({ success: true, jobs: jobs });
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching employer jobs" });
    }
}

exports.singleJob = async (req, res) =>{
    try{
        const foundJob = await job.findById(req.params.id).populate("company")
        if (!foundJob) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.json(foundJob)

    }catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.updateJobs = async (req, res) => {
    try {
        const updatedJob = await job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
         if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.json(updatedJob);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteJob = async (req, res) =>{
    try{
        const deletejob = await job.findByIdAndDelete(req.params.id);
        
        res.status(200).json({
            message:"Job deleted successfully",
            deletejob
        });

    }
    catch(err){
         res.status(500).json({
            message:"Error Deleting",
           err : err.message
        });
    }
}

