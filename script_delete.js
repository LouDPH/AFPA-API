var btnEnvoyer = document.getElementById("envoi");
var affichage = document.getElementById("affichage");
var btnRefresh = document.getElementById("refresh");

btnRefresh.addEventListener("click", refresh);
btnEnvoyer.addEventListener("click",del); // Abonnement bouton envoyer

// Affichage des ID
fetch("http://fbrc.esy.es/DWWM22053/Api/api.php/users")
.then((reponse) => {
    return reponse.json();
})
.then((donnees) => {
    var idUser = 0;

    var tId = [];

    for(let i = 0; i < donnees.users.records.length; i++) {
        tId.push(donnees.users.records[i][idUser])
    }

    affichage.innerHTML = "ID existants : " + tId;
})

function del() {
    var donnees = document.getElementById("identifiant").value;
    var requestOptions = {
    method: "DELETE",
    redirect: "follow",
    };

    fetch('http://fbrc.esy.es/DWWM22053/Api/api.php/users/' + donnees, requestOptions)
    .then((response) => response.text())

    if(!donnees) alert("Aucun ID sélectionné.");
    else {
        alert("L'utilisateur " + donnees + " a été supprimé.");
        refresh();
    }
};

function refresh(){
    document.getElementById("identifiant").value = "";
    affichage.innerHTML = "";
    window.location.reload();
}
