const Koa = require('koa')
const app = new Koa()
app.use(require('koa-static')('public'))

listener = app.listen(process.env.PORT || 8000, function() {
  console.log('Your app is listening on port ' + listener.address().port)
})
