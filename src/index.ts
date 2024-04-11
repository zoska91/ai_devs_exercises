import express from 'express';

import answerRouter from './exercises/0404';

const app = express();

var port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/aidev-ownapi', answerRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
