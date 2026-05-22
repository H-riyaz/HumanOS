const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initDb } = require('./models');
const apiRouter = require('./routes/api');
const researchRouter = require('./routes/research');
const dataRouter = require('./routes/data');
const arenaController = require('./controllers/arena');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

// Initialize DB (Sequelize)
initDb().then(() => console.log('DB initialized')).catch(err => console.error(err));

// Mount API
app.use('/api', apiRouter);
app.use('/api/research', researchRouter);
app.use('/api/data', dataRouter);

// Serve frontend (production build) if available
const path = require('path');
const fs = require('fs');
const frontendDist = path.join(__dirname, '..', '..', 'frontend', 'dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// Health
app.get('/health', (req, res) => res.json({ status: 'ok', ts: Date.now() }));

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

// Attach socket.io
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });
arenaController.init(io);

server.listen(PORT, () => console.log(`HumanOS backend listening on ${PORT}`));
