const admin = require("firebase-admin");

const serviceAccount = require("./service_account_key.json")
const config = require('./config.json')

let app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${config.database_name}.firebaseio.com`
})

console.log(app)
