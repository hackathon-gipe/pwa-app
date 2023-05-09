import React, { useState } from 'react';
import Input from '../components/Input';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { device } from '../styles/breakpoints';
import Submit from '../components/Submit';
import Dropdown from '../components/Dropdown';
import Paragraph from '../components/Paragraph';
import { categories } from '../utils/categories';


const FormGeneral = () => {

    const navigate = useNavigate();
    const [dropdownValue, setDropdownValue] = useState("Ámbito");
    const [errorAPICall, setErrorAPICall] = useState(false);

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.append("category", dropdownValue);

        const { title, description, category, extraData, street, city, zip, state } = Object.fromEntries(formData.entries());
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
                coordinates: {latitude: 0, longitude: 0}, 
                address: {street, city, state, zip}
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
                    name="street"
                    label="Calle"
                    maxLength="20"
                    placeholder="Indica el número de calle"
                />
                <Input
                    name="city"
                    label="Ciudad"
                    maxLength="20"
                    minLength="2"
                    required
                    placeholder="Indica la ciudad"
                />
                   <Input
                    name="zip"
                    label="Código postal"
                    maxLength="20"
                    placeholder="Indica el código postal"
                />
                    <Input
                    name="state"
                    label="Localidad"
                    maxLength="20"
                    placeholder="Indica la localidad"
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
    height: 100%;

    @media ${device.md} {
        padding: 60px 40px 0px;
    }
`;

const StyledForm = styled.form`
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content:   space-between;
    align-items: center;
    max-width: 500px;
`;

export default FormGeneral;