Backend README — HumanOS

Setup
1. cd backend
2. copy .env example and set DATABASE_URL, JWT_SECRET
3. npm install
4. npm run dev

Notes
- This scaffold uses Sequelize + Postgres by default. To switch to MongoDB, replace models and ORM layer.
- Adaptive engine and ML hooks are stubs. Implement secure pipelines for sensor data and model inference.
