const pkg = require('../package.json')


const health = (server, options, next) => {

  const { cmd, host, role, src } = options
  const { info } = server
  const pk = options.pkg
  const name = options.name || pk ? pk.name : process.env.npm_package_name
  const version = options.version || pk ? pk.version
    : process.env.npm_package_version

  const action = {
    role: 'health',
    cmd: 'check',
  }

  if (cmd) action.cmd = cmd
  if (host) action.host = host
  if (role) action.role = role
  if (src) action.src = src

  server.dependency('chairo')
  server.seneca.add(action, (message, done) => {

    return done(null, {
      info,
      name,
      ready: true,
      version,
    })

  })

  next()

}

health.attributes = {
  pkg,
}


module.exports = health
