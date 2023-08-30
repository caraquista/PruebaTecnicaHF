const loggingMiddleware = (db) =>
   async (req, res, next) => {
        const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
        const headers = JSON.stringify(req.headers);
        const originalUrl = req.originalUrl;
        // Persist this info on DB
        const log = await db.logging.create({
            ip,
            header: headers,
            action: originalUrl
        });
        await log.save();
        next();
    };

module.exports = loggingMiddleware;
