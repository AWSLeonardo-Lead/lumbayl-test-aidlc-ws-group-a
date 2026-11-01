import { createApp } from './app.js';

const PORT = 3000;
const HOST = '127.0.0.1'; // BR2.1: NEVER 0.0.0.0

const app = createApp();

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
