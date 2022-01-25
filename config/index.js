const devConfig = require('./dev')
const prodConfig = require('./prod')

module.exports = {
    sendgrid: () => {
        let config;
        if(process.env.NODE_ENV === 'production'){
            config = prodConfig;
        }else {
            config = devConfig;
        }
    },
    jsonToken: {
        token: 'TokenSecret'
    }
}
