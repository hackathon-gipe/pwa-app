import React, { useState } from 'react';
import Input from '../components/Input';
import { Navigate } from "react-router-dom";
import styled from 'styled-components';
import { device } from '../styles/breakpoints';
import Submit from '../components/Submit';
import Dropdown from '../components/Dropdown';
import { categories } from '../utils/categories';

const Form = () => {

    const [redirect, setRedirect] = useState(false);
    const [dropdownValue, setDropdownValue] = useState("Ámbito");

    const handleSubmit = (e) => {
        
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        formData.append("category", dropdownValue);
     
        // You can pass formData as a fetch body directly:
        // fetch('/some-api', { method: form.method, body: formData });

        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson)
        setRedirect(true);
    }

    return (
        <StyledContainer>
            <StyledForm onSubmit={handleSubmit}>
                <Input
                    name="title"
                    label="Nombre"
                    maxLength="50"
                    minLength="8"
                    required
                    placeholder="Resume en una frase ..."
                />
                <Input
                    textarea
                    name="description"
                    label="Describe tu propuesta"
                    maxLength="500"
                    minLength="20"
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
            {redirect ? (<Navigate push to="/success" />) : null}
        </StyledContainer>
    );
}


const StyledContainer = styled.div`
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    @media ${device.md} {
        padding: 60px 40px 0px;
    }
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content:   space-between;
    align-items: center;
    max-width: 500px;
`;

export default Form;