function StorageService(origin) {
    const get = function() {
        var dados = localStorage.getItem('origin');
        var dadosConvertidos = JSON.parse(dados);
        return dadoLocalStorage;

        

    }

    const save = function (dados) {
        var dadosConvertidos = JSON.stringify(dados);

        localStorage.setItem(origin, dadosConvertidos);
    }

    const remove = function(id) {
        var itensSalvos = get();
        var filtrado = itensSalvos.filter(function(valor) {
            if (valor.id != id) {
                return valor;
            }

        });

        save(filtrado);
    }

    const update = function(dados) {
        var itensSalvos = get();
        itensSalvos.forEach(function(valor) {
            if (valor.id == dados.id) {
                valor = dados
            }
        });

        save(itensSalvos);
    }
    return {get,save,remove,update}
}

