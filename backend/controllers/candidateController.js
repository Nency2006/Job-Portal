const Candidate = require('./../models/cadidateSchema')

exports.createCandidate = async (req, res) => {
    try {
        const userid = req.id;   // from auth middleware

        const {
            phone,
            location,
            experiences,
            skills,
            education,
            certification,
            resume
        } = req.body;

        const candidate = await Candidate.create({
            userId: userid,
            phone,
            location,
            experiences,
            skills,
            education,
            certification,
            resume
        });

        res.status(201).json({
            message: "Candidate profile created",
            data: candidate
        });


    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.addCandidateDetails = async (req, res) => {
  try {

    const { candidateId } = req.params;

    const {
      phone,
      location,
      experiences,
      skills,
      education,
      certification,
      resume
    } = req.body;

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      candidateId,
      {
        phone,
        location,

        $push: {
          experiences: { $each: experiences },
          skills: { $each: skills },
          education: { $each: education },
          certification: { $each: certification }
        },

        resume
      },
      { new: true }
    );

    res.status(200).json({
      message: "Details added successfully",
      candidate: updatedCandidate
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


exports.getAllCandidate = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json({
            message: "All candidates fetched",
            data: candidates
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getCandidateById = async (req, res) => {
  try {
    const { id } = req.params; // match the route param name
    const candidate = await Candidate.findOne({ userId: id });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({ candidate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};