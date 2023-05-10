import React from 'react';
import styled from 'styled-components';

const Paragraph = ({ children, size, color }) => {
    return (
        <StyledParagraph $size={size} $color={color}>
            {children}
        </StyledParagraph>
    );
}

const StyledParagraph = styled.p`
    text-align: center;
    color: ${props => props.$color};
    font-weight: 400;
    margin: 5px;
     ${props => {
        if (props.$size === "xs") {
            return `font-size: 12px;`
        }
        if (props.$size === "s") {
            return `font-size: 12px;`
        }
        if (props.$size === "m") {
            return `font-size: 16px;`
        }
        if (props.$size === "l") {
            return `font-size: 18px;
            font-weight: 600;
            `
        }
        if (props.$size === "xl") {
            return `
            font-size: 22px;
            font-weight: 600;`
        } else {
            return `font-size: 14px;`
        }
    }}
`;

export default Paragraph;