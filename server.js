const Koa = require('koa')

const app = new Koa()
const router = require('koa-router')()
app.use(require('koa-static')('public'))

const config = require('./config')
const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert(config.serviceAccount),
  databaseURL: `https://${config.serviceAccount.project_id}.firebaseio.com`
})

// How to verify tokens:
// https://firebase.google.com/docs/auth/admin/verify-id-tokens
router.get('/verify', async (ctx, next) => {
  let idToken = ctx.request.query.token

  let decodedToken = await admin.auth().verifyIdToken(idToken)
  let result =
    decodedToken.email_verified && config.users.includes(decodedToken.email)

  ctx.response.type = 'json'
  ctx.response.body = {success: result}
})

app.use(router.routes())
app.use(router.allowedMethods())
const listener = app.listen(process.env.PORT || 8000, function() {
  console.log('Your app is listening on port ' + listener.address().port)
})
