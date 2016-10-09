# chairo-health-check

#### Usage

```js
const Chairo = require('chairo')
const HealthCheck = require('chairo-health-check')
const { version } = require('./package.json')

const HealthCheckPlugin = {
  register: HealthCheck,
  options: {
    version,
  },
}

server.register([Chairo, HealthCheckPlugin], (error) => {

  if (error) return server.log(['error'], error)

  return server.start(() => {

    server.log(['info'], `Server running at: ${server.info.uri}`)

  })

})
```

#### Options

The following registration options are available:

- `action` -
