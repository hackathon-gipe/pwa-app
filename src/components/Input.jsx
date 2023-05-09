import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';

const Input = ({ label, textarea, length, name, placeholder }) => {
    return (
        <StyledInput>
            <StyledLabel>{label}</StyledLabel>
            <StyledInputField
                name={name}
                maxLength={length}
                $textarea={textarea}
                placeholder={placeholder} />
        </StyledInput>
    );
}

const StyledInput = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

const StyledLabel = styled.label`
    padding: 0 5px;
    color: ${colors.darkgrey};
    font-size: 14px;
    font-weight: 600;
`;

const StyledInputField = styled.textarea`
    padding: 10px;
    font-family: "Open Sans";
    height: ${props => props.$textarea ? '100px' : '20px'};
    border: 1px solid ${colors.lightgrey};
    border-radius: 10px;
    font-size: 12px;
    font-weight: 400;
    color: ${colors.darkgrey};
    margin-top: 10px;
    &::placeholder {
    color: ${colors.grey};
}
`;

export default Input;