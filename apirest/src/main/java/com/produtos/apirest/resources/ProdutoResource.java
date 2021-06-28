package com.produtos.apirest.resources;

import com.produtos.apirest.model.Produto;
import com.produtos.apirest.repository.ProdutoRepository;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.hibernate.annotations.GeneratorType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api")
public class ProdutoResource {

    @Autowired
    ProdutoRepository produtoRepository;


    @GetMapping("/produto")
    public List<Produto> listaProdutos() {
        return produtoRepository.findAll();
    }

    @GetMapping("/produto/{id}")
    public Produto listaProdutoUnico(@PathVariable(value = "id") long id) {
        return produtoRepository.findById(id);
    }

    @PostMapping("/produto")
    public Produto salvaProduto(@RequestBody Produto produto) {
        return produtoRepository.save(produto);

    }

    @DeleteMapping("/produto/{id}")
    public Long deletaProduto(@PathVariable Long id) {
        produtoRepository.deleteById(id);
        return  id;
    }

    @PutMapping("/produto/{id}")
    public ResponseEntity<Produto> updateProduto(@PathVariable(value = "id") Long produtoId,
                                                  @Validated @RequestBody Produto employeeDetails) throws ResourceNotFoundException {
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado pelo id :: " + produtoId));

        produto.setNome(employeeDetails.getNome());
        produto.setQuantidade(employeeDetails.getQuantidade());
        produto.setValor(employeeDetails.getValor());
        final Produto updatedProduto = produtoRepository.save(produto);
        return ResponseEntity.ok(updatedProduto);
    }


}
