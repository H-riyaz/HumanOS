HumanOS — ML & Inference Pipeline (notes)

- Inference queue (backend/src/services/inferenceQueue.js) to schedule CPU/GPU-bound tasks
- Emotion stub service (backend/src/services/emotionStub.js) — replace with TensorFlow/MediaPipe workers
- Design: workers receive frames/audio, compute features, write anonymized signals to DB, and return scores
- Ensure consent gating and secure transport (HTTPS, signed uploads)
