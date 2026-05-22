const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initDb } = require('./models');
const apiRouter = require('./routes/api');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

// Initialize DB (Sequelize)
initDb().then(() => console.log('DB initialized')).catch(err => console.error(err));

// Mount API
app.use('/api', apiRouter);

// Health
app.get('/health', (req, res) => res.json({ status: 'ok', ts: Date.now() }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`HumanOS backend listening on ${PORT}`));
