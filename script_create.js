// PROGRAMME PRINCIPAL

var affichage = document.getElementById("affichage");
var erreur = document.getElementById("erreur");
var btnEnvoyer = document.getElementById("envoi"); // Bouton envoyer
var btnRefresh = document.getElementById("refresh"); // Bouton rafraichir

btnRefresh.addEventListener("click", refresh);

btnEnvoyer.addEventListener("click", (e) => {
    checkForm(e);
}); // Abonnement bouton envoyer

// GET
fetch("http://fbrc.esy.es/DWWM22053/Api/api.php/users")
.then((reponse) => {
    return reponse.json();
})
.then((donnees) => {
    var idUser = 0;
    var nom = 1;
    var prenom = 2;
    var email = 3;

    var liste = "";

    for(let i = 0; i < donnees.users.records.length; i++) {
        liste += "<b>Id = </b>" + donnees.users.records[i][idUser] + ", <b>Nom : </b>" + donnees.users.records[i][nom] +
                ", <b>Prénom : </b>" + donnees.users.records[i][prenom] + ", <b>email : </b>" + donnees.users.records[i][email]
                + "</br>";
    }
    affichage.innerHTML = liste;
});

function checkForm(event){
    event.preventDefault();
    erreur.innerHTML = "";

    var nomInput = document.getElementById("nom");
    var prenomInput = document.getElementById("prenom");
    var emailInput = document.getElementById("email");

    var nom = nomInput.value;
    var prenom = prenomInput.value;
    var email = emailInput.value;

    var regexLettre = /[a-zA-Z]/;

    if (nom.length < 3){
        erreur.innerHTML += "Le nom doit contenir 3 caractères minimum.";
        nomInput.focus();
        return false;
    }
    else if(!regexLettre.test(nom)){
        erreur.innerHTML += "Le nom ne doit comporter que des lettres.";
        nomInput.focus();
        return false;
    }

    if (prenom.length < 3){
        erreur.innerHTML += "Le prénom doit contenir 3 caractères minimum.";
        prenomInput.focus();
        return false;
    }
    else if(!regexLettre.test(prenom)){
        erreur.innerHTML += "Le prénom ne doit comporter que des lettres.";
        prenomInput.focus();
        return false;
    }

    if (validerEmail(email) === false) {
        erreur.innerHTML += "La saisie de votre email est incorrecte.";
        emailInput.focus();
        return false;
    }

    // Contrôle si l'ID est libre
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

        for (let i = 1; i < tId.length; i++) {
            if (!tId.includes(i)) {
                id = i;
                break;
            }
            else {
                id = tId[parseInt(tId.length - 1)] + 1; // Ajoute un ID a la fin
            }
        }

        let data = {
            id: id,
            nom: nom,
            prenom: prenom,
            email: email,
          };
    
        post(JSON.stringify(data));
    
        alert("ID = " + id + "\nNom = " + nom + "\nPrénom = " + prenom + "\nEmail = " + email);
    
        setTimeout(function(){ location.reload(true); }, 500);
    })
};

function validerEmail(email) { // Vérification format email
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email); // retourne un boolean
};

function refresh(){
    erreur.innerHTML = "";
}

// Ajouter un utilisateur
function post(donnees) {
    var requestOptions = {
    method: "POST",
    body: donnees,
    redirect: "follow",
    };

    fetch('http://fbrc.esy.es/DWWM22053/Api/api.php/users', requestOptions)
    .then((response) => response.text())
};