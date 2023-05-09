import React, { useState } from 'react';
import styled from 'styled-components';
import { FaAngleDown } from 'react-icons/fa'
import { colors } from '../styles/colors';

const Dropdown = ({ entries }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("Ámbito");

    const handleClick = (entry) => {
        setValue(entry)
        setOpen(false);
    };

    return (
        <StyledDropdown>
            <StyledButton onClick={() => setOpen(!open)}>{value} <FaAngleDown /></StyledButton>
            {open && (
                <StyledDropdownMenu>
                    {entries.map(entry => (
                        <StyledDropdownEntry
                            key={entry}
                            onClick={() => handleClick(entry)}
                        >
                            {entry}
                        </StyledDropdownEntry>
                    ))}
                </StyledDropdownMenu>
            )}
        </StyledDropdown>
    );
}

const StyledDropdown = styled.div`
    position: relative;
    margin-bottom: 50px;
`;

const StyledButton = styled.div`
    background-color: #fff;
    color: ${colors.darkgrey};
    font-size: 16px;
    font-weight: 400;
    width: 328px;
    padding: 10px;
    align-content: center;
    border: 1px solid ${colors.lightgrey};
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

const StyledDropdownMenu = styled.div`
    max-height: 230px;
    width: 328px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    padding: 10px;
    cursor: pointer;
    z-index: 1;
    position: absolute;
    top: 50px;
    left: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
    overflow-x: hidden;
`;


const StyledDropdownEntry = styled.div`
    font-size: 16px;
    width: 100%;
    padding: 10px;
    font-weight: 400;
    color: #979797;
    &:hover {
        color: #FF7D54;
    }

    &:active {
        color: #FF7D54;
    }
`;

export default Dropdown;
