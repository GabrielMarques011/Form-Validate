const form = document.getElementById('form');
const campos = document.querySelectorAll('.required');
const span = document.querySelectorAll('.span-required'); //pegando todos os elementos com a mesma class
const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/; //validação de e-mail, peguie do stack

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    if (validacaoNome() && validacaoSobrenome() && validacaoEmail() && validacaoNumero() && validacaoSenha() && confirmarSenha()) {
        const dados = {
            nome: campos[0].value,
            sobrenome: campos[1].value,
            email: campos[2].value,
            telefone: campos[3].value,
            senha: campos[4].value
        };
        console.log(JSON.stringify(dados)); // Aqui você pode enviar os dados para o servidor ou usá-los conforme necessário

        // Exibir o Toast Notification
        showToast('Usuário criado com sucesso!');
        
        // Limpar os campos após o envio
        /* campos.forEach(campo => campo.value = '');
        span.forEach(spanElemento => spanElemento.style.display = 'none'); */

    }

});

function adicionandoErro(index) {
    campos[index].style.border = '2px solid #e63636';
    span[index].style.display = 'block';
    return false; // Indica que há erro
}

function removendoErro(index) {
    campos[index].style.border = '';
    span[index].style.display = 'none';
    return true; // Indica que não há erro
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}

function validacaoNome() {
    if (campos[0].value.length < 3) {
        return adicionandoErro(0);
    } else {
        return removendoErro(0);
    }
}

function validacaoSobrenome() {
    if (campos[1].value.length < 3) {
        return adicionandoErro(1);
    } else {
        return removendoErro(1);
    }
}

function validacaoEmail() {
    if (!emailRegex.test(campos[2].value)) {
        return adicionandoErro(2);
    } else {
        return removendoErro(2);
    }
}

function validacaoNumero(){
    if(campos[3].value.length < 14){
        return adicionandoErro(3);
    } else {
        return removendoErro(3);
    }
}

function validacaoSenha() {
    if (campos[4].value.length < 8) {
        return adicionandoErro(4);
    } else {
        removendoErro(4);
        return true; // Validação da senha está correta
    }
}

function confirmarSenha() {
    if (campos[5].value === campos[4].value && campos[5].value.length >= 8) {
        return removendoErro(5);
    } else {
        return adicionandoErro(5);
    }
}