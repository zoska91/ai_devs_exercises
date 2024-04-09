import express from 'express';
import { solution as solution0305 } from './exercises/0305';
import { solution as solution0401 } from './exercises/0401';

const app = express();
var port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// solution0305();
solution0401();
