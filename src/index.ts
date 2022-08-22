import app from "./app";

import dotenv from "dotenv";

dotenv.config();

const bootApp = async () => {
  app.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`);
  });
};

bootApp().catch((error) => {
  console.log(error);
});
