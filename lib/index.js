const Promise = require('bluebird')
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
    promise: Promise.resolve(null),
  }

  const config = Object.assign({}, defaults, options)

  server.dependency('chairo')
  server.seneca.add(config.action, (message, done) => {

    config.promise
      .then((value) => {

        const result = {
          info: config.info,
          name: config.name,
          ready: true,
          version: config.version,
        }

        if (value) result.promise = value

        return done(null, result)

      })
      // .catch((error) => {

      //   return done(error)

      // })

  })

  next()

}

health.attributes = {
  pkg,
}


module.exports = health
