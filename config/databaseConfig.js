/**
 * Created by ayoung on 16/08/16.
 */

var config = {
    development: {
        //url to be used in link generation
        url: 'localhost:3000',
        
        //mongodb connection settings
        database: {
            host:   '127.0.0.1',
            port:   '5432',
            db:     'BetManager'
        },
        //server details
        server: {
            host: '127.0.0.1',
            port: '3000'
        }
    },
    Test: {
        //url to be used in link generation
        url: 'localhost:4000',
        database: {
            host: '127.0.0.1',
            port: '5432',
            db:     'BetManagerTest'
        },
        //server details
        server: {
            host:   '127.0.0.1',
            port:   '3000'
        }
    }
};

module.exports = config;