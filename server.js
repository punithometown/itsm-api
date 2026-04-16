require('dotenv').config();
const app = require('./src/app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected',process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => console.error(err));