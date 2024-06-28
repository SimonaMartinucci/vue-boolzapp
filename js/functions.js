// PAROLA PALINDROMA

function palindroma(parola) {

    // Chiedere all’utente di inserire una parola
    parola = prompt("Inserisci una parola");

    // Capire se la parola inserita è palindroma
    // dividere la parola in una array di sue lettere
    let parolaDivisa = parola.split('');

    // invertire l'ordine delle lettere al contrario
    parolaDivisa = parolaDivisa.reverse();
    
    // trasformiamo le lettere invertite in una stringa
    const parolaInvertita = parolaDivisa.join('');

    // creo la condizione
    if(parola === parolaInvertita) {
        console.log("Questa parola è palindroma");
    }else {
        console.log("Questa parola NON è palindroma");
    }
}

// GENERATORE NUMERO RANDOM
function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

// SOMMARE 2 NUMERI
function sommaDueNumeri(num1, num2) {
    return num1 + num2;
}

// NUMERO PARI O DISPARI
function pariDispari(numero) {
    if(numero % 2 === 0) {
        return "pari";
    }else {
        return "dispari";
    }
}

// TROVARE VINCITORE
function winner(ris1, ris2) {
    if(ris1 === ris2) {
        return "Hai vinto";
    }else {
        return "Hai perso";
    }
}

// CREARE ELEMENTO HTML CON CLASSE
function createClassElement(tagToAdd, classToAdd) {
    
    // creo elemento
    const box = document.createElement(tagToAdd);

    // aggiungo classe
    box.classList.add(classToAdd);

    return box;
}

// GENERARE ARRAY CON NUMERI RANDOM MAI UGUALI
function arrayRandDiversi() {

    const arrayNumRand = [];

    // generare 16 numeri random
    while(arrayNumRand.length < 5) {
        
        let nRand = randomNumber(1, 100)

        if(!arrayNumRand.includes(nRand)) {
            arrayNumRand.push(nRand)
        }
    }
    
    return arrayNumRand;
}