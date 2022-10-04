const mongoDb = require("mongodb");

var url =
  "mongodb+srv://test:1234@cluster0.nzol9ko.mongodb.net/?retryWrites=true&w=majority";

class MongoDbService {
  static collection(type) {
    let client = new mongoDb.MongoClient(url);
    return client.connect().then(() => {
      let db = client.db("myapp");
      let collection = db.collection("userData");
      return {
        collection,
      };
    });
  }
}

module.exports = MongoDbService;
