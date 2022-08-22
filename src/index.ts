import app from "./app";

import dotenv from "dotenv";

dotenv.config();

const bootApp = async () => {
  const server = app.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`);
  });

  process.on("SIGTERM", () => {
    server.close(() => {
      console.log("exit app");
    });
  });
};

bootApp().catch((error) => {
  console.log(error);
});
