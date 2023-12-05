var btnAfficher = document.getElementById("btnAfficher");
var btnMasquer = document.getElementById("btnMasquer");

var btnSubmit = document.getElementById("submit");

var btnSubmitId = document.getElementById("submitId");

var affichage = document.getElementById("affichage");
var nbrUser = document.getElementById("nbrUser");

var afficheIdSelect = document.getElementById("afficheIdSelect");

var monForm = document.getElementById("myForm");

var btnResetId = document.getElementById("resetId");

btnMasquer.style.display = "none";
monForm.style.display = "none"

// CONTROLE DE CHAMPS
function controleDeChamp() {
    var nomInput = document.getElementById("nom").value;
    var prenomInput = document.getElementById("prenom").value;
    var emailInput = document.getElementById("email").value;

    const emailRegex = /^[\w-]+(?:.[\w-]+)*@(?:[\w-]+.)+[a-zA-Z]{2,7}$/;
    
    var formValid = false

    if(nomInput.length > 0 && nomInput.length < 2) {
        document.getElementById("labelPrenom").innerHTML = "";
        document.getElementById("labelEmail").innerHTML = "";
        var err = document.getElementById("labelNom");
        err.innerHTML = "<b>-> Le Nom doit comporter au moins 2 caractères</b>";
        err.style.color = "red";
    }
    else if(prenomInput.length > 0 && prenomInput.length < 2) {
        document.getElementById("labelNom").innerHTML = "";
        document.getElementById("labelEmail").innerHTML = "";
        var err = document.getElementById("labelPrenom");
        err.innerHTML = "<b>-> Le Prénom doit comporter au moins 2 caractères</b>";
        err.style.color = "red";
    }
    else if(emailInput.length > 0 && !emailRegex.test(emailInput)) {
        document.getElementById("labelNom").innerHTML = "";
        document.getElementById("labelPrenom").innerHTML = "";
        var err = document.getElementById("labelEmail");
        err.innerHTML = "<b>-> Veuillez entrer un email valide</b>";
        err.style.color = "red";
    }
    else formValid = true;

    return formValid;

}

// BOUTON VALIDER ID
btnSubmitId.addEventListener("click", function(e) {
    //console.log("fonction ok")
    AfficheId();
}); 

// AFFICHAGE INFOS ID SELCTIONNE
function AfficheId() {
    var id = Number(document.getElementById("id").value);

    var erreur = document.getElementById("erreur");

    if(!id) {
        erreur.innerHTML = "/ Veuillez saisir un ID"
    } else {

        var controleId = controle(id);
        
        controleId.then( value => {
            if(value == false) {
                erreur.innerHTML = "/ ERR: l'id saisie n'est pas enregistré"
                monForm.style.display = "none"
            } else {
                erreur.innerHTML = "/ OK vous pouvez entrer les modifications"
                monForm.style.display = "block"
            }
            console.log("ma value " + value)
        })
        
        var index = affichageIdSelect(id);
        index.then( monIndex => {
            console.log("mon index " + monIndex)
            
            fetch("http://fbrc.esy.es/DWWM22053/Api/api.php/users")
            .then((reponse) => {
                //console.log(reponse.json())
                return reponse.json();
            })
            .then((donnees) => {
                var affichage = "<b>Index n°" + donnees.users.records[monIndex][0] + "</b>"
                + ", <b>Nom : </b>" + donnees.users.records[monIndex][1]
                + ", <b>Prénom : </b>" + donnees.users.records[monIndex][2]
                + ", <b>Email : </b>" + donnees.users.records[monIndex][3];
                
                //console.log(affichage)
                afficheIdSelect.innerHTML = affichage;
            })
        });
    }
}

btnResetId.onclick = function() {
    monForm.style.display = "none";
    afficheIdSelect.innerHTML = "";
    erreur.innerHTML = "";
}

// BOUTON AFFICHER LISTE UTILISATEURS
btnAfficher.addEventListener("click", function(e) {
    //console.log("fonction ok")
    afficherUsers();
});

// BOUTON MASQUER LISTE UTILISATEURS
btnMasquer.addEventListener("click", function(e) {
    //console.log("fonction ok")
    masquerUsers();
});

// AFFICHAGE ID SELECTIONNE
async function affichageIdSelect(id) {
    try {
        const response = await fetch("http://fbrc.esy.es/DWWM22053/Api/api.php/users");
        const donnees = await response.json();

        var idUser = 0;
        var tId = [];

        for (let i = 0; i < donnees.users.records.length; i++) {
            tId.push(donnees.users.records[i][idUser]);
        }
//console.log(tId);
        var index = tId.indexOf(id);
//console.log(index);

    return index;
    } catch (error) {
        console.error("Erreur lors de la requête fetch :", error);
        return false;
    }
}

// FONCTION AFFICHER LISTE UTILISATEURS
function afficherUsers() {
    // GET
    fetch("http://fbrc.esy.es/DWWM22053/Api/api.php/users")
    .then((reponse) => {
        //console.log(reponse.json())
        return reponse.json();
    })
    .then((donnees) => {
        var idUser = 0;
        var nom = 1;
        var prenom = 2;
        var email = 3;
        
        var liste = "";
        
        for(let i = 0; i < donnees.users.records.length; i++) {
            //console.log(donnees.users.records[i][email])
            liste += "<b>Id = </b>" + donnees.users.records[i][idUser] + ", <b>Nom : </b>" + donnees.users.records[i][nom] +
            ", <b>Prénom : </b>" + donnees.users.records[i][prenom] + ", <b>email : </b>" + donnees.users.records[i][email]
            + "</br>";
        }
        affichage.innerHTML = liste;
        var nombreUtilisateurs = donnees.users.records.length
        
        if(nombreUtilisateurs == 0) {
            nbrUser.innerHTML = "Il y a aucun utilisateur enregistré";
        } else if (nombreUtilisateurs == 1) {
            nbrUser.innerHTML = "Il y a un seul utilisateur enregistré";
        } else {   
            nbrUser.innerHTML = "Il y a " + nombreUtilisateurs + " utilisateurs enregistrés";
        }
        // console.log(donnees);
        // console.log(donnees.users);
        // console.log("records " + donnees.users.records);
        // console.log("nbr d'utilisateurs " + donnees.users.records.length); // retourne 1
        // console.log("premier utilisateurs " + donnees.users.records[0]); // retourne le premier user
        // console.log("email " + donnees.users.records[0][email]); // retourne l'email
    })
    btnAfficher.style.display = "none";
    btnMasquer.style.display = "block";
}
// FONCTION MASQUER LISTE UTILISATEURS
function masquerUsers() {
    nbrUser.innerHTML = "";
    affichage.innerHTML = "";
    btnAfficher.style.display = "block";
    btnMasquer.style.display = "none";
}

// SOUMISSION CHANGEMENT
btnSubmit.onclick = function() {

    var formValid = controleDeChamp();
console.log(formValid);

    if(formValid) { 
        var id = Number(document.getElementById("id").value);
        var nomSaisie = document.getElementById("nom").value;
        var prenomSaisie = document.getElementById("prenom").value;
        var emailSaisie = document.getElementById("email").value;
        
        var erreur = document.getElementById("erreur");
        
        var controleId = controle(id);
        //console.log(controleId);
        controleId.then( value => {
            if(value == false) {
                erreur.innerHTML = "ERR: l'id saisie n'est pas enregistré"
            } else {
                erreur.innerHTML = "OK vous pouvez entrer les modifications"
            }
            console.log("ma value " + value)
        })
        
        var donnees = "";
        
        // champ vide ou pas
        if (prenomSaisie == "" && nomSaisie == "") {
            console.log("4");
            donnees = {
                email: emailSaisie,
            }
        } else if (prenomSaisie == "" && emailSaisie == "") {
            console.log("5");
            console.log("modif nom")
            donnees = {
                nom: nomSaisie,
            }
        } else if (emailSaisie == "" && nomSaisie == "") {
            console.log("6");
            donnees = {
                prenom: prenomSaisie,
            }
        } else if (nomSaisie == "") {
            console.log("1");
            donnees = {
                prenom: prenomSaisie,
                email : emailSaisie,
            }
        } else if (prenomSaisie == "") {
            console.log("2");
            donnees = {
                nom: nomSaisie,
                email: emailSaisie,
            }
        } else if (emailSaisie == "") {
            console.log("3");
            donnees = {
                nom: nomSaisie,
                prenom: prenomSaisie,
            }
        } else {
            console.log("Modif complète")
            donnees = {
                nom: nomSaisie,
                prenom: prenomSaisie,
                email: emailSaisie,
            }
        }
        
        var requestOptions = {
            method: "PUT",
            body: JSON.stringify(donnees),
            redirect: "follow",
        };
        
        var userSelect = "http://fbrc.esy.es/DWWM22053/Api/api.php/users/" + id;
        
        fetch(userSelect, requestOptions)
        .then((response) => response.text())
        
        // si liste affichée
        if(btnMasquer.style.display == "block") {
            masquerUsers();
            afficherUsers();
        } 
        // si liste masquée, on ne fait rien
        
        nbrUser.innerHTML = "";
        affichage.innerHTML = "";
        btnAfficher.style.display = "block";
        btnMasquer.style.display = "none";
        
        AfficheId();
        document.getElementById("nom").value = "";
        document.getElementById("prenom").value = "";
        document.getElementById("email").value = "";

        document.getElementById("labelNom").innerHTML = "";
        document.getElementById("labelPrenom").innerHTML = "";
        document.getElementById("labelEmail").innerHTML = "";
        
    }
}
    
// Contrôle si l'ID est bien présent
async function controle(id) {
    try {
        const response = await fetch("http://fbrc.esy.es/DWWM22053/Api/api.php/users");
        const donnees = await response.json();

        var idUser = 0;
        var tId = [];

        for (let i = 0; i < donnees.users.records.length; i++) {
            tId.push(donnees.users.records[i][idUser]);
        }
//console.log(tId);
        var idOk = tId.includes(id);
        //console.log(idOk);

        return idOk;
    } catch (error) {
        console.error("Erreur lors de la requête fetch :", error);
        return false;
    }
}
