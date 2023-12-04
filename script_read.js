var affichage = document.getElementById("affichage");
var nbrUser = document.getElementById("nbrUser");


// // GET

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
                console.log(donnees.users.records[i][email])
                liste += "<b>Id = </b>" + donnees.users.records[i][idUser] + ", <b>Nom : </b>" + donnees.users.records[i][nom] +
                ", <b>Prénom : </b>" + donnees.users.records[i][prenom] + ", <b>email : </b>" + donnees.users.records[i][email]
                + "</br>";
        }
        affichage.innerHTML = liste;
        nbrUser.innerHTML = donnees.users.records.length;
        // console.log(donnees);
        // console.log(donnees.users);
        // console.log("records " + donnees.users.records);
        // console.log("nbr d'utilisateurs " + donnees.users.records.length); // retourne 1
        // console.log("premier utilisateurs " + donnees.users.records[0]); // retourne le premier user
        // console.log("email " + donnees.users.records[0][email]); // retourne l'email
})