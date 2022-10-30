module.exports =  function(app, configs) {
    configs.forEach(config => {
        app.use(config.path, config.handler);
    })
}