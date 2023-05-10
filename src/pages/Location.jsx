import React, { useState } from 'react';
import Map from '../components/Map';
import styled from 'styled-components';
import Paragraph from '../components/Paragraph';
import { colors } from '../styles/colors';
import { FiMapPin } from 'react-icons/fi';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import { categories } from '../utils/categories';
import Submit from '../components/Submit';

const Location = () => {
    const [ location, setLocation ] = useState(null);
    const navigate = useNavigate();
    const [dropdownValue, setDropdownValue] = useState("Ámbito");
    const [errorAPICall, setErrorAPICall] = useState(false);

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.append("category", dropdownValue);

        const { title, description, category, extraData } = Object.fromEntries(formData.entries());
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
                title, 
                description, 
                category, 
                extraData, 
                coordinates: {
                    latitude: location.latitude || '', 
                    longitude: location.longitude || ''
                }, 
                address: {
                    street: location.street || '', 
                    city: location.city || '', 
                    state: location.state || '', 
                    zip: location.zip || ''
                }
            })
        };
        try {
           await fetch(`https://api.ubervo.es/need`, settings);
            navigate('/success');
        } catch (e) {
            setErrorAPICall(true)
            return e;
        }
    }

    return (
        <StyledContainer>
             { errorAPICall && 
                <Paragraph size='s' color='red'>Something went wrong when sending data, try again!</Paragraph>
            }
            <Map
                setLocation={setLocation}
            />
            <Paragraph size="xs" color={colors.grey}>Cerca de...</Paragraph>
            <AddressBox>
                <StyledBox>
                    { location  && <Paragraph size="s" color={colors.darkgrey}>{location.street || ''} {location.zip || ''} {location.city || ''}</Paragraph>} 
                    { location && location.state  && <Paragraph size="s" color={colors.darkgrey}>{location.state}</Paragraph>} 
                </StyledBox>

                <FiMapPin />
            </AddressBox>
            <StyledForm onSubmit={handleSubmit}>
                <Input
                    name="title"
                    label="Nombre de tu propuesta"
                    maxLength="50"
                    minLength="5"
                    required
                    placeholder="Resume en una frase ..."
                />
                <Input
                    textarea
                    name="description"
                    label="Describe tu propuesta"
                    maxLength="400"
                    minLength="10"
                    required
                    placeholder="Explica en detalles tu propuesta ..."
                />
                <Input
                    textarea
                    name="extraData"
                    label="Especifidades del sitio"
                    maxLength="100"
                    placeholder="Si quieres darnos más detalles del lugar..."
                />
                 <Dropdown
                    dropdownValue={dropdownValue}
                    setDropdownValue={setDropdownValue}
                    entries={categories}
                />
                <Submit secondary>Enviar</Submit>
            </StyledForm>
        </StyledContainer>
    );
}

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledBox = styled.div`
   width: 300px;
`;

const AddressBox = styled.div`
    min-height: 70px; 
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center ;
`;

const StyledForm = styled.form`
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content:   space-between;
    align-items: center;
    max-width: 500px;
`;


export default Location;
