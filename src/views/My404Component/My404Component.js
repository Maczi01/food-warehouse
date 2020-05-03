import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";

const ListWrapper = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      width: 60vw;
      font-size: 14px;
`;

const My404Component = () => (
    <ListWrapper>
        <h1>Nie ma takiej strony!!!!!!</h1>
        <img
            src="https://shortyawards.imgix.net/entries/10th/a21d83f0-03a3-4432-b2de-a6eed73986ed.png?auto=format&fit=clip&w=540&s=1231f2f3505ffcd7611ff1343c6560b7"/>
    </ListWrapper>
);

export default My404Component;

