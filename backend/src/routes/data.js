const express = require('express');
const router = express.Router();
const auth = require('../services/auth');
const { getModels } = require('../models');

// Delete all personal data for the authenticated user (GDPR-style)
router.post('/delete', auth.requireAuth, async (req,res)=>{
  const { Session, Answer, Question } = getModels();
  const userId = req.user.id;
  // delete sessions and related answers
  const sessions = await Session.findAll({ where: { userId } });
  const sessionIds = sessions.map(s=>s.id);
  await Answer.destroy({ where: { sessionId: sessionIds } });
  await Question.destroy({ where: { sessionId: sessionIds } });
  await Session.destroy({ where: { userId } });
  res.json({ ok: true, deletedSessions: sessionIds.length });
});

module.exports = router;