import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {

    const defaultOptions = await getConnectionOptions('default');

    if (process.env.NODE_ENV === 'production') {
        const newDefaultOptions = Object.assign(defaultOptions, {
            host: process.env.DB_HOSTNAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            database: process.env.DB_DATABASE,
            connectTimeout: 15000,
        });
        return createConnection(
            newDefaultOptions
        );
    }

    return createConnection(
        defaultOptions
    );
};