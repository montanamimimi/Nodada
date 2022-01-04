const numbers = process.argv.slice(2);
const colors = require('colors');


const a = +numbers[0];
const b = +numbers[1];

let start = -10;
let finish = b;

if ( isNaN(a) || isNaN(b) ) {
    console.log(colors.red('Please enter two numbers'));
    return;
}

if ( (a > b)) {
    start = b;
    finish = a;
}

// console.log(a);
// console.log(b);

// console.log(start);
// console.log(finish);

const green = "green";
const yellow = "yellow";
const red = "red";

let color = green;
let notEmpty = false;

next:
for (let i = start; i <= finish; i++) {
    let flag = true;
    for (let j = 2; j < i; j++) {
        if (i%j==0) {
            flag = false;
        }
    }
    if (flag && i > 1) {        
        notEmpty = true;
        if (color === green) {
            console.log(colors.green(i));     
            color = yellow;   
            continue next;                
        }

        if (color === yellow) {
            console.log(colors.yellow(i));     
            color = red; 
            continue next;                  
        }

        if (color === red) {
            console.log(colors.red(i));     
            color = green;  
            continue next;                 
        }             
    }
}

if ( notEmpty === false ) {
    console.log(colors.blue('There is no simple numbers'));
}


