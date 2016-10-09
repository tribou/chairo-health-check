# chairo-health-check

[![npm version](https://badge.fury.io/js/chairo-health-check.svg)](https://badge.fury.io/js/chairo-health-check)
[![Build Status](https://travis-ci.org/tribou/chairo-health-check.svg?branch=master)](https://travis-ci.org/tribou/chairo-health-check)
[![Coverage Status](https://coveralls.io/repos/github/tribou/chairo-health-check/badge.svg?branch=master)](https://coveralls.io/github/tribou/chairo-health-check?branch=master)
[![NSP Status](https://nodesecurity.io/orgs/tribou/projects/fc2fd7f1-5374-46d8-9f99-1cba3145e5aa/badge)](https://nodesecurity.io/orgs/tribou/projects/fc2fd7f1-5374-46d8-9f99-1cba3145e5aa)

Add a simple health check to your `chairo`/`seneca` service. Includes the ability to check which version of your service is running.

#### Usage

```js
const Chairo = require('chairo')
const HealthCheck = require('chairo-health-check')
const { name, version } = require('./package.json')

const HealthCheckPlugin = {
  register: HealthCheck,
  options: {
    name, // Optional. Default: $npm_package_name
    version, // Optional. Default: $npm_package_version
    action: {  // Optional. Default shown here
      role: 'health',
      cmd: 'check',
    }
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

The following configuration options are available:

- `name` - The name to be returned from the health check. Default: `process.env.npm_package_name`
- `version` - The version to be returned from the health check. Default: `process.env.npm_package_version`
- `action` - The pattern used to call the health check. Default: `{ role: 'health', cmd: 'check }`
