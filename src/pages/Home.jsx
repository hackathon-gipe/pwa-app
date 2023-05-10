import React from 'react';
import home from '../assets/home.png';
import styled from 'styled-components';
import { device } from '../styles/breakpoints';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { colors } from '../styles/colors';


const Home = () => {
  return (
    <StyledContainer>
      <StyledImage src={home} className="logoS" alt="logo" />
      <StyledBox>
        <Paragraph size='l' color={colors.darkgrey}>
          Impulsa el cambio en tu ciudad
        </Paragraph>
        <Paragraph color={colors.grey}>
          Participa y aporta información para los próximos cambios en tu municipio
        </Paragraph>
      </StyledBox>
      <Button
        primary
        path={'/location'}>
        Localizador
      </Button>
      <Button
        secondary
        path={'/form-general'}>
        Buzón de sugerencias
      </Button>
      <Button
        secondary
        path={'/list'}>
        Lista de iniciativas
      </Button>
    </StyledContainer>
  );
}


const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;

    @media ${device.md} {
        padding: 60px 40px 0px;
    }
`;

const StyledImage = styled.img`
    width: 70%;
    margin-bottom: 20px;

    @media ${device.md} {
      width: 60%;
    }

    @media ${device.lg} {
      width: 30%;
    }
`;

const StyledBox = styled.div`
  margin-bottom: 60px;
  @media ${device.md} {
    margin-bottom: 50px;
    }
`;

export default Home;
