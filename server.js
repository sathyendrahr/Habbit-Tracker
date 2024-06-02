import app from "./app.js";
import { connectToDatabase } from "./config/dbconfig.js";

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
  connectToDatabase();
});
