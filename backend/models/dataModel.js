// models/dataModel.js

import Data from './data.js';
import sampleData from '../sample/sample.json' assert { type: 'json' };

// Function to check if data exists in database and insert if not
const initData = async () => {
    try {
        const data = await Data.find();
        if (data.length === 0) {
            await Data.insertMany(sampleData);
            console.log('Initial data inserted.');
        } else {
            console.log('Data already exists in database.');
        }
    } catch (err) {
        console.error('Error initializing data:', err);
    }
};

export { initData };
