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


export const formatDeviceTime = ( rawTime ) =>{

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