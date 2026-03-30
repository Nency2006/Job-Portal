const User = require("../models/userScheam");
const Job = require("../models/jobScheam");
const Application = require("../models/applicationSchema");
const Company = require("../models/admin/companySchema");


exports.getDashboardStats = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments({ role: "jobseeker" });
        const totalEmployers = await User.countDocuments({ role: "employer" });
        const totalJobs = await Job.countDocuments();
        const totalApplications = await Application.countDocuments();

        const recentJobs = await Job.find()
        .populate("company","name")
        .sort({ createdAt: -1 })
        .limit(5)
        

        res.json({
            success: true,
            data: {
                totalUsers,
                totalEmployers,
                totalJobs,
                totalApplications
            },
            recentJobs,

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};



exports.getUsers = async(req,res)=>{

 const users = await User.find().sort({createdAt:-1})

 res.json({
   success:true,
   users
 })

}

exports.getJobs = async(req, res) =>{
    const jobs = await Job.find()
    .populate("company","name")
    .sort({createdAt:-1})

    res.json({success: true, jobs})
}

exports.getCompanies = async(req, res)=>{
    const company = await Company.find()
    .populate("userId","name");

    res.json({success:true, company});
}

exports.getApplication = async (req, res) => {
  try {

    const applications = await Application.find()
      .populate({
        path:"jobId", 
        select: "title location salary",
        populate: { 
          path: "company",
          select: "name"
        }
      })

      .populate({
        path: "candidateId",
        populate: {
          path: "userId",
          select: "name"
        }
      })
      .populate({
        path: "employerId", 
        select:"name"
      });
;

    res.json({
      success: true,
      applications
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};