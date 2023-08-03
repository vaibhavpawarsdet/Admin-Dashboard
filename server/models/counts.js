import mongoose from "mongoose";

const countPerDaySchema = new mongoose.Schema({
    Received: {
        type: [Number],
        required: true
    },
    Applied: {
        type: [Number],
        required: true
    }
});

const CountDays = mongoose.model("CountDays", countPerDaySchema);
export default CountDays;