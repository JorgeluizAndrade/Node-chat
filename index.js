const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const corsOptions = {
  origin: "https://chat-s9df.onrender.com",
  optionsSuccessStatus: 200,
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
const port = process.env.PORT || 3001;

app.post("/signup", async (req, res) => {
  const { username, secret } = req.body;
  try {
    const r = await axios.post(
      "https://api.chatengine.io/users/",
      { username, secret },
      { headers: { "Private-Key": process.env.CHAT_ENGINE_PRIVATE_KEY } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.post("/login", async (req, res) => {
  const { username, secret } = req.body;
  try {
    const r = await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": process.env.CHAT_ENGINE_PROJECT_ID,
        "User-Name": username,
        "User-Secret": secret,
      },
    });
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
