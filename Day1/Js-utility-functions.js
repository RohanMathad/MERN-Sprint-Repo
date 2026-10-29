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



