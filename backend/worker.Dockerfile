FROM node:18-slim
WORKDIR /app

# Install only production dependencies for the worker
COPY backend/package.json backend/package-lock.json* ./backend/
RUN cd backend && npm ci --omit=dev

# Copy repository (scaffold)
COPY . .
WORKDIR /app/backend

# Run the worker entrypoint
CMD ["node", "src/worker/index.js"]
