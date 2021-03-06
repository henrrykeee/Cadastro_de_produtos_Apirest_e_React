import React, { Component } from 'react';

import Header from './components/Header';

import ProductBox from './components/Product';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header title="Cadastro de produtos em Banco" />
        <br />
        <ProductBox />
      </div>
    );
  }
}

export default App;
