import React from 'react';
import { device } from '../styles/breakpoints';
import ellipse from '../assets/ellipse.svg';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import Paragraph from '../components/Paragraph';
import { TbConfetti } from 'react-icons/tb'
import Button from '../components/Button';

const Success = () => {
    return (
        <StyledContainer>
            <StyledBox>
                <StyledLogo src={ellipse} alt="logo" />
                <Paragraph size="xl" color={colors.white}>Enviado!</Paragraph>
            </StyledBox>
            <StyledMessage>
                <Paragraph size="l" color={colors.darkgrey}>Te agradecemos por aportar tu grano de arena y ayudar al crecimiento de tu ciudad</Paragraph>
                <StyledIcon color={colors.primary} size="40" />
                <Paragraph size="m" color={colors.grey}>Todas las sugerencias enviadas, se recogen y analizan a la hora de crear nuevos proyectos en los municipios interesados.</Paragraph>
            </StyledMessage>

            <Button primary path='/'>Volver al inicio</Button>
        </StyledContainer>
    );
}

const StyledLogo = styled.img`
    size: 160px;
    margin-bottom: 20px;
`;

const StyledIcon = styled(TbConfetti)`
    margin: 20px;
`;
const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    
`;

const StyledBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 350px;
    margin-bottom: 10px;
    background-color: ${colors.primary};

    @media ${device.md} {
        height: 450px;
    }

    @media ${device.lg} {
        height: 300px;
    }
`;

const StyledMessage = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
`


export default Success;