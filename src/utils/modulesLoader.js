exports.loader = (functionToLoad, options = {}, app) => {
    // TODO : add loggingMiddleware
    // app.use(options.mountPath, loggingMiddleware, functionToLoad);
    app.use(options.mountPath, functionToLoad);
    return app;
};
