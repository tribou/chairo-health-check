'use strict'

// Increase max listeners to avoid "Warning: Possible EventEmitter
// memory leak detected" during the test
process.setMaxListeners(100)

// Load modules
const Chairo = require('chairo')
const Code = require('code')
const Hapi = require('hapi')
const Lab = require('lab')
const pkg = require('../package.json')

// Test shortcuts
const lab = exports.lab = Lab.script()
const describe = lab.describe
const it = lab.it
const expect = Code.expect

// SUT
const HealthCheckPlugin = require('./index.js')

const plugins = [
  Chairo,
  HealthCheckPlugin,
]


describe('role:health,cmd:check', () => {


  it('registers as a Hapi plugin without error', (done) => {

    const server = new Hapi.Server()
    server.connection()
    server.register(plugins, (error) => {

      expect(error).to.not.exist()

      const serverPlugins = Object.keys(server.registrations)
      expect(serverPlugins).to.contain(HealthCheckPlugin.attributes.pkg.name)
      done()

    })

  })


  it('returns ready:true', (done) => {

    const server = new Hapi.Server()
    server.connection()
    server.register(plugins, (error) => {

      expect(error).to.not.exist()

      server.seneca.act({
        role: 'health',
        cmd: 'check',
      }, (err, result) => {

        expect(err).to.not.exist()
        expect(result.ready).to.be.true()
        done()

      })

    })

  })


  it('returns current package version and name by default', (done) => {

    const server = new Hapi.Server()
    server.connection()
    server.register(plugins, (error) => {

      expect(error).to.not.exist()

      server.seneca.act({
        role: 'health',
        cmd: 'check',
      }, (err, result) => {

        expect(err).to.not.exist()
        expect(result.version).to.equal(pkg.version)
        expect(result.name).to.equal(pkg.name)
        done()

      })

    })

  })


  it('returns current server info', (done) => {

    const server = new Hapi.Server()
    server.connection()
    server.register(plugins, (error) => {

      expect(error).to.not.exist()

      server.seneca.act({
        role: 'health',
        cmd: 'check',
      }, (err, result) => {

        expect(err).to.not.exist()
        expect(result.info).to.equal(server.info)
        done()

      })

    })

  })


  it('adds cmd, host, role, src to action if set', (done) => {

    const action = {
      cmd: 'testcmd',
      host: 'testhost',
      role: 'testrole',
      src: 'testsrc',
    }

    const server = new Hapi.Server()
    server.connection()
    server.register([Chairo, {
      register: HealthCheckPlugin,
      options: {
        action,
      },
    }], (error) => {

      expect(error).to.not.exist()

      server.seneca.act(action, (err, result) => {

        expect(err).to.not.exist()
        expect(result.ready).to.be.true()
        server.seneca.close()
        done()

      })

    })

  })


  it('returns passed options name and version', (done) => {

    const options = {
      name: 'test name',
      version: 'test version',
    }

    const server = new Hapi.Server()
    server.connection()
    server.register([Chairo, {
      register: HealthCheckPlugin,
      options,
    }], (error) => {

      expect(error).to.not.exist()

      server.seneca.act({
        role: 'health',
        cmd: 'check',
      }, (err, result) => {

        expect(err).to.not.exist()
        expect(result.name).to.equal(options.name)
        expect(result.version).to.equal(options.version)
        server.seneca.close()
        done()

      })

    })

  })

})
