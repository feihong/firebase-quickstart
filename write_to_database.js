// Source:
// https://firebase.google.com/docs/database/admin/save-data
const config = require('./config.json')
const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert(config.serviceAccount),
  databaseURL: `https://${config.serviceAccount.project_id}.firebaseio.com`
})

const moment = require('moment')

const db = admin.database()
let ref = db.ref('events/read')
itemRef = ref.child('facebook:siskelfilmcenter')

itemRef.set({
  111: moment().format(),
  222: moment().add(2, 'days').format(),
  333: null,
  444: moment().add(3, 'weeks').format(),
}).then(() => {
  console.log('Finished writing to database!')
})
