const fs = require ('fs');
const path = require ('path');
const {v4: uuidv4} = require ('uuid');
const {format} = require ('date-fns');

// LogEvents function to create a log entry
async function LogEvents () {
  const newUUID = uuidv4 ();
  const dateTime = new Date ();

  // Create log item
  const logItem = `My new ID is ${newUUID} and my new date is ${format (dateTime, 'yyyy MM dd\tHH:mm:ss')}`;
  console.log (logItem);

  // Set the folder and file paths
  const folderPath = path.join (__dirname, 'logs');
  const filePath = path.join (folderPath, 'eventLogs.txt');

  // Check if the logs folder exists, create it if not
  if (!fs.existsSync (folderPath)) {
    fs.mkdirSync (folderPath, {recursive: true});
    console.log ('Folder created successfully ✅');
  } else {
    console.log ('Oops!!! 😴😨😩 Folder already exists');
  }

  // Check if the file exists
  if (fs.existsSync (filePath)) {
    console.log ('Oops. File already exists.');
  } else {
    console.log ('File does not exist. Creating one...');
    fs.writeFileSync (filePath, '', 'utf8');
    console.log ('File created successfully 🚀🚀🚀');
  }

  // Now append data into the file
  fs.appendFileSync (filePath, logItem + '\n', 'utf-8'); // Append the logItem with a new line
  console.log ('Message appended successfully to file eventLogs.txt');
}

// Export the LogEvents function
module.exports = LogEvents;

// Call the LogEvents function (you can also call it from index.js)
LogEvents ();
