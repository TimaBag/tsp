import { UnparsedNews, News } from './models';

export const parseNews = (n: UnparsedNews): News => ({
  id: n.id,
  text: n.text,
  datetime: n.datetime,
  title: n.title,
  trId: n.trId,
  source: n.source,
});
