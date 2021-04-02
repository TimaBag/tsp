import styled from 'styled-components';

const Select = styled.select`
  position: absolute;
  padding: 5px;
  left: 200px;
  top: 20px;
  border: 1px solid #dbdbdb;
`;

const SearchButton = styled.button`
  position: absolute;
  left: 45%;
  top: 20px;
  background: url('search-icon.svg');
  background-color: white;
  border: none;
  padding: 5px;
  width: 30px;
  height: 30px;
`;

export default function Map(): JSX.Element {
  return (
    <>
      <div id="map" style={{ width: '48%', height: '498px' }} />
      <Select style={{ left: '20px' }}>
        <option>KAZAKHSTAN</option>
        <option>RUSSIAN</option>
        <option>UZBEKISTAN</option>
      </Select>
      <Select style={{ left: '180px' }}>
        <option>ТОО "SINOOIL"</option>
        <option>ТОО "SINOOIL 2"</option>
        <option>ТОО "SINOOIL 3"</option>
        <option>ТОО "SINOOIL 4"</option>
      </Select>
      <SearchButton />
    </>
  );
}
