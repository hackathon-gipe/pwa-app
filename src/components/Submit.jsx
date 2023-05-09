import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { device } from '../styles/breakpoints';

const Submit = ({ children, primary, secondary }) => {
    return (
        <StyledButton type="submit" $primary={primary} $secondary={secondary}>
            {children}
        </StyledButton>
    );
};

const StyledButton = styled.button`
    background-color: ${props => props.$primary ? colors.primary : colors.white};
    color: ${props => props.$secondary ? colors.primary : colors.white};
    font-size: 16px;
    text-decoration: none;
    font-weight: 600;
    padding: 10px;
    width: 200px;
    text-align: center;
    border: 2px solid ${colors.primary};
    border-radius: 30px;
    margin-bottom: 20px;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }

    @media ${device.md} {
        font-size: 18px;
        padding: 10px;
        width: 350px;
    }

    @media ${device.lg} {
        font-size: 16px;
        padding: 10px;
        width: 250px;
    }
`;

export default Submit;