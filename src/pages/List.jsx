import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import Paragraph from '../components/Paragraph';
import { device } from '../styles/breakpoints';

const List = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`https://api.ubervo.es/need?souce=app`);
        const newData = await response.json();
        setData(newData);
      };
  
      fetchData();
    }, []);
  
    if (data) {
      return (
        <StyledContainer>
         {data.map((item, i) => 
           <StyledCard key={i}>
            <StyledOneLine>
              <Paragraph size='xs' color={colors.primary}>Nombre:</Paragraph>
              <Paragraph size='s' color={colors.darkgrey}>{item.title || ''}</Paragraph>
            </StyledOneLine>
            <StyledOneLine>
              <Paragraph size='xs' color={colors.primary}>Categoría:</Paragraph>
              <Paragraph size='s' color={colors.darkgrey}>{item.category || ''}</Paragraph>
            </StyledOneLine>
            <StyledOneLine>
              <Paragraph size='xs' color={colors.primary}>Ciudad:</Paragraph>
              <Paragraph size='s' color={colors.darkgrey}>{item.address.city || ''}</Paragraph>
            </StyledOneLine>
            <StyledOneLine>
              <Paragraph size='xs' color={colors.primary}>Indice de relevancia:</Paragraph>
              <Paragraph size='s' color={colors.darkgrey}>{item.relevanceScore || ''}</Paragraph>
            </StyledOneLine>
           
              <Paragraph size='xs' color={colors.primary}>Descripción:</Paragraph>
              <Paragraph size='s'color={colors.darkgrey}>{item.description || ''}</Paragraph>
            
           </StyledCard>
         )}
        </StyledContainer>
      )
    } else {
      return null;
    }
}
 const StyledContainer = styled.div`
    padding: 20px;
    background-color: #eef1f8;
  `;

const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: ${colors.white};
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 20px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);


    @media ${device.md} {
      width: 60%;
    }
`;

const StyledOneLine = styled.div`
    display: flex;
    flex-direction: row;
`;

export default List;