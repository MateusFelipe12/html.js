const formulario = document.getElementById('formulario');
const TabelaProdutos = document.getElementById('prodCadastrados');

popularTabela();

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let data = $('#formulario').serializeArray();
    let produto = arrayToObject(data);


    //cria uma <tr></tr> e atribui a variavel
    //adiciona produtos na tabela
    adicionarProdutosNaTabela(produto);


    //SET - Setar, definir, salvar
    //GET - Pegar, buscar

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
    localStorage.setItem('produtos', JSON.stringify(produtos));
});

/*
o parametro "array" deve ser gerado a partir da funcao
.serealizeArray() do jquery para funcionar corretamente
*/
function arrayToObject(array) {
    let object = {};
    array.forEach(campo => {
        object[campo.name] = campo.value;
    });
    return object;   
};

function popularTabela () {
    let ProdLocalStorage = JSON.parse(localStorage.getItem('produtos')) || [];
    ProdLocalStorage.forEach(produtos => {
        produtos = JSON.parse(produtos);
        adicionarProdutosNaTabela(produtos);
    });
};

function adicionarProdutosNaTabela (produto) {
    let tr = document.createElement('tr');
    tr.innerHTML = `
        <tr>
            <td>${produto.Descricao}</td>
            <td>R$${produto.vVenda}</td>
            <td>${produto.Codigo}</td>
            <td>${produto.Estoque}</td>
        </tr>
    `;
    TabelaProdutos.appendChild(tr);
};