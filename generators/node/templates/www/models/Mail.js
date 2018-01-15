const keystone = require('keystone');
const Types = keystone.Field.Types;
const User = keystone.list('User');
const ObjectId = require('mongoose').Types.ObjectId;
const logger = keystone.get('logs').mail;

let Mail = new keystone.List('Mail', {
  nocreate: true,
  noedit: true,
  track: true
});

Mail.add({
  template: {
    label: 'Шаблон',
    type: Types.Select,
    options: [
      {value: 'enquiry-default', label: 'Simple'}
    ],
    index: true,
    required: true,
    initial: true
  },
  to: {
    label: 'Получатели',
    type: Types.Relationship,
    ref: 'User',
    many: true,
    index: true,
    required: true,
    initial: true
  },
  subject: {
    label: 'Тема письма',
    type: Types.Text,
    required: true,
    initial: true
  },
  message: {
    label: 'Сообщение',
    type: Types.Html,
    wysiwyg: true,
    required: true,
    initial: true
  }
});

Mail.schema.pre('save', require('../lib/wasNew'));

Mail.schema.post('save', function() {
  if (this.wasNew) this.sendNotificationEmail();
});

Mail.schema.methods.sendNotificationEmail = function() {
  let enquiry = this;
  let recipients = enquiry.to.map((id) => {
    return id instanceof ObjectId ? String(id) : String(id._id);
  });
  return User.model.find().where({_id: {$in: recipients}}).exec()
    .then((users) => {
      return new Promise((resolve, reject) => {
        let email = new keystone.Email({
          transport: 'nodemailer',
          templateName: enquiry.template,
          nodemailerConfig: {
            host: process.env.NODEMAILER_SMTP_HOST,
            port: process.env.NODEMAILER_SMTP_PORT,
            secure: false,
            tls: {
              rejectUnauthorized: false
            }
          }
        });
        email.send({
          to: users,
          from: process.env.NODEMAILER_SENDER_EMAIL,
          subject: enquiry.subject,
          enquiry: enquiry
        }, (err, info) => {
          if (err) return reject(err);
          resolve(info);
        });
      });
    })
    .catch((err) => {
      logger.error(err, 'Error in Mail.sendNotificationEmail()');
    });
};

Mail.defaultSort = '-createdAt';
Mail.defaultColumns = 'subject, to, createdAt';
Mail.register();
