const express = require('express');
const router = express.Router();
const auth = require('../services/auth');
const testEngine = require('../controllers/testEngine');

// Register
router.post('/auth/register', async (req, res) => {
  try {
    const user = await auth.register(req.body);
    res.json({ ok: true, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/auth/login', async (req, res) => {
  try {
    const data = await auth.login(req.body);
    res.json({ ok: true, ...data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Onboarding - creates an adaptive session and optionally a user
router.post('/onboard', async (req, res) => {
  try {
    const profile = req.body || {};
    // If password provided, register user
    let user = null;
    if (profile.email && profile.password) {
      try {
        user = await auth.register(profile);
      } catch (e) {
        // ignore duplicate user during onboarding
      }
    }

    const sessionId = testEngine.createSession(profile);
    res.json({ ok: true, message: 'Onboarding received', sessionId, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Adaptive question fetch
router.get('/question', async (req, res) => {
  const q = await testEngine.generateQuestion(req.query.sessionId);
  res.json(q);
});

// Submit answer
router.post('/answer', async (req, res) => {
  const { sessionId, questionId, answer, meta } = req.body;
  const result = await testEngine.submitAnswer(sessionId, questionId, answer, meta);
  res.json(result);
});

// Researcher exports (protected)
router.get('/export/summary', auth.requireRole('researcher'), async (req, res) => {
  // TODO: implement anonymized export
  res.json({ ok: true, msg: 'export placeholder' });
});

module.exports = router;
