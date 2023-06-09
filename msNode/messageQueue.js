const amqp = require('amqplib/callback_api');

let channel;
amqp.connect('amqp://your_rabbitmq_server', (err, conn) => {
  if (err) throw err;
  conn.createChannel((err, ch) => {
    if (err) throw err;
    channel = ch;
  });
});

module.exports = { channel };