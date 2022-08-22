import { DataSource } from "typeorm";

class ConnectDB {
  private static connection;
  constructor() {
      console.log('connecting to db');
  }

  public getInstance() {
    if (!ConnectDB.connection) {
      ConnectDB.connection = new DataSource({
        type: "mongodb",
        host: "localhost",
        port: 27017,
        username: "",
        password: "",
        database: "vacancy",
        synchronize: true,
        logging: true,
        entities: ["../*/entities/**.ts"],
      });
    }
    return ConnectDB.connection;
  }
}

export default new ConnectDB().getInstance();
