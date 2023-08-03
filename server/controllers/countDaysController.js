import CountDays from "../models/counts.js";

export const addCountDays = async (req, res) => {
    try {
        console.log("controller start ........");
        const { Received, Applied } = req.body;
        // Parse the Received and Applied arrays as integers
        console.log("controller start second ........");
        const parsedReceived = Received.map(Number);
        const parsedApplied = Applied.map(Number);
        console.log("controller start thicond ........");
        const countPerDay = await CountDays.findOne({ Received, Applied }); 
        if (!countPerDay) {
            // If there's no existing document, create a new one
            const newCountPerDay = new CountDays({
                Received: parsedReceived,
                Applied: parsedApplied,
            });
            await newCountPerDay.save();
        } else {
            // If a document already exists, add the counts to the respective arrays
            countPerDay.Received.push(...parsedReceived);
            countPerDay.Applied.push(...parsedApplied);
            await countPerDay.save();
        }
        // 
        res.status(201).json({ message: 'Counts added successfully' });
    } catch (error) {
        console.error("Error into add counts: ", error);
        res.status(500).json({ error: 'Failed to add counts for the day' });
    }
};

// Controller to get all counts for each day
export const getAllCounts = async (req, res) => {
    try {
        const countPerDay = await CountDays.findOne({});
        if (!countPerDay) {
            return res.status(404).json({ message: 'Counts not found' });
        }
        const { Received, Applied } = countPerDay;
        const counts = { Received, Applied };
        res.status(200).json(counts);
    } catch (error) {
        console.error("Error in getAllCounts", getAllCounts);
        res.status(500).json({ error: 'Failed to get counts' });
    }
};
