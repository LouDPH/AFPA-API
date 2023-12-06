if (validerEmail(email) === false) {
    erreur.innerHTML += "La saisie de votre email est incorrecte.";
    emailInput.focus();
    return false;
}
