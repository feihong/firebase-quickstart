const pathlib = require('path')
const fs = require('fs-extra')
const moment = require('moment')
const axios = require('axios')
const config = require('./config')

const dataDir = pathlib.resolve('./.data')

async function fetchAll() {
  let result = []

  for (let name of config.facebookPages) {
    let path = pathlib.join(dataDir, 'facebook__' + name)

    if (await recentFileExists(path)) {
      console.log(`Getting ${name} events from cache`)
      let data = await fs.readJSON(path)
      result.push(...data.data)
    } else {
      console.log(`Downloading ${name} events`)
      let data = await downloadFacebookEvents(name)
      await fs.outputJson(path, data, {spaces: 2})
      result.push(...data.data)
    }
  }

  return result
}

/* Return true if a file at the given path exists and was created within the
   last 6 hours; false otherwise.
*/
async function recentFileExists(path) {
  if (await fs.pathExists(path)) {
    let stats = await fs.stat(path)
    return stats.ctime > moment().subtract(6, 'hours')
  } else {
    return false
  }
}

async function downloadFacebookEvents(name) {
  let url = `https://graph.facebook.com/v2.9/${name}/events`
  let res = await axios.get(url, {
    params: {
      access_token: config.facebookAccessToken,
      since: moment().format(),   // only get upcoming events
    },
    responseType: 'json'
  })
  return res.data
}

async function main() {
  // let data = await downloadFacebookEvents('ChineseFineArts')
  // console.log(`Downloaded ${data.data.length} events`)
  // await fs.outputJson('temp.json', data, {spaces: 2})

  let events = await fetchAll()
  console.log(`Got ${events.length} events`)
  // for (let event of events) {
  //   console.log(event.name)
  // }
}

main()
