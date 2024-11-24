import { initMongoConnection } from "./db/initMongoConnection.js";
import { setupServer } from "./server.js";
import { createDirIdNotExist } from "./utils/createDirIfNotExist.js";
import { TEMPLATES_DIR, UPLOAD_DIR } from "./constants/index.js";

const boostrap = async () => {
    await initMongoConnection();
    await createDirIdNotExist(TEMPLATES_DIR);
    await createDirIdNotExist(UPLOAD_DIR);
    setupServer();
};

boostrap();
