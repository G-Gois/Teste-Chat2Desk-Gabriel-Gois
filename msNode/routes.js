const express = require('express');
const router = express.Router();
const { insertDataPostgreSQL, selectDataPostgreSQL, insertDataMongoDB, selectDataMongoDB, insertDataRedis, selectDataRedis } = require('./db');
const { channel } = require('./messageQueue');

router.post('/data', (req, res) => {
  const data = req.body;

  // PostgreSQL insert
  insertDataPostgreSQL(data);

  // MongoDB insert
  insertDataMongoDB(data);

  // Redis insert
  insertDataRedis(data);

  channel.assertQueue('yourqueue', { durable: false });
  channel.sendToQueue('yourqueue', Buffer.from(JSON.stringify(data)));

  res.json({ message: 'Data inserted' });
});

router.get('/data/:key', (req, res) => {
  const key = req.params.key;

  // PostgreSQL select
  selectDataPostgreSQL(key);

  // MongoDB find
  selectDataMongoDB(key);

  // Redis get
  selectDataRedis(key);

  res.json({ message: 'Data selected' });
});

router.post('/receive', (req, res) => {
  channel.assertQueue('yourqueue', { durable: false });
  channel.consume('yourqueue', (msg) => {
    const data = JSON.parse(msg.content.toString());
    console.log('Received message:', data);

    // Faça o processamento necessário com a mensagem recebida
    // Pode ser uma operação de gravação em banco de dados ou qualquer outra ação

    channel.ack(msg); // Confirma o processamento da mensagem
  });

  res.json({ message: 'Receiving messages' });
});

module.exports = router;
