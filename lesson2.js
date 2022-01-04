
// 1 5 2 3 4  - порядок вывода чисел в 1 задании

const moment = require("moment");
const EventEmitter = require('events');
const emitter = new EventEmitter();

// To start write "npm run timer %timer1% %timer2%" where timer is 11-11-11-1111 hour-day-month-year
// for example npm run timer 17-14-12-2019 13-14-12-2021

const dates = process.argv.slice(2);

let toDate1 = dates[0];
let toDate2 = dates[1];

if ( !toDate1 || !toDate2 ) {
    console.log('Something wrond with dates');
    return;
}


toDate1 = toDate1.split('-');
toDate2 = toDate2.split('-');
toDate1 = new Date(toDate1[3], toDate1[2] - 1, toDate1[1], toDate1[0]);
toDate2 = new Date(toDate2[3], toDate2[2] - 1, toDate2[1], toDate2[0]);


const eventTime1 = toDate1.getTime(); 
const eventTime2 = toDate2.getTime(); 
const delay = 1000;

if ( isNaN(eventTime1) || isNaN(eventTime2)) {
    console.log('Something wrond with date format');
    return;
}

flag1 = true;
flag2 = true;

const run = async () => {

    currentTime = new Date().getTime();

    let payload1 = '1';
    let payload2 = '2';

    if (flag1) {
        let diffTime1 = eventTime1 - currentTime;
        let duration1 = moment.duration(diffTime1, 'milliseconds');  
        payload1 = `${duration1._data.years} years, ${duration1._data.months} months, ${duration1._data.days} days, ${duration1._data.hours} hours, ${duration1._data.minutes} minutes, ${duration1._data.seconds} seconds`;  
        if (duration1 <= 0 ) {
            payload1 = `event happened!`;
            flag1 = false;
        } 
    } else {
        payload1 = `event happened!`
    }

    if (flag2) {
        let diffTime2 = eventTime2 - currentTime;
        let duration2 = moment.duration(diffTime2, 'milliseconds');  
        payload2 = `${duration2._data.years} years, ${duration2._data.months} months, ${duration2._data.days} days, ${duration2._data.hours} hours, ${duration2._data.minutes} minutes, ${duration2._data.seconds} seconds`;  
        if (duration2 <= 0 ) {
            payload2 = `event happened!`;
            flag2 = false;
        }         
    } else {
        payload2 = `event happened!`
    }

    if (!flag1 && !flag2) {
        console.log('All events finished');
        return;
    }
    
    emitter.emit('call1', payload1);    
    emitter.emit('call2', payload2);  

    await new Promise(resolve => setTimeout(resolve, delay));
    await run();
}



class Handler {
    static call1(payload) {
        console.log('Till event 1: ', payload);
    }
    static call2(payload) {
        console.log('Till event 2: ', payload);
    }    
}

emitter.on('call1', Handler.call1);
emitter.on('call2', Handler.call2);

run();
