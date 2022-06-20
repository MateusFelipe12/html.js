const meuTitulo = document.querySelector('#titulo');
const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    let aluno = prompt("informe o nome de um aluno:");
    if(!aluno){
        return alert('é preciso informar o nome do aluno para calcular a media');
    }
    let somaNotas = 0;
    let somaPesos = 0;
    let nota = 0;
    let peso = 0;
    let media = 0;
    while(confirm('deseja lancar uma not?')){
        nota = Number(prompt('informe a nota:'));
        peso = Number(prompt('informe o peso:'));
        somaNotas += nota * peso;
        somaPesos += peso;
    }

    if(somaPesos > 1){
        media = somaNotas / somaPesos;
        alert(`a media do aluno ${aluno} foi de ${media.toFixed(2)}`);
    } else {
        alert ('nenhuma nota informada');
    }
})
