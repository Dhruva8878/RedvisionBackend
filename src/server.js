import app from './index.js'; 
import connect from './configs/db.js';

const PORT = 4700;

const startServer = async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error({ message: error.message });
  }
};

startServer();
