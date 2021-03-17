const formElt = document.querySelector("form");
const inputElt = document.querySelector('.input');
const convertBtn = document.querySelector('.btn span');
const resultElt = document.querySelector('.result');
const closeBtn = document.querySelector('.cross');

// Création de la fonction addZero pour respecter l'affichage digital hh:mm:ss
function addZero(n) {
    if (n < 10) {
        return ("0" + n.toString());
    } else {
        return n.toString();
    }
}

// Affichage du modal
function manageModal() {
    document.querySelector('.modal').classList.add('open');
    closeBtn.addEventListener('click', function() {
        if (this.parentElement.classList.contains('open')) {
            this.parentElement.classList.remove('open');
            inputElt.value = '';
        }
    })
}

// Fonction de conversion 
function convertTime() {
    let time = inputElt.value;
    let heures;
    let minutes;
    let secondes;
    // Si le champs n'est pas vide
    if (inputElt.value !== "") {
        // Si time est compris entre 60sec(inclus) et 3600sec(non inclus)
        if (time < 3600 && time >= 60) {
            // Traitement des minutes et des secondes
            minutes = Math.floor(time / 60);
            secondes = time % 60;
            resultElt.textContent = `00:${addZero(minutes)}:${addZero(secondes)}`;
        
        // Si non si time est supérieur ou égal à 3600sec
        } else if (time >= 3600) {
            // Traitement des heures, minutes, secondes
            heures = (time / 3600);
            // Si le résultat de heure n'est pas un nombre entier
            if (!Number.isInteger(heures)) { 
                // C'est qu'il reste du temps a traiter
                minutes = (time % 3600) / 60;
                // Si le résultat de minutes n'est pas un nombre entier
                if (!Number.isInteger(minutes)) {
                    // C'est qu'il reste du encore du temps a traiter
                    secondes = (time % 3600) % 60;
                }
            }
            resultElt.textContent = `${addZero(Math.floor(time / 3600))}:${addZero(Math.floor((time % 3600) / 60))}:${addZero((time % 3600) % 60)}`;
            //resultElt.textContent = addZero(Math.floor(time / 3600)) + ":" + addZero(Math.floor((time % 3600) / 60)) + ":" + addZero(((time % 3600) % 60));
        
        // Si non si time est inférieur à 60
        } else if (time < 60) {
            // Traitement des secondes uniquement
            resultElt.textContent = "00:00:" + addZero(time);
        }
    // Si le champs est vide
    } else {
        resultElt.textContent = "00:00:00";
    }
}

// Lorsque l'utilsateur clique sur le bouton
formElt.addEventListener("submit", (e) => {
    convertTime();
    manageModal();
    // Annulation de la soumission du formulaire
    e.preventDefault();
})