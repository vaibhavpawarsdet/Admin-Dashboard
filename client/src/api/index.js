import axios from "axios";

const baseURL = `https://practical-task.onrender.com/api/v1`;
export const fetchData = async () => {
    try {
        const response = await axios.get(`${baseURL}/specialists`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const fetchCountPerDay = async () => {
    try {
        const response = await axios.get(`${baseURL}/allcounts`);
        return response.data;
    } catch (error) {
        console.error('Error fetching count days:', error);
        throw error;
    }
};