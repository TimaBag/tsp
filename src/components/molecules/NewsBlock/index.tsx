import styled from 'styled-components';

import ReadMoreLink from 'components/atoms/ReadMoreLink';
import Typography from 'components/atoms/NedoTypography';
import Flex from 'components/atoms/Flex';

import { news, mainNews } from './news';
import { INews } from './types';

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
  width: 25%;
`;

export default function NewsBlock(): JSX.Element {
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
        {news.map((n: INews, i: number) => (
          <NewsItem key={`${n.date}_${i}`}>
            <Typography variant="heading-3" color="#000">
              {n.date}
            </Typography>
            <Typography variant="text" color="#000">
              {n.content}
            </Typography>
          </NewsItem>
        ))}
      </Flex>
    </Div>
  );
}
