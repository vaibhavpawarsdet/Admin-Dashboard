import mongoose from "mongoose";

const jobDataSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    posted: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    applied: {
      type: Number,
      required: true
    },
    jobViews: {
      type: Number,
      required: true
    },
    daysLeft: {
      type: Number,
      required: true
    },
    premium: {
      type: Boolean,
      required: true
    },
    dateFormat: {
      type: Date,
      required: true
    }
  });
  
const JobData = mongoose.model('JobData', jobDataSchema);
export default JobData;