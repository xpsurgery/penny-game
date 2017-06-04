switch (process.env.NODE_ENV) {
  case 'production':
  case 'test':
    module.exports = require('./configureStore.prod')
    break

  default:
    module.exports = require('./configureStore.dev')
    break
}

