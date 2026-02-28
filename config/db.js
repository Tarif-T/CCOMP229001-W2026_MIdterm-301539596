require('dotenv').config()
const mongoose = require('mongoose');

let ConnectionString = process.env.CONNECTION_STRING || "mongodb+srv://tarifabdalla22:<COMP229>@clustermidterm.ocyqdoy.mongodb.net/?appName=ClusterMidterm+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

module.exports = async function () {
  try {
    
    await mongoose.connect(ConnectionString, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("==== Backend successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    
    
    await mongoose.disconnect();
  }
}
