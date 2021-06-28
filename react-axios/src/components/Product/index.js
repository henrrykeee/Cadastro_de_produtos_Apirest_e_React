import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { Table,
         Button,
         Form,
         FormGroup,
         Label,
         Input,
         Alert
         } from 'reactstrap';
         


class FormProduct extends Component {
    

    state = {
        model: {
            id: 0,
            nome: '',
            quantidade: 0,
            valor: 0
        }
    };
    
    setValues = (e, field) => {
        const {model} = this.state;
        model[field] = e.target.value;
        this.setState({ model });
        
    }

    create = () => {        
        this.setState({ model: { id: 0, nome: '', quantidade: 0, valor: 0 }})
        this.props.productCreate(this.state.model);
    }
     componentDidUpdate() {
     PubSub.subscribe('edit-product', (topic,product) => {
         this.setState({model: product});         
     });
    }
    render () {
        
        return (
          <Form>
              <FormGroup>
                  <Label for="nome"><b>Nome:</b></Label>
                  <Input id="nome" type="text" value={this.state.model.nome} placeholder="Nome do Produto..."
                  onChange={e => this.setValues(e, 'nome')}/>
              </FormGroup>
              <FormGroup>
                  <div className="form-row row">
                  <div className="form-group col-md-6">
                    <br/> <Label for="quantidade"><b>Quantidade:</b></Label>
                          <Input id="quantidade"  type="text" value={this.state.model.quantidade} placeholder="Quantidade de Produtos"
                          onChange={e => this.setValues(e, 'quantidade')}/>
                      </div>
                      <div className="form-group col-md-6">
                    <br/>  <Label for="valor"><b>Valor:</b></Label>
                           <Input id="valor" type="text" value={this.state.model.valor} placeholder="R$"
                           onChange={e => this.setValues(e, 'valor')}/>
                      </div>
                  </div>
              </FormGroup>
              <br/><Button block onClick ={this.create}> Gravar </Button>
          </Form>

        );
    }
}

class ListProduct extends Component {

    delete = (id) => {
        this.props.deleteProduct(id);

    }

    onEdit = (product) => {
        PubSub.publish('edit-product', product);
    }


    render () {
        const {products} = this.props
        
        return (
            <Table className="table-bordered text-center">
                 <thead className="thead-dark">
                    <tr>
                        <th>Descrição</th>
                        <th>Qtde.</th>
                        <th>Valor</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product => (
                            <tr key={product.id}>
                                <td>{product.nome}</td>
                                <td>{product.quantidade}</td>
                                <td>{product.valor}</td>
                                <td>
                                    <Button color="info" size="sm" onClick={e=>this.onEdit(product)}>Editar</Button>  
                                    <Button color="danger" size="sm" onClick={e=>this.delete(product.id)}>Deletar</Button>                                 
                                    
                                </td>
                                
                            </tr>
                                                     

                        ))
                    }
                </tbody>
            </Table>
           
        );
    }
}

export default class ProductBox extends Component {

    Url = 'http://localhost:8080/api/produto'

    state = {
        products: [],
        message: {
            text: '',
            alert: ''
        }
    }

    componentDidMount() {
        fetch(this.Url)
        .then(response => response.json())
        .then(products => this.setState ({ products }))
        .catch(e => console.log(e));
    }

    save = (product) => {
        let data = {
            id: parseInt(product.id),
            nome: product.nome,
            quantidade: parseFloat(product.quantidade),
            valor: parseFloat(product.valor),

        };
        console.log(data);
        const requestInfo = {
            method: data.id !== 0? 'PUT':'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };
        
        if(data.id ===0) {
            fetch(this.Url, requestInfo)  
        .then(response => response.json()) 
        .then(newProduct => {
            let {products} = this.state;
            products.push(newProduct);
            this.setState({products, message: {text: ' Novo produto criado com sucesso!', alert: 'success'}});
        })
        .catch(e => console.log(e));

        } else {
            fetch(`${this.Url}/${data.id}`, requestInfo)  
            .then(response => response.json()) 
            .then(updatedProduct => {
                let {products} = this.state;
                let position = products.findIndex(product => product.id === data.id);
                product[position] = updatedProduct;
                this.setState({products, message: {text: 'Produto atualizado com sucesso!', alert: 'primary'}});
            })
            .catch(e => console.log(e));
        }
      
        
    }

     delete = (id) => {
         fetch(`${this.Url}/${id}`, {method: 'DELETE'})
         .then(response => response.text())
         .then(rows => {
             const products = this.state.products.filter(product => product.id !== id);
             this.setState({products, message: {text: 'Produto deletado com sucesso!', alert: 'danger'}});

         })
     }

    render () {
        return (
            <div>
                {
                   this.state.message.text !== ''? (
                        <Alert color={this.state.message.alert}className="text-center">{this.state.message.text}</Alert>
                    ) : ''
                }
            
            <div className="container">
                <div className="row">
                    <div className="col-md-6 my-3">
                        <h2 className="font-weight-bold text-center">Cadastro de Produtos</h2>
                        <FormProduct productCreate={this.save}/>
                    </div>
                    <div className="col-md-6 my-3">
                        <h2 className="font-weight-bold text-center">Lista de Produtos</h2>
                        <ListProduct products={this.state.products} deleteProduct={this.delete} />
                    </div>
                    </div>
                </div>
          </div>

        );
    }
}


