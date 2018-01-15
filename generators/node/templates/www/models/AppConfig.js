const keystone = require('keystone');
const Types = keystone.Field.Types;

let AppConfig = new keystone.List('AppConfig', {
  nocreate: true,
  nodelete: true
});

AppConfig.add(
  'Заголовок страницы', {
    TITLE_POSTFIX: {
      label: 'Постфикс заголовка',
      type: Types.Text
    },
    TITLE_SEP: {
      label: 'Разделитель заголовка',
      type: Types.Text
    }
  },
  'Яндекс Метрика', {
    YA_METRIKA_CONF: {
      label: 'Конфиг (JSON)',
      type: Types.Textarea
    }
  }
);

AppConfig.schema.pre('save', function(next) {
  if (!this.YA_METRIKA_CONF) return next();

  try {
    let test = JSON.parse(this.YA_METRIKA_CONF);
    next();
  } catch (e) {
    next(new Error('Невалидный JSON конфиг для Яндекс Метрики'));
  }
});

AppConfig.schema.methods.normalize = function() {
  let copy = JSON.parse(JSON.stringify(this));
  copy.YA_METRIKA_CONF = JSON.parse(copy.YA_METRIKA_CONF);
  delete copy._id;
  delete copy.__v;
  return copy;
};

AppConfig.defaultSort = '-createdAt';
AppConfig.defaultColumns = 'subject, to, createdAt';
AppConfig.register();
