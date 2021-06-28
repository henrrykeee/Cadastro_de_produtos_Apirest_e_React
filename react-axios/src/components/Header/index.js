import React from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = ({title}) => (
    <header>
        <h1 className="font-weight-bold"> {title?title: 'Escolha um título:'} </h1>
    </header>
);

export default Header;


