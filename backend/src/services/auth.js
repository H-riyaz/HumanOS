const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getModels } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'change-me';
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

async function register(payload) {
  const { name, email, password, age, education, language, careerInterest, psychBackground, consentGiven } = payload;
  if (!email || !password) throw new Error('email and password required');
  const { User } = getModels();
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error('Email already registered');
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({ name, email, passwordHash, age, education, language, careerInterest, psychBackground, consentGiven: !!consentGiven });
  const safe = { id: user.id, name: user.name, email: user.email, role: user.role };
  return safe;
}

async function login({ email, password }) {
  if (!email || !password) throw new Error('email and password required');
  const { User } = getModels();
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid credentials');
  const ok = await bcrypt.compare(password, user.passwordHash || '');
  if (!ok) throw new Error('Invalid credentials');
  const token = signToken({ id: user.id, role: user.role });
  const safe = { id: user.id, name: user.name, email: user.email, role: user.role };
  return { token, user: safe };
}

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

function requireAuth(req, res, next) {
  const header = req.headers['authorization'] || req.headers['Authorization'];
  if (!header) return res.status(401).json({ error: 'Authorization header missing' });
  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid authorization format' });
  const payload = verifyToken(parts[1]);
  if (!payload) return res.status(401).json({ error: 'Invalid or expired token' });
  req.user = payload;
  next();
}

function requireRole(role) {
  return function (req, res, next) {
    if (!req.user) {
      const header = req.headers['authorization'] || req.headers['Authorization'];
      if (!header) return res.status(401).json({ error: 'Authorization header missing' });
      const parts = header.split(' ');
      if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid authorization format' });
      const payload = verifyToken(parts[1]);
      if (!payload) return res.status(401).json({ error: 'Invalid or expired token' });
      req.user = payload;
    }
    if (!req.user || (role && req.user.role !== role)) return res.status(403).json({ error: 'Insufficient role' });
    next();
  };
}

module.exports = { register, login, signToken, verifyToken, requireAuth, requireRole };