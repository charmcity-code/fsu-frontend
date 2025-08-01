const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

//CORS must be added BEFORE your routes
app.use(cors({ origin: /localhost/ }));
//middleware
app.use(express.json());

//routes
app.get("/departments", (req, res) => {
  // return all departments
});

app.get("/faculty", (req, res) => {
  // return all faculty
});

// server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
