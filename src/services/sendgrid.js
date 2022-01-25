const sgMail = require('@sendgrid/mail');
const config = require('../../config/index');

sgMail.setApiKey('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')

module.exports = sgMail;