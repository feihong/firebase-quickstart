const Koa = require('koa')
const router = require('koa-router')()

const app = new Koa()
app.use(require('koa-static')('public'))

const config = require('./config.json')
const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert(config.serviceAccount),
  databaseURL: `https://${config.serviceAccount.project_id}.firebaseio.com`
})

// How to verify tokens:
// https://firebase.google.com/docs/auth/admin/verify-id-tokens
router.get('/verify', async (ctx, next) => {
  let idToken = ctx.request.query.token
  // console.log('ID token:', idToken)

  let decodedToken = await admin.auth().verifyIdToken(idToken)
  // console.log('Decoded token:', decodedToken)
  console.log('Email:', decodedToken.email)
  console.log('Email verified?:', decodedToken.email_verified)

  ctx.response.body = 'ok'
})

app.use(router.routes())
app.use(router.allowedMethods())
const listener = app.listen(process.env.PORT || 8000, function() {
  console.log('Your app is listening on port ' + listener.address().port)
})
