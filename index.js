const https = require('https');


const reqstr = `
https://cemc2.math.uwaterloo.ca/contest/PSG/school/print.php?f=web&h=y&t=&ids=p${Math.floor(Math.random() * 2100)}
`

const req = https.request(reqstr, res => {
	const data = [];

	res.on('data', _ => data.push(_))
	res.on('end', () => console.log(data.join()))
});

req.end();