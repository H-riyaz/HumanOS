const { getModels } = require('../models');
const { v4: uuidv4 } = require('uuid');

// DB-backed adaptive engine
async function createSession(profile) {
  const { Session } = getModels();
  const session = await Session.create({ profile: profile || {}, difficulty: profile?.difficulty || 3, status: 'active' });
  return session.id;
}

async function generateQuestion(sessionId) {
  const { Session, Question } = getModels();
  const session = await Session.findByPk(sessionId);
  if (!session) return { error: 'session_not_found' };

  const difficulty = session.difficulty || 3;
  const domainList = ['logical_reasoning','pattern_recognition','numerical','verbal','spatial','emotional_intelligence','memory','reaction_speed'];
  const domain = domainList[Math.floor(Math.random()*domainList.length)];

  // Dynamic prompt generation stub — replace with real generator
  const seed = Math.floor(Math.random()*100000);
  const prompt = `Auto-generated ${domain} puzzle [diff ${difficulty}] — seed ${seed}`;
  const choices = ['A','B','C','D'];

  const q = await Question.create({ sessionId, domain, difficulty, prompt, choices, meta: { generatedAt: new Date(), seed } });
  await session.update({ lastActive: new Date() });

  return { id: q.id, domain: q.domain, difficulty: q.difficulty, prompt: q.prompt, choices, meta: q.meta };
}

async function submitAnswer(sessionId, questionId, answer, meta) {
  const { Session, Question, Answer } = getModels();
  const session = await Session.findByPk(sessionId);
  if (!session) return { error: 'session_not_found' };
  const q = await Question.findByPk(questionId);
  if (!q) return { error: 'question_not_found' };

  // Performance metrics from meta
  const responseTimeMs = meta?.responseTimeMs || 1500;
  const hesitationMs = meta?.hesitationMs || 0;
  const revisions = meta?.revisions || 0;
  const emotionalScore = (meta?.emotionalScore !== undefined) ? meta.emotionalScore : 0.5;

  // Placeholder correctness evaluation — integrate real item scoring later
  const correct = Math.random() > 0.4;
  const performance = { correct, responseTimeMs, hesitationMs, revisions, emotionalScore };

  // Adaptive difficulty policy (simple heuristic)
  if (correct && responseTimeMs < 4000 && emotionalScore > 0.3) {
    session.difficulty = Math.min(10, (session.difficulty || 3) + 1);
  } else if (!correct || responseTimeMs > 8000 || emotionalScore < 0.2) {
    session.difficulty = Math.max(1, (session.difficulty || 3) - 1);
  }
  await session.save();

  // Record answer
  const ans = await Answer.create({ sessionId, questionId, answer, meta: meta || {}, performance });

  // Hook: enqueue ML inference for richer scoring (placeholder)

  return { ok: true, performance, nextDifficulty: session.difficulty };
}

module.exports = { createSession, generateQuestion, submitAnswer };
