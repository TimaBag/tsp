import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import moment from 'moment';

import ReadMoreLink from 'components/atoms/ReadMoreLink';
import Typography from 'components/atoms/NedoTypography';
import Flex from 'components/atoms/Flex';

import { mainNews } from './news';
import { News } from 'store/news/models';
import { NewsListSelector } from 'store/news/selectors';

const Div = styled.div`
  position: relative;
  background-color: white;
  grid-column-start: 1;
  grid-column-end: 3;
  padding: 20px;
`;

const Divider = styled.hr`
  border: 1px solid #dbdbdb;
`;

const NewsItem = styled.div`
  width: 24%;
  padding: 0 10px;
`;

export default function NewsBlock(): JSX.Element {
  const news = useRecoilValue(NewsListSelector);

  return (
    <Div>
      <Flex justify="flex-start" align="center">
        <img style={{ marginRight: '100px' }} src="news.png" alt="Thomson Reuters" />
        <NewsItem>
          <Typography variant="heading-3" color="#000">
            {mainNews.date}
          </Typography>
          <Typography variant="text" color="#000">
            {mainNews.content}
          </Typography>
        </NewsItem>
      </Flex>
      <ReadMoreLink href="/" title="Читать все новости" />
      <Divider />
      <Flex>
        {news.map((n: News) => (
          <NewsItem key={`${n.datetime}_${n.id}`}>
            <Typography variant="heading-3" color="#000">
              {moment(n.datetime).format('DD.MM.YYYY')}
            </Typography>
            <Typography variant="text" color="#000">
              {n.title}
            </Typography>
          </NewsItem>
        ))}
      </Flex>
    </Div>
  );
}
