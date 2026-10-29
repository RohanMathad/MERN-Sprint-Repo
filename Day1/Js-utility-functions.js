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


