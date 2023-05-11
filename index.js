const http = require('https');
const fs = require('fs');
const yaml = require('js-yaml');

const configPath = './config.yaml';
const cofig = yaml.load(fs.readFileSync(configPath, 'utf8'));

const apiKey = cofig.api_key;

const options = {
	method: 'POST',
	hostname: 'openai80.p.rapidapi.com',
	port: null,
	path: '/chat/completions',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': apiKey,
		'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.write(JSON.stringify({
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'user',
      content: 'Hello!'
    }
  ]
}));
req.end();