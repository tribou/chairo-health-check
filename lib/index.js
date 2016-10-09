const pkg = require('../package.json')


const health = (server, options, next) => {

  const defaults = {
    info: server.info,
    name: process.env.npm_package_name,
    version: process.env.npm_package_version,
    action: Object.assign({}, {
      role: 'health',
      cmd: 'check',
    }, options.action),
  }

  const config = Object.assign({}, defaults, options)

  server.dependency('chairo')
  server.seneca.add(config.action, (message, done) => {

    return done(null, {
      info: config.info,
      name: config.name,
      ready: true,
      version: config.version,
    })

  })

  next()

}

health.attributes = {
  pkg,
}


module.exports = health
