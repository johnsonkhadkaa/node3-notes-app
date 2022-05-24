const fs = require("fs");
const { parse } = require("path");
const chalk = require("chalk");

const getNotes = function () {
  return "Your notes ...";
};

const addNotes = function (title, body) {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(function (note) {
    return note.title === title;
  });
  //   console.log(notes)
  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log("New note added!");
  } else {
    console.log("Note title is taken!");
  }
};

const removeNotes = function (title) {
  const notes = loadNotes();
  const tokeepNotes = notes.filter(function (note) {
    return note.title !== title;
  });

  if (notes.length > tokeepNotes.length) {
    console.log(chalk.bold.green("Title Match Found & Removed!"));
  } else {
    console.log(chalk.bold.red("Title Match Not Found!"));
  }
  saveNotes(tokeepNotes);
};

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNotes: removeNotes,
};
