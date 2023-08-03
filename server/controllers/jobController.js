import JobData from "../models/jobdata.js";

export const postJob = async (req, res) => {
    try {
        const { name, location, posted, status, applied, jobViews, daysLeft, premium, dateFormat } = req.body;
        const newSpecialist = new JobData({
            name, location, posted, status, applied, jobViews, daysLeft, premium,
            dateFormat: new Date(dateFormat),
        });
        const savedJobData = await newSpecialist.save();
        res.status(201).json(savedJobData);
    } catch (error) {
        console.error("Error in post job", error);
        res.status(500).json({ error: 'Failed to create JobData' });
    };
};

export const getAllSpecialists = async (req, res) => {
    try {
        const specialists = await JobData.find({});
        res.status(200).json(specialists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get specialists' });
    };
};