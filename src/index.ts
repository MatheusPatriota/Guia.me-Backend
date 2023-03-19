import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { routes } from './routes/routes';


dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(routes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`/-------- Server Started --------/`);
  console.log(`Server running on port ${port}`);
});
