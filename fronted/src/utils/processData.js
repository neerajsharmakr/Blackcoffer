// src/utils/processData.js
export const processData = (data) => {
    // const filteredData = data.filter(item => item.country === country);
    const aggregatedData = {};
    const result = {};

    if (data === undefined || data?.lenght === 0){
        return result
    }
    
    data?.forEach(item => {
        if (item.country !== "") {
            if (aggregatedData[item.country]) {
                if (aggregatedData[item.country][item.topic]) {
                    aggregatedData[item.country][item.topic] += item.intensity;
                } else {
                    aggregatedData[item.country][item.topic] = item.intensity;
                }
            } else {
                aggregatedData[item.country] = {};
                aggregatedData[item.country][item.topic] = item.intensity;
            }
        }

    });

    Object.keys(aggregatedData).map((country) => {
        result[country] = Object.keys(aggregatedData[country]).map(topic => ({
            topic,
            intensity: aggregatedData[country][topic]
        }))
    });

    return result
};
