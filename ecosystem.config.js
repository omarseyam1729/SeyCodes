// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: "SeyCodes-App",
        script: "app.js",
        instances: "max",
        exec_mode: "cluster",
        env: {
          NODE_ENV: "development",
          PORT: 3000
        },
        env_production: {
          NODE_ENV: "production",
          PORT: 80
        }
      }
    ]
  };
  