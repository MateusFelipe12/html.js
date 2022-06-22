const formulario = document.getElementById('formulario');
const TabelaProdutos = document.getElementById('prodCadastrados');

popularTabela();
adicionarEventoBtnExcluir();

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let data = $('#formulario').serializeArray();
    let produto = arrayToObject(data);

    //SET - Setar, definir, salvar
    //GET - Pegar, buscar

    //recuperar os registros já cadastrados no banco
    //como no banco ta cadastrado como string, precisamos do JSON.parse()
    //para forçar a ser um objeto/array
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    let codDuplicado = produtos
        .map(produtos => JSON.parse(produtos).Codigo)
            .includes(produto.Codigo);
    
    if(codDuplicado){
        alert('Esse produto ja consta na base de dados');
        return;
    }
    //adiciona o produto que esta sendo cadastrado ao array de produtos ja
    //cadastrados no banco de dados
    //- precisa ser com JSON.stringify() pois o banco apenas aceita string
    produtos.push(JSON.stringify(produto));
    
    //atualizar os produtos no banco de dados
    //- precisa ser com JSON.stringify() pois o banco apenas aceita string
    localStorage.setItem('produtos', JSON.stringify(produtos));

    document.location.reload(true);
});

/*o parametro "array" deve ser gerado a partir da funcao
.serealizeArray() do jquery para funcionar corretamente*/
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
            <td>
                <button type="button" class="btn btn-outline-danger delete" data-codigo="${produto.Codigo}">
                Excluir
                </button>
            </td>
        </tr>
    `;
    TabelaProdutos.appendChild(tr);
};

function adicionarEventoBtnExcluir() {
    $('.delete').toArray().forEach(botaoDel => { 
        botaoDel.removeEventListener('click', (evento) => excluirRegistro(evento))
    });
    $('.delete').toArray().forEach(botaoDel => { 
        botaoDel.addEventListener('click', (evento) => excluirRegistro(evento))
    });
}

function excluirRegistro (evento) {
    let produtoADeletar = evento.target.dataset.codigo;
    if(confirm(`Voce Realmente deseja excluir ${produtoADeletar} do banco de dados?`)) {

        let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

            //percorremos o array de produtos cadastrados e transformamos
            //cada produto em um objeto (JSON.parse()) por que a gente precisa
            //acessar as propriedades do produto. sem o JSON.parse() o produto seria
            //uma string.
            produtos = produtos.map(produto => JSON.parse(produto));

            //findIndex
            // é um laço que percorre todo o array ATÉ QUE a condição seja TRUE
            let indice = produtos.findIndex(produto => produto.Codigo == produtoADeletar)

            produtos.splice(indice, 1);
            
            produtos = produtos.map( produto => JSON.stringify(produto));
            localStorage.setItem('produtos', JSON.stringify(produtos));
            document.location.reload(true);
    }
}