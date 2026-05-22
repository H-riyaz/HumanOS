const express = require('express');
const router = express.Router();
const auth = require('../services/auth');
const testEngine = require('../controllers/testEngine');

// Onboarding
router.post('/onboard', async (req, res) => {
  // minimal onboarding stub — save profile and return session token
  const profile = req.body;
  // TODO: validate, create user, create initial adaptive session
  res.json({ ok: true, message: 'Onboarding received', profile });
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
