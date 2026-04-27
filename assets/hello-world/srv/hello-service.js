const cds = require('@sap/cds')

module.exports = class HelloService extends cds.ApplicationService {

  init() {
    const { Greetings } = this.entities

    // Custom function: greet by name
    this.on('greet', async (req) => {
      const name = req.data.name || 'World'
      return `Hello ${name}!`
    })

    // Auto-generate message before creating a greeting
    this.before('CREATE', Greetings, (req) => {
      if (!req.data.message) {
        req.data.message = `Hello ${req.data.name || 'World'}!`
      }
    })

    return super.init()
  }
}