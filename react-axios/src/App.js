import React, {Component} from 'react';
import ProductBox from './components/Product/index';
import Header from './components/Header'

class App extends Component {
  render(){
    return (
      <div className ="container">
        <ProductBox/>

      </div>
    );
  }
}

export default App;

