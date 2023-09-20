let elemento_nome_jogador1 = document.getElementById('nome_jogador1');
let elemento_nome_jogador2 = document.getElementById('nome_jogador2');
const parametrosURL = new URLSearchParams(window.location.search);
const valor_nome_jogador1 = parametrosURL.get('nome1');
const valor_nome_jogador2 = parametrosURL.get('nome2');

const tabuleiro = document.getElementById('tabuleiro');
const matriz = [];
let vezDeJogar = 0; // 1 para jogador 1 e 2 para jogador 2

function verificaVitoria(jogador) {
    // Verificar linhas
    for(let i = 0; i < 3; i++) {
        if (matriz[i][0] === jogador && matriz[i][1] === jogador && matriz[i][2] === jogador) {
            return true; // Vitória na linha
        }
    }
    // Verificar colunas
    for(let j = 0; j < 3; j++) {
        if(matriz[0][j] === 1 && matriz[1][j] === 1 && matriz[2][j] === 1) {
            return true;
        }
    }
    // Verificar diagonais
    if (matriz[0][0] === jogador && matriz[1][1] === jogador && matriz[2][2] === jogador) {
        return true; // Vitória na diagonal \
    }
    if (matriz[0][2] === jogador && matriz[1][1] === jogador && matriz[2][0] === jogador) {
        return true; // Vitória na diagonal /
    }
    return false; 
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
                        alert("GANHOU")
                    } else {
                        alternarVez();
                    }
                }
                if(vezDeJogar === 2 && cell.innerHTML === '') {
                    cell.innerHTML = 'O';
                    matriz[i][j] = vezDeJogar;
                    cell.classList.add('vezDeJogar2');
                    if(verificaVitoria(vezDeJogar)) {
                        alert("GANHOU")
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

function iniciarJogo() {
    renderizarTabuleiro();
    vezJogador1();
}
iniciarJogo();