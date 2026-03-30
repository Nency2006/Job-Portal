const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); // ✅ Line 1 ma hi load kar de

const app = express();
const connectDb = require('./config/db');

const userRoutes = require('./routes/userRoters');

const jobRoutes = require('./routes/jobRoutes');

const companyRoutes = require('./routes/admin/comapanyRoutes');

const candidateRoutes = require('./routes/candidate');

const applicationRoutes = require('./routes/applicationRoutes');

const adminRoutes = require("./routes/adminRoutes");
const cors = require('cors');

app.use(cors());
connectDb();

app.use(express.json());
app.use('/api/users', userRoutes);  
app.use('/api/jobs', jobRoutes);
app.use('/api/admin/company', companyRoutes);
app.use('/api/candidate', candidateRoutes)
app.use("/api/applications", applicationRoutes);

app.use("/uploads", express.static("uploads"));

app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
