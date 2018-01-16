import {CounterConfig} from 'ng-yandex-metrika';

export interface AppConfig {
  TITLE_SEP?: string;
  TITLE_POSTFIX?: string;
  YA_METRIKA_CONF?: CounterConfig;
}

export let CONFIG: AppConfig = {
  TITLE_POSTFIX: '<%=appname%>',
  TITLE_SEP: ' - '
};

if ((<any>window).hasOwnProperty('CONFIG'))
  CONFIG = JSON.parse((<any>window).CONFIG);

export let getTitle = (title: string) => title + CONFIG.TITLE_SEP + CONFIG.TITLE_POSTFIX;

export const parseQuery = (url: string): any => {
  let qstr = url.split('?')[1] || '';
  let query = {};
  let a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
  for (let i = 0; i < a.length; i++) {
    let b = a[i].split('=');
    if (!b[0]) continue;
    query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
  }
  return query;
};

export const setQueryParams = (url: string, params: object): string => {
  params = Object.assign({}, parseQuery(url), params);

  return Object.keys(params)
    .map((k) => {return {key: k, value: params[k]}})
    .reduce((query, item) => {
      if (!item.value) return query;
      return query + (query.includes('?') ? '&' : '?') + `${item.key}=${JSON.stringify(item.value)}`;
    }, url);
};
