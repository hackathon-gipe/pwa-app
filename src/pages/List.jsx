import React, { useEffect, useState } from 'react';

const List = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`https://api.ubervo.es/need?locality=city 1&souce=app`);
        const newData = await response.json();
        setData(newData);
      };
  
      fetchData();
    }, []);
  
    if (data) {
      return (
        <div>
         OK GET
      </div>
      )
      ;
    } else {
      return null;
    }
}

export default List;