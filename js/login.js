var botao = document.getElementById('btn-jogar');

botao.addEventListener('click', (event) => {
    event.preventDefault();
    var mensagensErro = document.getElementsByClassName('mensagemErro');
    for(var i = 0; i < mensagensErro.length; i++) {
        mensagensErro[i].textContent = '';
    }

    var inputs = document.querySelectorAll('input');
    let verificaErro = 0;
    for(var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var mensagemErro = input.nextElementSibling;

        if(input.value.trim() === '') {
            mensagemErro.textContent = 'Este campo não pode estar vazio.'
            verificaErro++;
        }
    }
    if(verificaErro == 0) {
        const nomeJogador1 = document.getElementById('nome_jogador1').value;
        const nomeJogador2 = document.getElementById('nome_jogador2').value;
    
        const url = `jogo.html?nome1=${encodeURIComponent(nomeJogador1)}&nome2=${encodeURIComponent(nomeJogador2)}`;
        window.location.href = url;
    }
})