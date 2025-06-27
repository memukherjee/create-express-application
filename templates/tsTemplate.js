module.exports = (useDotenv) => `
import express from 'express';
import cors from 'cors';
import router from './routes';
${useDotenv ? "import dotenv from 'dotenv';\ndotenv.config();" : ""}

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`✅ Server running at http://localhost:\${PORT}\`);
});
`.trim();