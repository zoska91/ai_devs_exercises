import express from 'express';
import { solution as solution0104 } from './exercises/0104';
import { solution as solution0105 } from './exercises/0105';
import { solution as solution0202 } from './exercises/0202';
import { solution as solution0203 } from './exercises/0203';
import { solution as solution0305 } from './exercises/0305';
import { solution as solution0401 } from './exercises/0401';
import { solution as solution0402 } from './exercises/0402';
import { solution as solution0403 } from './exercises/0403';

const app = express();
var port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// solution0104();
// solution0105();
// solution0202();
solution0203();
// solution0305();
// solution0401();
// solution0402();
// solution0403();
