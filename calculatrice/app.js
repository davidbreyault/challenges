const screenElt = document.querySelector('#screen');
// On stock la valeur d'affichage
let actualPrint = '';
// On stock la valeur de l'écran précedent
let previousValue = 0;
// On stock l'opération
let operation = null;

window.onload = ()=> {
    let keys = document.querySelectorAll('.key');

    document.addEventListener('keydown', keysManagement);

    for(let key of keys) {
        key.addEventListener('click', keysManagement);
    }
}

// Fonction qui réagitau clic sur les tocuhes
function keysManagement(event) {
    let touche;
    const validKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '+', '-', '*', '/', 'Enter', 'Escape'];
    // Si l'évènement est de type clavier 'keydown' 
    if (event.type === 'keydown') {
        // Comparaison de la touche appuyée avec les touches autorisées
        if (validKeys.includes(event.key)) {
            // On empêche le comportement par défaut des touches du claviers
            event.preventDefault();
            touche = event.key;
            
        }
    } else {
        touche = this.textContent;
    }
 
    // Si la touche cliquée est un chiffre ou le point
    if (parseFloat(touche) >= 0 || touche === '.') {
        actualPrint = (actualPrint === '') ? touche : actualPrint += touche;
        screenElt.textContent = actualPrint;
    } else {
        switch(touche) {
            case 'C':
            case 'Escape':
                previousValue = 0;
                actualPrint = '';
                operation = null;
                screenElt.textContent = 0;
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                // On calcul la valeur de l'étape précédente
                previousValue = (previousValue === 0) ? actualPrint : calculate(previousValue, actualPrint, operation);
                // On stocke l'opération
                operation = touche;
                // On met à jour l'écran
                screenElt.textContent = previousValue;
                // On réinitialise la variable d'affichage
                actualPrint = '';
                break;
            case '=':
            case 'Enter':
                // On calcul la valeur de l'étape précédente
                previousValue = (previousValue === 0) ? actualPrint : calculate(previousValue, actualPrint, operation);
                // On met à jour l'écran
                screenElt.textContent = previousValue;
                // On stocke le résultat dans la variable d'affichage
                actualPrint = previousValue;
                // On réinitialise précédent
                previousValue = 0;
                break;
        }
    }
}

/**
 * 
 * @param {number} nb1 
 * @param {number} nb2 
 * @param {string} operation 
 */
function calculate(nb1, nb2, operation) {
    nb1 = parseFloat(nb1);
    nb2 = parseFloat(nb2);
    if (operation === '+') {return nb1 + nb2}
    if (operation === '-') {return nb1 - nb2}
    if (operation === '*') {return nb1 * nb2}
    if (operation === '/') {return nb1 / nb2}
}