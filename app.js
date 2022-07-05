const notes = require("./notes.js");
const yargs = require("yargs");
const { argv } = require("yargs");

// const chalk = require('chalk')


// to run this: node app.js add/list/read/remove --title=" " --body=" "

// argv property is an inbuilt application programming interface of the process module which is used to get the arguments passed to the node. js process when run in the command line. Return Value: This property returns an array containing the arguments passed to the process when run it in the command line.

// Add , Remove , List , Read functionality using yargs
// Add
yargs.command({
  command: "add",
  describe: "Add a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.addNotes(argv.title, argv.body);
  },
});

// Remove
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.removeNotes(argv.title);
  },
});

// List
yargs.command({
  command: "list",
  describe: "List a note",
  handler: () => {
    notes.listNotes();
  },
});

// Read
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.readNote(argv.title)
  },
});

yargs.parse();
// console.log(yargs.argv)

// Process argv(argument vector)
// const command = process.argv[2]
// // console.log(command)

// if(command==='add'||command==='Add'||command==='ADD'){
//     console.log('Adding Content ...')
// }  else if (command==='remove'||command==='Remove'||command==='REMOVE'){
//     console.log('Removing Content...')
// }

// Chalk-Package utilization
// const data = notes()
// console.log(chalk.bold.red('Warning!'))
// console.log(chalk.inverse.bold.green('Success'))
// console.log(chalk.inverse.bold.yellow(data))

// VALIDATOR PACKAGE
// const validator = require('validator')
// console.log(validator.isURL('john.mail.com'))

// FILE PACKAGE
// const fs = require('fs')
// fs.writeFileSync('notes.txt','You have Docker installed on your system.Do you want to install the recommended extensions for it?')
// // challenge: Append the message to notes.txt
// // 1. Use appendFileSync to append to the file
// // 2. Run the Script
// // 3. Check your work by opening the file and viewing the appended text
// fs.appendFileSync('notes.txt','  I am trying to append data using the append function!')
