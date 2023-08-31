const port = process.env.PORT || 3000;
const modules = require('./src');

console.log('modules:', modules);

Object.keys(modules).forEach((moduleName) => console.log('Loading:', moduleName));

const { app } = modules;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
