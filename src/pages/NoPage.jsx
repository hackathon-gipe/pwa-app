import React from 'react';
import fantom from '../assets/fantom.png';
import styled from 'styled-components';
import { device } from '../styles/breakpoints';
import { colors } from '../styles/colors';
import Paragraph from '../components/Paragraph';

const NoPage = () => {
    return (
        <StyledContainer>
               <StyledImage src={fantom} alt="fantom" />
               <Paragraph size='l' color={colors.primary}>...Oh no !...</Paragraph>
               <Paragraph color={colors.primary}>La página que has marcado no se encuentra disponible</Paragraph>
        </StyledContainer>
    );
}


const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100px 20px;

    @media ${device.md} {
        padding: 60px 40px 0px;
    }

    @media ${device.lg} {
        padding: 100px 40px 0px;
    }
`;


const StyledImage = styled.img`
    width: 50%;
    margin-bottom: 20px;

    @media ${device.md} {
      width: 40%;
    }

    @media ${device.lg} {
      width: 20%;
    }
`;


export default NoPage;