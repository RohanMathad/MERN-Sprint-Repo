import axios from 'axios';
import { formatDeviceTime } from './Utils.js'

const F1_ApiUrl = 'https://api.jolpi.ca/ergast/f1/current/last/results.json';

const fetchData = async () => {
    try {
        const response = await axios.get(F1_ApiUrl);
        const data = await response.data.MRData.RaceTable.Races[0];

        const results = data.Results;


        const bestOfFive = results.slice(0, 5);

        bestOfFive.forEach((driver) => {
            const raceStartTimeMs = new Date(`${data.date}T${data.time}`).getTime();

            const driverDurationMs =Number(driver.Time.millis);
            const exactFinishTimestamp = raceStartTimeMs + driverDurationMs;

            const formattedTime = formatDeviceTime(exactFinishTimestamp);

            console.log(`${driver.Driver.familyName},Finish Time: ${formattedTime}`);
        });


    } catch (error) {
        console.log(error);
    }
}


fetchData();