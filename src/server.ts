/**
 * @author aliasgarbootwala@gmail.com
*/

import app from "./app.js";
import http from "node:http";

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
