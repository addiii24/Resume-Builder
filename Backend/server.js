import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connectdb from "./src/Config/db.js";

const PORT = process.env.PORT || 5000;

connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT} ✅`);
    })
  })
  .catch((error) => {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  })