// DOM Objects
const throwButton = document.querySelector('.throw__btn');
const animationDiv = document.querySelector('.throw__animation');
const dicesContainer = document.querySelector('.dices');
const dicesDiv = document.querySelectorAll('.dice');
const modalDiv = document.querySelector('.modal');
const guideDiv = document.querySelector('.guide');
const cluePar = document.querySelector('.guide__clue');
const replayButton = document.querySelector('.replay-btn');
// Variables
let randomNumber = null;
let compt = 0;
let launch = 0;
// Création de tableaux pour effectuer des calculs de statistiques par la suite
let statArray = [0, 0, 0, 0, 0, 0];
let triesArray = [0, 0, 0, 0, 0, 0];

// FONCTIONS
function createDiceFace() {
    let random = Math.floor(Math.random() * 6);
    // Création d'éléments HTML pour recréer la face du dé
    let temporaryDiceFace = document.createElement('div');
    temporaryDiceFace.classList.add('dice');
    animationDiv.appendChild(temporaryDiceFace);
    // Création des 9 div pour gérer l'affichage de la face avec les classes
    for (let i = 0; i < 9; i++) {
        let point = document.createElement('div');
        temporaryDiceFace.appendChild(point);
    }
    // Tableau des classes a manipuler
    const classNameDices = [];
    // Remplissage du tableau avec les 2ème classe des éléments '.dice'
    for (let dice of dicesDiv) {
        classNameDices.push(dice.classList[1]);
    }
    // Ajout d'une classe de façon aléatoire
    temporaryDiceFace.classList.add(classNameDices[random]);
}

function animationDice() {
    // Effacement du boutton pour laisser place à l'animation
    throwButton.classList.add('hide');
    function switchDice() {
        // Si animationDiv a un enfant
        if (animationDiv.firstChild) {
            animationDiv.firstChild.remove();
        }
        // Lancement de la fonction
        createDiceFace();
        // Arrêt de l'intervalle au bout de 1500ms
        setTimeout(() => {
            clearInterval(intervalId);
        }, 1500);
    }
    // Appel de la fonction switchDice toutes les 10ms
    let intervalId = setInterval(switchDice, 10);
    // A la fin de l'animation, suppression de temporyDiceFace et affichage du modalDiv
    setTimeout(() => {
        animationDiv.firstChild.remove();
        modalDiv.classList.add('open');
    }, 1510);
}

function throwTheDice() {
    animationDice();
    // On génère la face du dé à deviner (chiffre aléatoire compris entre 1 et 6 inclus)
    randomNumber = Math.floor(Math.random() * 6 + 1);
    // On instaure la variable qui va compter le nombre d'essais du joueur
    compt = 0;
}

// Affichage de la face du dé une fois le résultat trouvé
function printResult(className) {
    let resultDiceFace = document.createElement('div');
    resultDiceFace.classList.add('dice');
    guideDiv.appendChild(resultDiceFace);
    // Création des 9 div pour gérer l'affichage de la face avec les classes
    for (let i = 0; i < 9; i++) {
        let point = document.createElement('div');
        resultDiceFace.appendChild(point);
    }
    resultDiceFace.classList.add(className);
}

// Création du boutton 'rejouer'
function createReplayButton() {
    let replayButton = document.createElement('button');
    replayButton.textContent = 'Rejouer';
    replayButton.classList.add('replay-btn')
    guideDiv.appendChild(replayButton);
    // Réinitialisation de l'application lors du clique sur 'Rejouer'
    replayButton.addEventListener('click', resetApp);
}

function analyze(e) {
    // Si l'élément cliqué contient la classe 'dice'
    if (e.target.classList.contains('dice')) {
        // Si l'attribut de l'élément cliqué est égal à la valeur du chiffre à deviner
        if (e.target.getAttribute('id') == randomNumber) {
            // Incrémentation de la variable du nombre d'essai.
            compt++;
            // On masque tout les autres dés et on affiche la bonne réponse
            dicesContainer.style.display = 'none';
            // On n'autorise plus les évenements de type 'click' sur le modal (pour éviter de supprimer l'élément crée par 'printResult')
            modalDiv.removeEventListener('click', analyze);
            cluePar.classList.replace('guide__clue', 'guide__success');
            guideDiv.childNodes[1].textContent = '';
            printResult(e.target.classList[1]);
            finalMessage();
            createReplayButton();
            calculStats();
        } else {
            // Si non si c'est moins
            if (e.target.getAttribute('id') < randomNumber) {
                compt++;
                cluePar.textContent = 'C\'est plus !';
                e.target.classList.add('delete');
            // Si non si c'est plus
            } else if (e.target.getAttribute('id') > randomNumber) {
                compt++;
                cluePar.textContent = 'C\'est moins !';
                e.target.classList.add('delete');
            }
        }
    }
}

function finalMessage() {
    switch(compt) {
        case 1:
            cluePar.textContent = 'Stylé ! Tu as trouvé du premier coup !';
            break;
        case 2:
            const caseTwoMsg = ['Bien joué !', 'Joli coup !', 'C\'est bien ça !']
            cluePar.textContent = caseTwoMsg[Math.floor(Math.random() * caseTwoMsg.length)] + ' Tu as trouvé en '+compt+' essais !';
            break;
        case 3:
            const caseThreeMsg = ['Tu peux mieux faire !', 'C\'est pas trop mal', 'Dis toi que ça aurait pu être pire !'];
            cluePar.textContent = caseThreeMsg[Math.floor(Math.random() * caseThreeMsg.length)] + ' Tu as trouvé en '+compt+' essais !';
            break;
        case 4:
            cluePar.textContent = 'Enfin tu as trouvé ! Ce n\'est pas trop tôt ! Tu as trouvé en '+compt+' fois !';
            break;
        case 5:
            cluePar.textContent = 'C\'est laborieux ! J\'ai rarement vu ça ! Il t\'auras fallu '+compt+' essais !';
            break;
        case 6:
            const caseSixMsg = ['Non mais regarde toi ! C\'est vraiment pas ton truc on dirait !', 'Même mon chat aurait fait mieux !', 'Heureusement que personne ne t\'as vu !'];
            cluePar.textContent = caseSixMsg[Math.floor(Math.random() * caseSixMsg.length)]
            break;
        default:
            cluePar.textContent = 'Tu as trouvé en '+compt+' essais !';
    }
}

// Réinitialisation de l'application
function resetApp() {
    cluePar.textContent = '';
    guideDiv.firstElementChild.textContent = 'Les jeux sont faits, tu dis combien ?';
    guideDiv.childNodes[3].classList.replace('guide__success', 'guide__clue');
    guideDiv.lastElementChild.remove();
    guideDiv.querySelector('.dice').remove();
    dicesContainer.style.display = 'grid';
    dicesDiv.forEach((dice) => {
        dice.classList.remove('delete');
    })
    throwButton.classList.remove('hide');
    if (animationDiv.firstChild) {
        animationDiv.firstChild.remove();
    }
    modalDiv.classList.remove('open');
    modalDiv.addEventListener('click', analyze);
}

function calculStats() {
    const statisticsTable = document.querySelector('.statistics__table');
    // Incrémentation de la variable du nombre de parties jouées
    launch++;
    // Augmentation de l'effectif correspondant au chiffre qu'il fallait trouver
    statArray[randomNumber - 1]++;
    statisticsTable.querySelector(`.row:nth-of-type(${randomNumber}) .dice-frequency`).textContent = statArray[randomNumber - 1];
    // Pour chaque ligne du tableau
    for (let i = 1; i < 7; i++) {
        // Calcul du poucentage de fréquence de répétition
        statisticsTable.querySelector(`.row:nth-of-type(${i}) .dice-frequency-rating`).textContent = Math.floor(((statArray[i - 1] / launch) * 100) * 10) / 10 + '%';
    }
    // Exemple : triesArray[0] correspond au nombre de fois ou le joueur à trouvé du premier coup.
    triesArray[compt - 1]++;
    // Création d'une variable pour cumuler le nombre d'essais total du joueur sur toutes les parties
    let nbTotalTries = 0;
    for (let j = 0; j < 6; j++) {
        nbTotalTries += ((j + 1) * triesArray[j]);
    }
    if (launch > 1) {
        document.querySelector('.launch__mention').textContent = 'Nombre de lancés';
    }
    document.querySelector('.launch__value').textContent = launch;
    // Calcul de la moyenne du nombre d'essais
    document.querySelector('.tries-average__value').textContent = Math.round((nbTotalTries / launch) * 10) / 10;
}


// Events
throwButton.addEventListener('click', throwTheDice);
modalDiv.addEventListener('click', analyze);



