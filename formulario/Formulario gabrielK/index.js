const formulario = document.getElementById('formulario');
const produtosCadastrados = document.getElementById('produtosCadastrados');

popularTabelaAoCarregarPagina();

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let data = $('#formulario').serializeArray();
    let produto = arrayToObject(data);

    adicionarProdutoNaTabela(produto);



    //recuperar os registros já cadastrados no banco
    //como no banco ta cadastrado como string, precisamos do JSON.parse()
    //para forçar a ser um objeto/array
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    
    //adiciona o produto que esta sendo cadastrado ao array de produtos ja
    //cadastrados no banco de dados
    //- precisa ser com JSON.stringify() pois o banco apenas aceita string
    produtos.push(JSON.stringify(produto));

    //atualizar os produtos no banco de dados
    //- precisa ser com JSON.stringify() pois o banco apenas aceita string
    localStorage.setItem('produtos', JSON.stringify(produtos))
});

// o parametro "array" deve ser gerado a partir da funcao
// .serializeArray() do jQuery para funcionar corretamente
function arrayToObject(array) {
    let object = {};
    array.forEach(campo => {
        object[campo.name] = campo.value;
    });
    return object;
}

function popularTabelaAoCarregarPagina() {
    let produtosDoLocalStorage = JSON.parse(localStorage.getItem('produtos')) || [];
    produtosDoLocalStorage.forEach(produto => {
        produto = JSON.parse(produto);
        adicionarProdutoNaTabela(produto);
    });
};

function adicionarProdutoNaTabela(produto) {
    //cria um novo elemento <tr><tr> e atribui pra variavel tr
    let tr = document.createElement('tr');
    tr.innerHTML = `
        <tr>
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.valorVenda}</td>
            <td>${produto.precoCusto}</td>
        </tr>
    `;
    produtosCadastrados.appendChild(tr);
}

