let result = document.querySelector('#result');
let form = document.querySelector('#form');

function send() {
    let xhr = new XMLHttpRequest();
    let inputValue = document.getElementById('value').value;

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(JSON.parse(this.response));
            console.log(JSON.parse(this.response).postData.text);
            result.textContent = 'Vos données on bien été envoyées au serveur.';
            result.classList.add('success');
        } else if (xhr.readyState == 4) {
            result.textContent = 'Une erreur est survenue.';
            result.classList.add('error');
        }
    }

    xhr.open('POST', 'https://mockbin.com/request', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(inputValue);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    send();
})