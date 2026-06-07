const express = require("express");
const cors = require("cors");
// const crypto = require("crypto");

const app = express();

const PORT = 5000;
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

require("./conn");
// app.use(cors());
// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:5175",
//   }),
// );

const UserRoutes = require("./Routes/user");
const ResumeRoutes = require("./Routes/resume");

app.use("/api/user", UserRoutes);
app.use("/api/resume", ResumeRoutes);

app.listen(PORT, () => {
  console.log("backend is running on PORT", PORT);
});
