const keystone = require('keystone');
const Types = keystone.Field.Types;

let Page = new keystone.List('Page');

Page.add({
  name: {
    label: 'Заголовок',
    type: Types.Text,
    required: true,
    initial: true
  },
  code: {
    label: 'Символьный код',
    type: Types.Text,
    required: true,
    initial: true
  },
  content: {
    label: 'Полный текст',
    type: Types.Html,
    wysiwyg: false,
    height: 400
  },
  seo: {
    title: {
      label: 'SEO Title',
      type: Types.Text
    },
    keywords: {
      label: 'Ключевые слова',
      type: Types.Text
    },
    description: {
      label: 'Описание для сниппета',
      type: Types.Textarea
    }
  }
});

Page.defaultColumns = 'name, code';
Page.register();
