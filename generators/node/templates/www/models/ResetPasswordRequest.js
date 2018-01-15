const keystone = require('keystone');
const Types = keystone.Field.Types;

let ResetPasswordRequest = new keystone.List('ResetPasswordRequest', {
  nocreate: true,
  noedit: true,
  track: true
});

ResetPasswordRequest.add({
  user: {
    label: 'Пользователь',
    type: Types.Relationship,
    ref: 'User',
    index: true,
    required: true,
    initial: true
  }
});

/** Integrations */
ResetPasswordRequest.schema.pre('save', require('../lib/wasNew'));

let sendNotificationToUser = function() {
  let prr = this;
  const Mail = keystone.list('Mail');

  if (!prr.wasNew) return false;

  /* eslint-disable */
  let email = new Mail.model({
    template: 'enquiry-default',
    to: prr.user,
    subject: 'UCS MarketPlace: Сбросить пароль',
    message: `<p>Информационное сообщение сайта UCS MarketPlace<br>
------------------------------------------</p>
<p>Здравствуйте,</p>
<p>Забыли пароль UCS MarketPlace? Нажмите ссылку, чтобы сменить пароль:</p>
<table class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;" border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" align="left">
        <table style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;" border="0" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;">
                <a style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;"
                  href="http://${process.env.SITE_DOMAIN}/resetPassword?key=${prr._id}"
                  target="_blank">Сбросить пароль</a>
                </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<p>Если вы не запрашивали сброс пароля, просто не реагируйте на это письмо, и все останется по-прежнему.</p>
<p>Письмо сгенерировано автоматически.</p>
`
  });
  /* eslint-enable */
  return email.save().catch((err) => {
    console.error('Error in sendNotificationToUser()', err);
  });
};
ResetPasswordRequest.schema.post('save', sendNotificationToUser)

ResetPasswordRequest.defaultColumns = '_id, user, createdAt';
ResetPasswordRequest.register();
