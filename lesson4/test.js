#!/usr/bin/env node

const fs = require('fs');
const path = require("path");
const readline = require("readline");
const inquirer = require("inquirer");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let currentDir = process.cwd();




const run = async () => {

    const list = await fs.readdirSync(currentDir);

    objectsList = list.map(item => {
        if (fs.lstatSync(item).isDirectory()) {        
            return { fileName: item, type: 'dir'};
        } else if (fs.lstatSync(item).isFile()) {
            return { fileName: item, type: 'file'};
        }
    });

    const item = await inquirer 
            .prompt([{
                name: "chosen",
                type: "list",
                message: "choose file",
                choices: objectsList.map(item => ({name: item.fileName, value: item})),
            }])
            .then((answer) => answer.chosen);
             
    if (item.type === 'dir') {  
        currentDir = path.join(currentDir, item.fileName);
       // console.log(currentDir); 
        return await run();
    } else if(item.type === 'file') {
        const filePath = path.join(currentDir, item.fileName);
        fs.readFile(filePath, 'utf8', (err, data) => {
            console.log(data);            
        });
    };

};

run();






// rl.question("Please enter path to file: ", (inputedPath) => {

//     const filePath = path.join(__dirname, inputedPath);

    

//     console.log(list);

//     // fs.readFile(filePath, 'utf8', (err, data) => {
//     //     console.log(data);
//     //     rl.close();
//     // });
                
// });


// rl.on("close", () => {
//     process.exit(0);
// });


