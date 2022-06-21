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
}