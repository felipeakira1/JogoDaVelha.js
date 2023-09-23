let elemento_nome_jogador1 = document.getElementById('nome_jogador1');
let elemento_nome_jogador2 = document.getElementById('nome_jogador2');
const parametrosURL = new URLSearchParams(window.location.search);
const valor_nome_jogador1 = parametrosURL.get('nome1');
const valor_nome_jogador2 = parametrosURL.get('nome2');

const tabuleiro = document.getElementById('tabuleiro');

// Variáveis globais
const matriz = []; // Matriz que representa o tabuleiro 
var vezDeJogar = 0; // Variável que salva qual jogador deve realizar a jogada
var contagemVerificacoes = 0; // Variável que conta quantas verificações foram feitas para determinar velha

// Mostrar menus de velha e vitória
function mostrarMenuVitoria(vezDeJogar) {
    const fundo_menus = document.getElementById('fundo_menus');
    const menu_vitoria = document.getElementById('menu_vitoria');
    const titulo_vitoria = document.getElementById('titulo_vitoria')
    fundo_menus.style.display = 'block';
    menu_vitoria.style.display = 'flex';
    if(vezDeJogar == 1) {
        titulo_vitoria.textContent = `${valor_nome_jogador1} GANHOU`
    } else {
        titulo_vitoria.textContent = `${valor_nome_jogador2} GANHOU`
    }
}

function mostrarMenuVelha() {
    const fundo_menus = document.getElementById('fundo_menus');
    const menu_velha = document.getElementById('menu_velha');
    fundo_menus.style.display = 'block';
    menu_velha.style.display = 'flex';
}

function fecharMenuVelha() {
    const fundo_menus = document.getElementById('fundo_menus');
    const menu_velha = document.getElementById('menu_velha');
    fundo_menus.style.display = 'none';
    menu_velha.style.display = 'none';
}

function fecharMenuVitoria() {
    const fundo_menus = document.getElementById('fundo_menus');
    const menu_vitoria = document.getElementById('menu_vitoria');
    fundo_menus.style.display = 'none';
    menu_vitoria.style.display = 'none';
}

function verificaLinhas(jogador) {
    for(let i = 0; i < 3; i++) {
        if (matriz[i][0] === jogador && matriz[i][1] === jogador && matriz[i][2] === jogador) {
            const linhaVitoria = document.createElement('div');
            tabuleiro.appendChild(linhaVitoria);
            linhaVitoria.classList.add('linhaVitoria')
            switch(i) {
                case 0:
                    linhaVitoria.style.top = `17%`;
                    break;
                case 1:
                    linhaVitoria.style.top = `48.5%`;
                    break;
                case 2:
                    linhaVitoria.style.top = `80%`;
                    break;
            }
            setTimeout(() => {
                linhaVitoria.style.width = `105%`
            }, 100);
            return true;
        }
    }
    return false;
}

function verificaColunas(jogador) {
    for(let j = 0; j < 3; j++) {
        if(matriz[0][j] === jogador && matriz[1][j] === jogador && matriz[2][j] === jogador) {
            const colunaVitoria = document.createElement('div');
            tabuleiro.appendChild(colunaVitoria);
            colunaVitoria.classList.add('colunaVitoria');
            switch(j) {
                case 0:
                    colunaVitoria.style.left = `17%`;
                    break;
                case 1:
                    colunaVitoria.style.left = `48.5%`;
                    break;
                case 2:
                    colunaVitoria.style.left = `80%`;
                    break;
            }
            setTimeout(function() {
                colunaVitoria.style.height = `105%`;
            }, 100);
            return true;
        }
    }
    return false;
}

function verificaDiagonais(jogador) {
    if (matriz[0][0] === jogador && matriz[1][1] === jogador && matriz[2][2] === jogador) {
        const diagonalPrincipal = document.createElement('div');
        tabuleiro.appendChild(diagonalPrincipal);
        diagonalPrincipal.classList.add('diagonalPrincipal');
        setTimeout(() => {
            diagonalPrincipal.style.width = `135%`;
        }, 100);
        return true;
    }
    if (matriz[0][2] === jogador && matriz[1][1] === jogador && matriz[2][0] === jogador) {
        const diagonalSecundaria = document.createElement('div');
        tabuleiro.appendChild(diagonalSecundaria);
        diagonalSecundaria.classList.add('diagonalSecundaria');
        setTimeout(() => {
            diagonalSecundaria.style.width = `135%`;
        }, 100);
        return true;
    }
    return false;
}

function verificaVitoria(jogador) {
    if(verificaLinhas(jogador)) {
        return true;
    } else if(verificaColunas(jogador)) {
        return true;
    } else if(verificaDiagonais(jogador)) {
        return true;
    } else {
        contagemVerificacoes++;
        if(contagemVerificacoes == 9) {
            mostrarMenuVelha(jogador);
        }
        return false;
    }
}

/* Renderizar tabuleiro */
function renderizarTabuleiro() {
    for (let i = 0; i < 3; i++) {
        matriz[i] = []
        for(let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            matriz[i][j] = cell;
            tabuleiro.appendChild(cell);
            cell.addEventListener('click', function() {

                if(vezDeJogar === 1 && cell.innerHTML === '') {
                    cell.innerHTML = 'X';
                    matriz[i][j] = vezDeJogar;
                    cell.classList.add('vezDeJogar1');
                    if(verificaVitoria(vezDeJogar)) {
                        setTimeout(() => {
                            mostrarMenuVitoria(vezDeJogar);
                        }, 1500);
                    } else {
                        alternarVez();
                    }
                }
                if(vezDeJogar === 2 && cell.innerHTML === '') {
                    cell.innerHTML = 'O';
                    matriz[i][j] = vezDeJogar;
                    cell.classList.add('vezDeJogar2');
                    if(verificaVitoria(vezDeJogar)) {
                        setTimeout(() => {
                            mostrarMenuVitoria(vezDeJogar);
                        }, 1500);
                    } else {
                        alternarVez();
                    }
                }
            })
        }
    }
    
}

function vezJogador1() {
    elemento_nome_jogador2.classList.remove('vezDeJogar2');
    elemento_nome_jogador2.textContent = ``
    elemento_nome_jogador1.classList.add('vezDeJogar1');
    elemento_nome_jogador1.textContent = `SUA VEZ: ${valor_nome_jogador1}`
    vezDeJogar = 1;
}

function vezJogador2() {
    elemento_nome_jogador1.classList.remove('vezDeJogar1');
    elemento_nome_jogador1.textContent = ``
    elemento_nome_jogador2.classList.add('vezDeJogar2');
    elemento_nome_jogador2.textContent = `SUA VEZ: ${valor_nome_jogador2}`
    vezDeJogar = 2;
}

function alternarVez() {
    if(vezDeJogar === 1) {
        vezJogador2();
    } else {
        vezJogador1();
    }
}

function limparTabuleiro() {
    while(tabuleiro.firstChild) {
        tabuleiro.removeChild(tabuleiro.firstChild);
    }
}

function iniciarJogo() {
    contagemVerificacoes = 0;
    fecharMenuVitoria();
    fecharMenuVelha();
    limparTabuleiro();
    renderizarTabuleiro();
    vezJogador1();
}
iniciarJogo();