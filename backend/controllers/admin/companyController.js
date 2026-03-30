const companyModel = require('../../models/admin/companySchema');

exports.createCompany = async (req, res) => {
    try {
        const { name, industry, location, email, contactNumber } = req.body;
        const userId = req.id;
        if (!name || !industry || !location || !email || !contactNumber ) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }
        const newCompany = await companyModel.create({
            name,
            industry,
            location,
            email,
            contactNumber,
            userId : userId
        });
        return res.status(201).json({
            message: 'Company created successfully',
            success: true,
            newCompany,
            companyId: newCompany._id
        });
    } catch (error) {
        console.error('CreateCompany error:', error);
        console.error(error.stack);
        return res.status(500).json({
            message: error.message || 'Internal server error',
            success: false
        });
    }
};

exports.getCompany = async (req, res) => {
    try {
        const userid = req.id;
        const company = await companyModel.findOne({ userId: userid });
        if (!company) {
            return res.status(404).json({ message: 'Company not found', success: false });
        }
        return res.status(200).json({ company, success: true });
    } catch (error) {
        console.error('GetCompany error:', error);
        console.error(error.stack);
        return res.status(500).json({
            message: error.message || 'Internal server error',
            success: false
        });
    }
};

exports.getCompanyById = async (req, res) => {
    try {
        const comany = await companyModel.findById(req.params.id);
        if (!comany) {
            return res.status(404).json({ message: 'Company not found', success: false });
        }
        return res.status(200).json({ company: comany, success: true });
    } catch (error) {
        console.error('GetCompanyById error:', error);
        console.error(error.stack);
        return res.status(500).json({
            message: error.message || 'Internal server error',
            success: false
        });
    }
};

exports.updateCompany = async (req, res) =>{
    try{
        const updateCom = await companyModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true}
        );
        res.status(200).json({
            message : "Company Update Successfully",
            updateCom
        });
    }catch(err){
        res.status(500).josn({message:err.message})
    }
}
