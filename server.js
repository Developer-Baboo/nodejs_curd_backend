import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());

app.listen(8010, () => {
    console.log('listening on http://localhost:8010');
});
