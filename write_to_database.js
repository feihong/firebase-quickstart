// Source:
// https://firebase.google.com/docs/database/admin/save-data
const config = require('./config.json')
const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert(config.serviceAccount),
  databaseURL: `https://${config.serviceAccount.project_id}.firebaseio.com`
})

const db = admin.database()
let ref = db.ref('events/read')
itemRef = ref.child('facebook:siskelfilmcenter')

itemRef.set({
  111: true,
  222: true,
  333: true,
  444: true,
}).then(() => {
  console.log('Finished writing to database!')
})
