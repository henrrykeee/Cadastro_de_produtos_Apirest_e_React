const storageService = StorageService ('clientes');

storageService.save(123);

console.log(storageService.get());

function seed () {
    var dados = Array.from({length: 10}, function (map, index)
    {
        var id = index + 1;

        return {
            id: index ,
            nome: "Cliente" + id
        };
    });

    storageService.save(dados);

}

function getClientes(id) 
{
    
    var dados = storageService.get();
    console.table(dados);
}

function removeCliente(id)
{
    id = 1;
    storageService.remove(id);

}

function updateCliente(){

    var novo = {
        id = 3,
        nome = 'joao'
    };

    storageService.update(novo);
}  

