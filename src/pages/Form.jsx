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

    const handleSubmit = (e) => {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        console.log(form);

        // You can pass formData as a fetch body directly:
        // fetch('/some-api', { method: form.method, body: formData });

        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        setRedirect(true);
    }

    return (
        <StyledContainer>
            <StyledForm onSubmit={handleSubmit}>
                <Input
                    name="title"
                    label="Nombre"
                    length="50"
                    placeholder="Resume en una frase ..."
                />
                <Input
                    textarea
                    name="description"
                    label="Describe tu propuesta"
                    length="500"
                    placeholder="Explica en detalles tu propuesta ..."
                />
                <Input
                    textarea
                    name="extraData"
                    label="Especifidades del sitio"
                    length="100"
                    placeholder="Si quieres darnos más detalles del lugar..."
                />
                <Dropdown
                    name="whaetver"
                    entries={categories}
                />
                <Submit secondary>Enviar</Submit>
            </StyledForm>
            {redirect ? (<Navigate push to="/success" />) : null}
        </StyledContainer>
    );
}


const StyledContainer = styled.div`
      padding: 20px;
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
`;

export default Form;