var affichage = document.getElementById("affichage");
var btnEnvoyer = document.getElementById("envoi"); // Bouton envoyer
var btnRefresh = document.getElementById("refresh"); // Bouton rafraichir

btnEnvoyer.addEventListener("click", checkForm); // Abonnement bouton envoyer
btnRefresh.addEventListener("click", refresh); // Abonnement bouton rafraichir

function checkForm(event){
    event.preventDefault();

    var id = document.getElementById("id").value;
    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    var email = document.getElementById("email").value;

    mauvaisId = controle();

    if(!id.includes(mauvaisId)){
        if(erreur.innerHTML == "") erreur.innerHTML += "ID NON DISPONIBLE";
        return false
    }

    let data = {
        id: id,
        nom: nom,
        prenom: prenom,
        email: email,
      };

    post(JSON.stringify(data));
}

function refresh(){
    erreur.innerHTML = "";
}

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
        liste += "Id de l'utilisateur = " + donnees.users.records[i][idUser] + ", Nom : " + donnees.users.records[i][nom] +
        ", Prénom : " + donnees.users.records[i][prenom] + ", email : " + donnees.users.records[i][email] + "<br>";
    }
    affichage.innerHTML = liste;
    // console.log(donnees);
    // console.log(donnees.users);
    // console.log("records " + donnees.users.records);
    // console.log("nbr d'utilisateurs " + donnees.users.records.length); // retourne 1
    // console.log("premier utilisateurs " + donnees.users.records[0]); // retourne le premier user
    // console.log("email " + donnees.users.records[0][email]); // retourne l'email
})

// Ajouter un utilisateur
function post(donnees, fonctSuccess, fonctError) {
    var requestOptions = {
    method: "POST",
    body: donnees,
    redirect: "follow",
    };

    fetch('http://fbrc.esy.es/DWWM22053/Api/api.php/users', requestOptions)
    .then((response) => response.text())
};

let data = {
      id: "6",
      nom: "Garagiste",
      prenom: "Le",
      email: "test@gmail.com",
    };

//post(JSON.stringify(data)); 


// Contrôle si l'ID est libre
function controle() {
    fetch("http://fbrc.esy.es/DWWM22053/Api/api.php/users")
    .then((reponse) => {
        //console.log(reponse.json())
        return reponse.json();
    })
    .then((donnees) => {
        var idUser = 0;

        var tId = [];

        for(let i = 0; i < donnees.users.records.length; i++) {
            tId.push(donnees.users.records[i][idUser])
        }
        console.log(tId)
    })
}
