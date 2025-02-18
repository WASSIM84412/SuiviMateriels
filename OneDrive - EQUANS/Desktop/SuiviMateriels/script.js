document.addEventListener("DOMContentLoaded", function () {
    chargerDonnees();
});

function ajouterMateriel() {
    let nom = document.getElementById("nomMateriel").value;
    let numero = document.getElementById("numeroSerie").value;
    let date = document.getElementById("dateVerification").value;

    if (!nom || !numero || !date) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    let materiel = { nom, numero, date };
    let materiels = JSON.parse(localStorage.getItem("materiels")) || [];
    materiels.push(materiel);
    localStorage.setItem("materiels", JSON.stringify(materiels));

    chargerDonnees();
}

function chargerDonnees() {
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    let materiels = JSON.parse(localStorage.getItem("materiels")) || [];

    materiels.forEach((materiel, index) => {
        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${materiel.nom}</td>
            <td>${materiel.numero}</td>
            <td>${materiel.date}</td>
            <td id="qrcode-${index}"></td>
            <td>
                <button onclick="modifierMateriel(${index})">Modifier</button>
                <button onclick="supprimerMateriel(${index})">Supprimer</button>
            </td>
        `;

        tableBody.appendChild(tr);

        let qr = new QRCode(document.getElementById(`qrcode-${index}`), {
            text: `index.html?id=${materiel.numero}`,
            width: 60,
            height: 60
        });
    });
}

function supprimerMateriel(index) {
    let materiels = JSON.parse(localStorage.getItem("materiels")) || [];
    materiels.splice(index, 1);
    localStorage.setItem("materiels", JSON.stringify(materiels));
    chargerDonnees();
}

function modifierMateriel(index) {
    let materiels = JSON.parse(localStorage.getItem("materiels")) || [];
    let materiel = materiels[index];

    document.getElementById("nomMateriel").value = materiel.nom;
    document.getElementById("numeroSerie").value = materiel.numero;
    document.getElementById("dateVerification").value = materiel.date;

    supprimerMateriel(index);
}

function afficherMateriel() {
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");

    if (id) {
        let materiels = JSON.parse(localStorage.getItem("materiels")) || [];
        let materiel = materiels.find(m => m.numero === id);

        if (materiel) {
            document.body.innerHTML = `
                <h1>Détails du Matériel</h1>
                <p><strong>Nom :</strong> ${materiel.nom}</p>
                <p><strong>Numéro de Série :</strong> ${materiel.numero}</p>
                <p><strong>Date de Vérification :</strong> ${materiel.date}</p>
                <a href="index.html">Retour</a>
            `;
        } else {
            document.body.innerHTML = `<h1>Matériel introuvable</h1><a href="index.html">Retour</a>`;
        }
    }
}

afficherMateriel();
