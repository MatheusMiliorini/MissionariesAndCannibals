let states = [],
    hashes = [],
    win = false,
    movimentos = [], // Vai ser preenchida na vitória
    i = 0;

states.push({
    M: 3,    // Missionários
    C: 3,    // Canibais
    B: 1,    // Barco
    A: null, // Anterior
});

hashes["331"] = states[0]; // Estado inicial

while (i < states.length) {
    if (!movimentoValido(states[i])) { // Número de canibais maior que o número de missionários
        i++;
        continue;
    }

    if (checkWin(states[i])) { // Todos do lado correto
        // console.log("Vitória: " + JSON.stringify(states[i]));
        win = true;
        voltaMovimentos(states[i]);
        break;
    }

    getMovimentos(states[i]).map(mov => { states.push(mov) }); // Busca os possíveis movimentos e adiciona na lista de states

    i++;
}
if (!win) {
    console.error("Nenhum resultado!");
} else {
    movimentos.map(mov => {
        console.log(JSON.stringify(mov));
    });
}

function voltaMovimentos(state) {
    movimentos.push(state);
    let anterior = hashes[state.A];
    if (anterior != null) {
        voltaMovimentos(anterior);
    } else {
        movimentos.reverse();
    }
}

function getMovimentos(state) {
    let movimentos = [];
    if (state.B == 1) { // Barco está na esquerda
        if (state.M > 0) { // Existe ao menos 1 missionário no lado errado
            movimentos.push({ M: state.M - 1, C: state.C, B: state.B - 1, A: hashState(state) });
        }
        if (state.M > 1) { // Existem ao menos 2 missionários no lado errado
            movimentos.push({ M: state.M - 2, C: state.C, B: state.B - 1, A: hashState(state) });
        }
        if (state.C > 0) { // Existe ao menos 1 canibal no lado errado
            movimentos.push({ M: state.M, C: state.C - 1, B: state.B - 1, A: hashState(state) });
        }
        if (state.C > 1) { // Existem ao menos 2 canibais no lado errado
            movimentos.push({ M: state.M, C: state.C - 2, B: state.B - 1, A: hashState(state) });
        }
        if (state.M > 0 && state.C > 0) { // Existem missionários e canibais no lado errado
            movimentos.push({ M: state.M - 1, C: state.C - 1, B: state.B - 1, A: hashState(state) });
        }
    } else { // Barco está na direita
        if (state.M < 3) { // Existe ao menos 1 missionário no lado certo
            movimentos.push({ M: state.M + 1, C: state.C, B: state.B + 1, A: hashState(state) });
        }
        if (state.M < 2) { // Existem ao menos 2 missionários no lado certo
            movimentos.push({ M: state.M + 2, C: state.C, B: state.B + 1, A: hashState(state) });
        }
        if (state.C < 3) { // Existe ao menos 1 canibal no lado certo
            movimentos.push({ M: state.M, C: state.C + 1, B: state.B + 1, A: hashState(state) });
        }
        if (state.C < 2) { // Existem ao menos 2 canibais no lado certo
            movimentos.push({ M: state.M, C: state.C + 2, B: state.B + 1, A: hashState(state) });
        }
        if (state.M < 3 && state.C < 3) { // Existem missionários e canibais no lado certo
            movimentos.push({ M: state.M + 1, C: state.C + 1, B: state.B + 1, A: hashState(state) });
        }
    }

    novosMovimentos = [];
    movimentos.map(mov => {
        let hash = hashState(mov);
        if (!hashes[hash]) {
            hashes[hash] = mov;
            novosMovimentos.push(mov);
        }
    });

    return novosMovimentos;
}

function checkWin(state) {
    if (state.M == 0 && state.C == 0 && state.B == 0) {
        return true;
    } else {
        return false;
    }
}

function movimentoValido(state) {
    if (state.B == 1) { // Barco do lado errado (esquerda) 
        if (state.C > state.M) {
            return false;
        } else {
            return true;
        }
    } else {
        if (state.C < state.M) {
            return false;
        } else {
            return true;
        }
    }
    /* if (state.C > state.M) {
        return false;
    } else {
        return true;
    } */
}

function hashState(state) {
    return ("" + state.M + state.C + state.B);
}