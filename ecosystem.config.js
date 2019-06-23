module.exports = {
  apps : [{
    name: "blocktrivia",
    script: "server/server.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}