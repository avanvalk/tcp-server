const { createConnection } = require('net');
const { createInterface } = require('readline');

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

const client = createConnection(7890, () => {
  rl.on('line', line => {

    rl.prompt();
    client.write(line);
  });
});

// use rl to print data from server to console
client.on('data', data => {
  rl.write(data);
});
