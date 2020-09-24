/**
 * This script contains an example of a Petal Metrics API call for all metrics
 * at once. You will need a valid developer API key to access.
 *
 * Usage: node api_all_metrics.js -k $API_KEY
 */
const { Command } = require('commander');
const { requestMetrics } = require('./api');

// parse API key from command line args
const program = new Command();
program
  .requiredOption('-k, --api-key <key>', 'Petal Metrics API key');
program.parse(process.argv);
const { apiKey } = program;

// construct a random EEG data array
let randomEEGData = Array(4);
for (let i = 0; i < randomEEGData.length; i++) {
  randomEEGData[i] = Array.from({ length: 256 }, () =>
    Math.floor(Math.random() * 10)
  );
}

requestMetrics(
  apiKey,
  randomEEGData,
  ['preprocessed_data', 'bandpower', 'artifact_count']
)
  .then(calculations => {
    console.log(calculations);
  });
