document.querySelector("#cp").addEventListener("input", function() {
    if (this.value.length == 5) {
        let url = `https://geo.api.gouv.fr/communes?codePostal=${this.value}&fields=nom,codesPostaux,population&format=json&geometry=centre`;
        fetch(url)
        .then((res) => res.json()
        .then((data) => {
            console.log(data);
            let list = "<ul>";
            for(city of data) {
                list += `<li><strong>${city.nom}</strong> ${city.population} habitants</li>`;
            }
            list += "</ul>";
            document.querySelector("#result").innerHTML = list;
        })
        ).catch((error) => console.log(`Erreur : ${error}`))
    }
})