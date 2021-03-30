import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid #cac3c3;
  border-right: 2px solid #cac3c3;
  border-bottom: 2px solid #cac3c3;
  border-left: 4px solid blue;
  background: transparent;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export default Loader;
