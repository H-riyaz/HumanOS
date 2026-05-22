(async ()=>{
  // Use in-memory sqlite for fast isolated tests
  process.env.DATABASE_URL = 'sqlite::memory:';
  try{
    const { initDb } = require('../src/models');
    const auth = require('../src/services/auth');
    const testEngine = require('../src/controllers/testEngine');

    await initDb();
    console.log('DB initialized (test)');

    // Register and login
    const user = await auth.register({ name: 'Test User', email: 'test@local', password: 'secret' });
    console.log('Registered user', user.id);
    const login = await auth.login({ email: 'test@local', password: 'secret' });
    if (!login.token) throw new Error('Login failed');
    console.log('Login successful, token length', login.token.length);

    // Create session and run through one question flow
    const sessionId = await testEngine.createSession({ tester: 'integration' });
    console.log('Created session', sessionId);
    const q = await testEngine.generateQuestion(sessionId);
    console.log('Generated question', q.id);
    const res = await testEngine.submitAnswer(sessionId, q.id, 'A', { responseTimeMs: 1200 });
    console.log('Submit result', res);

    console.log('\nINTEGRATION TESTS PASSED');
    process.exit(0);
  }catch(err){
    console.error('\nINTEGRATION TESTS FAILED', err);
    process.exit(2);
  }
})();