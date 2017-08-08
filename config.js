const config = require('./config.json')
config.serviceAccount = require('./service_account_key.json')

config.keywords = ['china', 'chinese', 'mandarin', 'taiwan', 'hong kong',
  'cantonese']

config.facebookPages = [
  'ChineseFineArts',
  'ccamuseum',
  'windmilldramaclub',
  'ChicagoChinatownChamberofCommerce',
  'siskelfilmcenter',
  'musicboxchicago',
  'sophiaschoicepresents',
  'faaimous',
  'chicagofilmfestival',
  'ChicagoCulturalCenter',
]

module.exports = config
