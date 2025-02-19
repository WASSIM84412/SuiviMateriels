document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#materielsTable tbody");
    const addButton = document.querySelector("#ajouterMateriel");

    // Charger les données stockées
    function loadData() {
        const savedData = JSON.parse(localStorage.getItem("materiels")) || [];
        savedData.forEach(item => addRow(item.nom, item.numeroSerie, item.nomTechnicien, item.dateVerification));
    }

    // Sauvegarder les données
    function saveData() {
        const rows = document.querySelectorAll("#materielsTable tbody tr");
        const data = [];
        rows.forEach(row => {
            const cells = row.querySelectorAll("td");
            data.push({
                nom: cells[0].textContent,
                numeroSerie: cells[1].textContent,
                nomTechnicien: cells[2].textContent,
                dateVerification: cells[3].textContent
            });
        });
        localStorage.setItem("materiels", JSON.stringify(data));
    }

    function addRow(nom, numeroSerie, nomTechnicien, dateVerification) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${nom}</td>
            <td>${numeroSerie}</td>
            <td>${nomTechnicien}</td>
            <td>${dateVerification}</td>
            <td>
                <button class="modifier">Modifier</button>
                <button class="supprimer">Supprimer</button>
            </td>
        `;
        tableBody.appendChild(row);
        saveData();
    }

    addButton.addEventListener("click", () => {
        const nom = document.querySelector("#nomMateriel").value.trim();
        const numeroSerie = document.querySelector("#numeroSerie").value.trim();
        const nomTechnicien = document.querySelector("#nomTechnicien").value.trim();
        const dateVerification = document.querySelector("#dateVerification").value;

        if (nom && numeroSerie && nomTechnicien && dateVerification) {
            addRow(nom, numeroSerie, nomTechnicien, dateVerification);
            document.querySelector("#nomMateriel").value = "";
            document.querySelector("#numeroSerie").value = "";
            document.querySelector("#nomTechnicien").value = "";
            document.querySelector("#dateVerification").value = "";
        }
    });

    tableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("supprimer")) {
            event.target.closest("tr").remove();
            saveData();
        }
        
        if (event.target.classList.contains("modifier")) {
            const row = event.target.closest("tr");
            const cells = row.querySelectorAll("td");
            
            const nom = prompt("Modifier le nom", cells[0].textContent);
            const numeroSerie = prompt("Modifier le numéro de série", cells[1].textContent);
            const nomTechnicien = prompt("Modifier le technicien", cells[2].textContent);
            const dateVerification = prompt("Modifier la date de vérification", cells[3].textContent);
            
            if (nom && numeroSerie && nomTechnicien && dateVerification) {
                cells[0].textContent = nom;
                cells[1].textContent = numeroSerie;
                cells[2].textContent = nomTechnicien;
                cells[3].textContent = dateVerification;
                saveData();
            }
        }
    });

    document.querySelectorAll(".filter").forEach(input => {
        input.addEventListener("keyup", function() {
            const columnIndex = this.dataset.column;
            const filterValue = this.value.toLowerCase();
            document.querySelectorAll("#materielsTable tbody tr").forEach(row => {
                const cellText = row.cells[columnIndex].textContent.toLowerCase();
                row.style.display = cellText.includes(filterValue) ? "" : "none";
            });
        });
    });
    
    loadData();
});
