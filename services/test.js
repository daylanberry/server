const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys')
const body = `<div style="text-align: center;">
          <h3>I'd like your input</h3>
          <p>Please answer the following question</p>
          <p>test</p>
          <div>
            <a href="http://localhost:3000">Yes</a>
          </div>
            <a href="http://localhost:3000">no</a>
        </div>`
sgMail.setApiKey(keys.sendGridKey);
const msg = {
  to: ['daylanberry@gmail.com'],
  from: 'sender@example.org',
  subject: 'Hello from node',
  text: 'Hello plain world!',
  html: body,
};
sgMail.send(msg)