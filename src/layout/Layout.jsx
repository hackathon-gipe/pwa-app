import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { colors } from '../styles/colors';
import styled from 'styled-components';
import brand from '../assets/brand.svg';
import { HiDotsVertical } from 'react-icons/hi';
import { device } from '../styles/breakpoints';

const StyledHeader = styled.header`
    padding: 12px 18px;
    background-color: ${colors.white};
    border-bottom: 1px solid ${colors.lightgrey};
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    @media ${device.md} {
        padding: 20px 40px;
        max-height: 100px;
    }
    @media ${device.lg} {
        padding: 20px 40px;
        max-height: 100px;
        justify-content: center;
    }
`;

const StyledLogo = styled.img`
    height: 30px;
    @media ${device.md} {
        height: 35px;
    }
`;

const StyledIcon = styled(HiDotsVertical)`
    font-size: 12px;
    @media ${device.md} {
        font-size: 18px;
    }
    @media ${device.lg} {
        display: none;
    }
`;

const Layout = () => {
    return (
        <>
            <StyledHeader>
                <Link to="/">
                    <StyledLogo src={brand} alt="logo" />
                </Link>
                <StyledIcon color={colors.darkgrey} />
            </StyledHeader>
            <Outlet />
        </>
    );
}

export default Layout;