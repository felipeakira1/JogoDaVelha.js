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
            let linhaVitoria = document.getElementById('linhaVitoria');
            switch(i) {
                case 0:
                    linhaVitoria.style.top = `11.4vh`;
                    break;
                case 1:
                    linhaVitoria.style.top = `32.6vh`;
                    break;
                case 2:
                    linhaVitoria.style.top = `53.8vh`;
                    break;
            }
            linhaVitoria.style.width = `105%`
            return true; // Vitória na linha
        }
    }
    // Verificar colunas
    for(let j = 0; j < 3; j++) {
        if(matriz[0][j] === 1 && matriz[1][j] === 1 && matriz[2][j] === 1) {
            let colunaVitoria = document.getElementById('colunaVitoria');
            switch(j) {
                case 0:
                    colunaVitoria.style.left = `11.4vh`;
                    break;
                case 1:
                    colunaVitoria.style.left = `32.6vh`;
                    break;
                case 2:
                    colunaVitoria.style.left = `53.8vh`;
                    break;
            }
            colunaVitoria.style.height = `105%`;
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

function mostrarMenuVitoria(vezDeJogar) {
    const fundo_menus = document.getElementById('fundo_menus');
    const menu_vitoria = document.getElementById('menu_vitoria');
    const titulo_vitoria = document.getElementById('titulo_vitoria')
    fundo_menus.style.display = 'block';
    menu_vitoria.style.display = 'block;'
    if(vezDeJogar == 1) {
        titulo_vitoria.textContent = `${valor_nome_jogador1} GANHOU`
    } else {
        titulo_vitoria.textContent = `${valor_nome_jogador2} GANHOU`
    }
}

function fecharMenuVitoria() {
    
    const fundo_menus = document.getElementById('fundo_menus');
    const menu_vitoria = document.getElementById('menu_vitoria');
    fundo_menus.style.display = 'none';
    menu_vitoria.style.display = 'none;'
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

function iniciarJogo() {
    fecharMenuVitoria();
    renderizarTabuleiro();
    vezJogador1();
}
iniciarJogo();