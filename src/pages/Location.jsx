import React, { useState } from 'react';
import Map from '../components/Map';
import styled from 'styled-components';
import Paragraph from '../components/Paragraph';
import { colors } from '../styles/colors';
import { FiMapPin } from 'react-icons/fi';
import Button from '../components/Button';

const Location = () => {
    const [location, setLocation] = useState(null);
    return (
        <StyledContainer>

            <Map
                setLocation={setLocation}
            />
            <Paragraph size="xs" color={colors.grey}>Cerca de...</Paragraph>
            <AddressBox>
                <StyledBox>
                    <Paragraph size="m" color={colors.grey}>{location && `${location.lat}/`}</Paragraph>
                    <Paragraph size="m" color={colors.grey}>{location && location.lng}</Paragraph>
                </StyledBox>

                <FiMapPin />
            </AddressBox>

            <Button secondary path="/form">Siguiente</Button>

        </StyledContainer>
    );
}

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledBox = styled.div`
    min-height: 100px;
`;

const AddressBox = styled.div`
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;


export default Location;
