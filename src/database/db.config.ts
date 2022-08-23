import { DataSource } from "typeorm";

class ConnectDB {
  private static connection;
  constructor() {
    console.log("connecting .....");
  }

  public getInstance() {
    if (ConnectDB.connection == null) {
      ConnectDB.connection = new DataSource({
        type: "mongodb",
        host: "localhost",
        port: 27017,
        username: "",
        password: "",
        database: "vacancy",
        synchronize: true,
        logging: true,
        entities: ["src/*/entity/*{.js,.ts}"]
      });

      ConnectDB.connection
        .initialize()
        .then(() => {
          console.log("connect to db");
        })
        .catch((error) => {
          throw error;
        });
    }
    return ConnectDB.connection;
  }
}

export default new ConnectDB().getInstance();
