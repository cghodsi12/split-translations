const core = require('@actions/core');
const wait = require('./wait');
const fs = require('fs');


// Read the JSON file
const jsonData = fs.readFileSync('translation.json');
const data = JSON.parse(jsonData);

// Extract entries with "DE" value name
const deEntries = Object.entries(data).filter(([key, obj]) => {
  return obj.hasOwnProperty("DE");
});
const deData = Object.fromEntries(deEntries.map(([key, obj]) => [key, { DE: obj.DE }]));

// Write to "de.json" file
fs.writeFileSync('de.json', JSON.stringify(deData, null, 2));
console.log('Created de.json');

// Extract entries with "EN" value name
const enEntries = Object.entries(data).filter(([key, obj]) => {
  return obj.hasOwnProperty("EN");
});
const enData = Object.fromEntries(enEntries.map(([key, obj]) => [key, { EN: obj.EN }]));

// Write to "en.json" file
fs.writeFileSync('en.json', JSON.stringify(enData, null, 2));
console.log('Created en.json');

console.log('Separate JSON files have been created.');




// most @actions toolkit packages have async methods
async function run() {
  try {
    const ms = core.getInput('milliseconds');
    core.info(`Waiting ${ms} milliseconds ...`);

    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    await wait(parseInt(ms));
    core.info((new Date()).toTimeString());

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
