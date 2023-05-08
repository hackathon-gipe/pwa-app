// create an input component with a label passed as prop. the label has to be superposed over the outlined of the border input. if textarea props is passed to the component, the border of the input is #DBDBDB instead of #FF7D54 and it has a min-height of 70px. Also placeholder props is passed to the component.

import React from 'react';
import styled from 'styled-components';

const Input = ({ label, textarea, placeholder }) => {
    return (
        <StyledInput>
            <StyledLabel>{label}</StyledLabel>
            <StyledInputField textarea={textarea} placeholder={placeholder} />
        </StyledInput>
    );
}

const StyledInput = styled.div`
    position: relative;
`;

const StyledLabel = styled.label`
    position: absolute;
    top: -10px;
    left: 10px;
    background-color: #fff;
    padding: 0 5px;
    color: #FF7D54;
    font-size: 12px;
    font-weight: 600;
`;

const StyledInputField = styled.input`
    width: 328px;
    height: ${props => props.textarea ? '70px' : '50px'};
    border: 2px solid ${props => props.textarea ? '#DBDBDB' : '#FF7D54'};
    border-radius: 30px;
    padding: 0 20px;
    font-size: 16px;
    font-weight: 400;
    color: #5F5F5F;
    margin-top: 10px;
    &::placeholder {
        color: #5F5F5F;
    }
`;

export default Input;