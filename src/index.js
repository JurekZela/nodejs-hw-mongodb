import { initMongoConnection } from "./db/initMongoConnection.js";
import { setupServer } from "./server.js";

const boostrap = async() => {
    await initMongoConnection();
    setupServer();
};

boostrap();


// app.use((reg, res, next) => {
//     console.log(`Time: ${new Date().toLocaleString()}`);
//     next();
// });

// app.get('/', (reg, res) => {

//     res.json({
//         message: 'Hello World!',
//     });
// });

// app.use('*', (reg, res, next) => {
//     res.status(404).json({
//         message: 'Route not found',
//     });
// });

// app.use((err, reg, res, next) => {
//     res.status(500).json({
//         message: 'something with wrong!',
//         error: err.message,
//     });
// });
