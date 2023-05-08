// Button component with style components, if property primary is passed has #FF7D54 background color and #fff color text if property secondary is passed has #fff background color and #FF7D54 color text. onClick property is required and is a function that will be called when the button is clicked.  The button text is passed as a children property.Also the button has text props to pass a string. the button text is 16px semi bold. the button is 328px width and 50px height.

import React from 'react';
import styled from 'styled-components';

const Button = ({ children, onClick, primary, secondary }) => {
    return (
        <StyledButton onClick={onClick} primary={primary} secondary={secondary}>
        {children}
        </StyledButton>
    );
};

const StyledButton = styled.button`
    background-color: ${props => props.primary ? '#FF7D54' : '#fff'};
    color: ${props => props.secondary ? '#FF7D54' : '#fff'};
    font-size: 16px;
    font-weight: 600;
    width: 328px;
    height: 50px;
    border: '2px solid #FF7D54';
    border-radius: 30px;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

export default Button;