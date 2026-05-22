const express = require('express');
const router = express.Router();
const auth = require('../services/auth');
const { getModels } = require('../models');

router.get('/summary', auth.requireRole('researcher'), async (req,res)=>{
  const { Session, Question, Answer } = getModels();
  // Simple anonymized counts
  const sessionCount = await Session.count();
  const answerCount = await Answer.count();
  res.json({ ok:true, sessionCount, answerCount });
});

module.exports = router;