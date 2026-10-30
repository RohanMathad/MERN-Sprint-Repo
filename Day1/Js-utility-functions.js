//1 Set timeout example..
const timer = setTimeout(() => {
    console.log('this callback function will run after like,,,, 2000ms..');
}, 2000);

// setInterval
let count = 0;
const intervalId = setInterval(() => {
    count++;
    console.log(`count is ${count} now..`)

    if(count === 5) {
        console.log('stopping the count when the value is 5')
        clearInterval(intervalId)
    }
}, 5000)
/*
count is 1 now..
VM297:4 count is 2 now..
VM297:4 count is 3 now..
VM297:4 count is 4 now..
VM297:4 count is 5 now..
VM297:7 stopping the count when the value is 5
*/



//DateTime
    const currentDate = new Date();
    console.log(`current Date-time details--- ${currentDate.toString()}`);
//current Date-time details--- Thu Oct 29 2026 22:11:09 GMT+0530 (India Standard Time)


const timestamp = Date.now();
console.log(`Raw milliseconds -- ${timestamp}`)
//Raw milliseconds -- 1793292185179


// Higher order funciton
const debounce = (apiCall, delay) => {
    let timeDelay;

    return(...args) => {

        clearTimeout(timeDelay);

        timeDelay = setTimeout(() => {
            apiCall(...args);
        }, delay);
    }
}

const fetchDemoApiData = async (username) => {
    console.log('api call starts here...')

    try {
        const request = await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`)
        const data = await response.json();

        data.length > 0 ? console.log('data fetched!') : console.log('user not found')
            
    } catch (error) {
        console.log(`${error.message}`);
    }

}

export const smartSearch = debounce(fetchDemoApiData, 1500);

console.log('user typed A');
smartSearch('A');

console.log('user typed Ant');
smartSearch('Ant');

console.log('user typed Antonette');
smartSearch('Antonette');


// Epoch Nomalization
const normalizeEpoch = (rawTimestamp) => {
    const timeNumber = Number(rawTimestamp);

    if(timeNumber  < 1000000000000 ){
        return timeNumber * 1000;
    }

    return timeNumber;
}

// console.log(`first device-${normalizeEpoch(1729141800)}`);
// console.log(`second device-${normalizeEpoch(1729141800000)}`);
/*
first device-1729141800000
second device-1729141800000
*/

const dateTimeFormatter = new Intl.DateTimeFormat('en-IN', {
    year : 'numeric',
    month  : 'short',
    day : '2-digit',
    hour : '2-digit',
    minute : '2-digit',
    second  :'2-digit',
    hour12 :  true
})


const formatDeviceTime = ( rawTime ) =>{

    if(!rawTime && rawTime !== 0){
        return 'Falsy data'
    }
    
    const validMilliseconds = normalizeEpoch(rawTime);

    if(Number.isNaN(validMilliseconds)){
        return 'Invalid Sensor data';
    }

    const dateObj = new Date(validMilliseconds);

    return dateTimeFormatter.format(dateObj)
}

// console.log(`vehicle 1 time received - 1729141800s, formatted device time is - ${formatDeviceTime(1729141800)}`)
// console.log(`vehicle 2 time - 1730459392123ms, formatted time - ${formatDeviceTime(1730459392123)}`);
console.log("Good Data:", formatDeviceTime(1730459392123));
console.log("Hardware Glitch (Null):", formatDeviceTime(null));
console.log("Hardware Glitch (Text):", formatDeviceTime("qwertyuiop"));



