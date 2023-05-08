// create a dropdown component wich is a button showing "Ambito". When click, it opens a menu that show entries passed by props in an array. The menu has a max height of 230px and a scroll if the entries are more than 5. The menu has a border radius of 10px. The dropdown menu has a shadow of 0px 4px 4px rgba(0, 0, 0, 0.25). The dropdown menu has a background color of #fff. The dropdown menu has a font size of 16px. The dropdown menu has a font weight of 400. The dropdown menu has a color of #979797. The dropdown menu has a padding of 10px.The dropdown menu has a cursor of pointer. The dropdown menu has a z-index of 1. The dropdown menu has a position of absolute. The dropdown menu has a top of 50px. The dropdown menu has a left of 0px. The dropdown menu has a right of 0px. The dropdown menu has a bottom of 0px. The dropdown menu has a display of flex. The dropdown menu has a flex-direction of column. The dropdown menu has a justify-content of center. The dropdown menu has a align-items of center. The dropdown menu has a overflow-y of scroll. The dropdown menu has a overflow-x of hidden. When overing an option of the dropdown it becomes #FF7D54. When clicking an option of the dropdown it becomes #FF7D54.

import React, { useState } from 'react';
import styled from 'styled-components';
import { FaAngleDown } from 'react-icons/fa'

const Dropdown = ({ entries }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(false);
    };

    return (
        <StyledDropdown>
            <StyledButton onClick={() => setOpen(!open)}>Ámbito <FaAngleDown/></StyledButton>
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
`;

const StyledButton = styled.button`
    background-color: #fff;
    color: #5F5F5F;
    font-size: 16px;
    font-weight: 400;
    width: 328px;
    height: 50px;
    border: 2px solid #FF7D54;
    border-radius: 30px;
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
    height: 100%;
    font-size: 16px;
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
