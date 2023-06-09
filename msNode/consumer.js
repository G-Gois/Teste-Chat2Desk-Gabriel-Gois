const amqp = require('amqplib/callback_api');

amqp.connect('amqp://your_rabbitmq_server', (err, conn) => {
  if (err) throw err;

  conn.createChannel((err, ch) => {
    if (err) throw err;

    const queue = 'yourqueue';

    ch.assertQueue(queue, { durable: false });

    console.log(`[*] Waiting for messages in ${queue}. To exit, press CTRL+C`);

    ch.consume(queue, (msg) => {
      console.log(`[x] Received message: ${msg.content.toString()}`);
    }, { noAck: true });
  });
});
