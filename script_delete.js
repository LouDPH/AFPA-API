// PROGRAMME PRINCIPAL DELETE

// Déclaration des variables
var btnEnvoyer = document.getElementById("envoi");
var affichage = document.getElementById("affichage");
var select = document.getElementById("selectID");

btnEnvoyer.addEventListener("click",del); // Abonnement bouton envoyer

// Affichage des ID
fetch("http://fbrc.esy.es/DWWM22053/Api/api.php/users")
.then((reponse) => {
    return reponse.json();
})
.then((donnees) => {
    var idUser = 0;
    var email = 3;

    var selectId = '<select required="required">';

    for(let i = 0; i < donnees.users.records.length; i++) {
        var option = donnees.users.records[i][idUser];
        var mail = donnees.users.records[i][email];
        selectId += '<option value="' + option + '">' + "ID : " + option + " Mail : " + mail + '</option>';
    }

    selectId += '</select>';

    select.innerHTML = selectId;
})

function del() {
    var elt = document.querySelector('select');
    var donnees = elt.value;

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
    affichage.innerHTML = "";
    window.location.reload();
}
