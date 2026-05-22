// Simple in-memory inference queue to schedule ML tasks
const queue = [];
let running = false;

function enqueue(task) {
  queue.push(task);
  run();
}

async function run() {
  if (running) return;
  running = true;
  while(queue.length){
    const task = queue.shift();
    try{
      // Placeholder: call task.handler(task.payload)
      await (task.handler ? task.handler(task.payload) : Promise.resolve());
    }catch(e){ console.error('inference task failed', e); }
  }
  running = false;
}

module.exports = { enqueue };