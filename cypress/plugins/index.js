const injectDevServer = require('@cypress/react/plugins/react-scripts')

module.exports = (on, config) => {
  injectDevServer(on, config)

  config.env.customVariable = process.env.CUSTOM_VAR || 'Example'
  console.log(config)

  return config
}