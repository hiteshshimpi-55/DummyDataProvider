const express = require('express');
const http = require('https');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/completions', (req, res) => {
  const options = {
    method: 'POST',
    hostname: 'openai80.p.rapidapi.com',
    port: null,
    path: '/chat/completions',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '3b6971269fmsh44825ae3f606276p189f4cjsne5d4c8c883fd',
      'X-RapidAPI-Host': 'openai80.p.rapidapi.com',
    },
  };

  const request = http.request(options, (response) => {
    const chunks = [];

    response.on('data', (chunk) => {
      chunks.push(chunk);
    });

    response.on('end', () => {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
      res.send(body.toString());
    });
  });

  request.write(
    JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: req.body.content, // Extract the user's message from the request body
        },
      ],
    })
  );
  request.end();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
