import ReactSlider from 'react-slick';
import styled from 'styled-components';

import Typography from 'components/atoms/NedoTypography';
import Flex from 'components/atoms/Flex';

import { facts, cards } from './facts';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Div = styled(Flex)`
  padding: 16px;
  background: white;
  height: auto;
`;

const Ul = styled.ul`
  margin: 0;
  padding-inline-start: 16px;
  list-style-image: url('dot.svg');
`;

const Card = styled.div`
  width: 360px;
  height: 160px;
  background: #fb9678;
`;

const Slider = styled(ReactSlider)`
  width: 360px;
  height: 160px;
`;

export default function RealFacts(): JSX.Element {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Div>
      <div>
        <Typography variant="text" color="#000">
          РЕАЛЬНЫЕ ФАКТЫ НА СЕГОДНЯШНЮЮ ДАТУ:
        </Typography>
        <Ul>
          {facts.map((f: string, ind: number) => (
            <li style={{ marginTop: '10px' }} key={`${f}_${ind}`}>
              <Typography variant="text" color="#000">
                {f}
              </Typography>
            </li>
          ))}
        </Ul>
      </div>
      <Slider {...settings}>
        {cards.map((c: string, i: number) => (
          <Card key={`${c}_${i}`}>
            <Typography variant="text" color="white">
              {c}
            </Typography>
          </Card>
        ))}
      </Slider>
    </Div>
  );
}
