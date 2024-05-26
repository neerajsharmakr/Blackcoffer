// controllers/dataController.js

import Data from '../models/data.js';

// Function to fetch data from MongoDB
const getData = async (req, res) => {
    try {
        const data = await Data.find();
        res.status(200).json({
            "status": true,
            "data": data
        });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { getData };
