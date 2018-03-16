const original_fetch = require('node-fetch');
const main = require('../back/main');
const models = require('../back/models');

const port = process.env.PORT || 8888;
const base = 'http://localhost:' + port;
const api = path => base + (path.startsWith('/') ? '' : '/') + path;

class FetchError extends Error {
    constructor(response, msg = 'We did not get a 2xx response code') {
        super(msg);
        this.response = response;
    }
}

const fetch = (uri, options = {}) => {
    const headers = { 'Content-Type': 'application/json', ... options.headers };
    options = { ... options, headers };

    if ( options.hasOwnProperty('body') ) {
        options.body = JSON.stringify(options.body);
    }

    let result = original_fetch(api(uri), options);
    if ( options.raw ) { return result; }

    return result.then(res => {
        if ( res.ok ) { return res.json(); }
        else { throw new FetchError(res); }
    });
};

const post = (uri, body, options = {}) => {
    return fetch(uri, { ... options, method: 'post', body });
};

describe('users endpoint', () => {

    let server = null;
    beforeAll(() => main(port).then(s => { server = s; }));
    afterAll(() => server && server.close());

    beforeEach(() => models.User.truncate());

    it('should give an ok response when listing all users', () => {
        return fetch('/users', { raw: true }).then(res => {
            expect(res.ok).toBe(true);
        });
    });

    it('should give an empty array when listing all users', () => {
        return fetch('/users').then(json => {
            expect(json).toEqual([]);
        });
    });

    it('should give the created user when posting data', () => {
        let data = { name: 'Jhon Doe', email: 'jhon.doe@example.com' };
        return post('/users', data).then(json => expect(json).toMatchObject(data));
    });

    it('should find users that have been posted', () => {
        let data = { name: 'Jane Doe', email: 'jane.doe@example.com' };
        return post('/users', data)
            .then(() => fetch('/users'))
            .then(json => expect(json).toMatchObject([data]));
    });

});
