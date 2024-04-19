import express from 'express';
import ngrok from 'ngrok';

// import answerRouter from './exercises/0404';
// import answerRouter from './exercises/0405';
import answerRouter, { solution } from './exercises/0503';

const app = express();

var PORT = 8080;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/aidev-ownapi', answerRouter);

app.listen(PORT, async () => {
  console.log(`Localhost running on: http://localhost:${PORT}`); // Log the local server URL

  // Connect to ngrok to expose the server publicly
  ngrok
    .connect(PORT)
    .then((ngrokUrl: any) => {
      console.log(`Ngrok tunnel in: ${ngrokUrl}`); // Log the ngrok URL once the tunnel is established
      solution(ngrokUrl);
    })
    .catch((error: any) => {
      console.log(`Couldn't tunnel ngrok: ${error}`); // Log an error if ngrok fails to start
    });
});
