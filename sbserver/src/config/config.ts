
import path from 'path';
const rootPath = path.normalize(__dirname + '/views');



export const config = {
    development: {
        db: process.env.MONGODB  || "mongodb://localhost:27017/db",
        rootPath: rootPath,
        SSL: false,
        port: process.env.PORT || 3000,
        privateKey: "ImmaPrivateKey",
        Auth:'Forms',
        OpenAIApiKey: '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'

    },
    production: {
        rootPath: rootPath,
        SSL: process.env.PORT || false,
        db: process.env.MONGODB ,
        port: process.env.PORT || 80,
        privateKey: process.env.PRIVATEKEY || 'Forms',
        Auth: process.env.AUTH || 'Forms',
        OpenAIApiKey: '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'
    }
};
