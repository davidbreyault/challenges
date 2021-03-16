// On stocke un code de destruction dans une variable
const code = 'code1234';
// Transformation de la chaine de caractères du code en tableau
const codeArr = code.split('');
// Création d'un tableau vide qui permettra d'effectuer une comparaison par la suite
let userTry = [];

// Création de la fonction de destruction
function destroy() {
    let bodyElt = document.querySelector('body');
    while (bodyElt.firstChild) {
        document.querySelector('body').firstChild.remove();
    }
    let msgElt = document.createElement('h1');
    msgElt.textContent = 'Page détruite';
    bodyElt.appendChild(msgElt);
    bodyElt.style.backgroundColor = '#490000';
}

// Lorsque l'utilisateur appuie sur une touche
document.addEventListener('keyup', (e) => {
    // Si la touche appuyée correspond à la première lettre du code (Maj ou non)
    if (e.key == codeArr[userTry.length] || e.key == codeArr[userTry.length].toUpperCase()) {
        // On ajoute la lettre de la touche au tableau userTry
        userTry.push(e.key);
        // Si les 2 tableaux sont de longueur identiques, le code est complet
        if (userTry.length == codeArr.length) {
            // La fonction de destruction peut se lancer
            destroy();
        } 
    // Si la touche appuyé n'est celle attendue, mais qu'elle correspond avec le premier caractère du code
    } else if (e.key == codeArr[0] || e.key == codeArr[0].toUpperCase()) {
        // On vide le tableau userTry on conservant uniquement ce premier caractère
        userTry = userTry.slice(0, 1);
    // Si non pour tout les autres cas
    } else {
        // On vide le tableau userTry
        userTry = [];
    }
})