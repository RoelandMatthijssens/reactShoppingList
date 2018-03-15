const ALL = '*';
const PROD = 'production';
const DEV = 'development';
const TEST = 'testing';

const env = process.env.ENV || DEV;

const defaults = {};

defaults[ALL] = {
    port: 80,
    env: env,
    db: {
        options: {
            dialect: 'sqlite',
            storage: ':memory:'
        }
    }
};

defaults[PROD] = {
    db: {
        options: {
            storage: 'db/database.sqlite'
        }
    }
};

defaults[DEV] = {
    port: 8080
};

defaults[TEST] = {
    db: {
        options: {
            logging: false
        }
    }
};

const fromEnvironment = {
    port: process.env.PORT,
    db: {
        url: process.env.DATABASE_URL,
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD
    }
};

const deepAssign = (target, ... sources) => {
    sources.forEach (source => {
        Object.keys (source).forEach (key => {
            if ( source[key] === undefined ) {
                return;
            }

            if ( ! target[key] ) {
                target[key] = source[key];
                return;
            }

            if ( typeof target[key] !== typeof source[key] ) {
                let msg = 'Type mismatch when merging key: `' + key + '`';
                throw new Error(msg);
            }

            if ( typeof target[key] === 'object' ) {
                target[key] = deepAssign ({}, target[key], source[key]);
            } else if ( typeof source[key] === 'object' ) {
                target[key] = deepAssign ({}, source[key]);
            } else {
                target[key] = source[key];
            }
        });
    });
    return target;
};

module.exports = deepAssign ({},
    defaults[ALL],
    defaults[env] || {},
    fromEnvironment
);
