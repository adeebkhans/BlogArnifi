// server.js - Start server
import app from './app.js';


const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} local- http://localhost:${PORT}`);
});
