const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const roomRouter = require('./routes/roomRoute');
const liveRouter = require('./routes/liveRoute');
const missionRouter = require('./routes/missionRoute');

const app = express();
const PORT = 8000;

const whiteListCors = [
    'https://www.jkt48showroom.com',
    'http://localhost:3000'
];

// Middleware CORS
app.use(cors({
    origin: function (origin, cb) {
        if (!origin || whiteListCors.includes(origin)) {
            cb(null, true);
        } else {
            cb(new Error('Not allowed by CORS'));
        }
    }
}));

// Middleware Body Parser
app.use(bodyParser.json());

// Error Handler untuk CORS
app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        res.status(403).send({ error: 'Origin not allowed by CORS policy' });
    } else {
        next(err);
    }
});

// Route Utama
app.get('/', (req, res) => {
    res.send({
        message: 'Welcome To JKT48 SHOWROOM API',
        author: 'https://github.com/ikhbaldwiyan',
        repository: 'https://github.com/ikhbaldwiyan/jkt48-showroom-api'
    });
});

// Router lainnya
app.use('/api/rooms', roomRouter);
app.use('/api/lives', liveRouter);
app.use('/api/missions', missionRouter);

// Menjalankan Server
app.listen(PORT, () => {
    console.log(`Server Running on port http://localhost:${PORT}`);
});
