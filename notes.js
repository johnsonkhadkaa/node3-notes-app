const fs = require("fs");
const { parse } = require("path");
const chalk = require("chalk");
const { title } = require("process");
const { match } = require("assert");



const addNotes = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter((note) => {
  //   return note.title === title;
  // });
  const duplicateNote = notes.find((note)=> note.title == title )

  //  debugger

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.bold.green("New note added!"));
  } else {
    console.log(chalk.bold.red("Note title is already taken!"));
  }
};

const removeNotes = (title) => {
  const notes = loadNotes();
  const tokeepNotes = notes.filter(function (note) {
    return note.title !== title;
  });

  if (notes.length > tokeepNotes.length) {
    console.log(chalk.inverse.green("Title Match Found & Removed!"));
  } else {
    console.log(chalk.inverse.red("Title Match Not Found!"));
  }
  saveNotes(tokeepNotes);
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const listNotes = () => {
  console.log(chalk.inverse.yellow("Your notes :"));
  const notes = loadNotes();
  notes.forEach((note) => {
    console.log(note.title + " : " + note.body);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const duplicateNotes = notes.find((note) => note.title === title)
  if (duplicateNotes) {
    console.log(chalk.inverse.green(duplicateNotes.title) + " : " + (duplicateNotes.body));
  } else {
    console.log(chalk.inverse.red("Note title Not Available!"));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNotes: addNotes,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNote: readNote,
};
