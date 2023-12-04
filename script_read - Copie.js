/**
 
Récupération des données de l'api REST
@return {Promise<any>}
*/
const fetchUsers = async () => {
    const res = await fetch('http://fbrc.esy.es/DWWM22053/Api/api.php/users')
    if (!res.ok) throw new Error('Erreur')
    return await res.json()
  }

  async function init () {
    // Je récupère mes données
    // L'objet récupéré est composé comme suit :
    // {"users": {"columns": ["id", "nom", "prenom", "email"], "records": [[...data user], [...data user], etc.]}}
    const data = await fetchUsers()
  
    // récupération des éléments du tableau à construire
    const tbody = document.querySelector('#users tbody')
    const thead = document.querySelector('#users thead')
  
    // on vérifie qu'ils existent
    if (tbody && thead) {
      // on crée un premier élément <tr> à ajouter au thead du tableau
      const tr = document.createElement('tr')
  
      // Construction du <thead> de la <table>
      // on boucle sur les columns des data (data.users.columns)
      for (let idx in data.users.columns) {
        // le text de la colonne à afficher
        const column = data.users.columns[idx]
        // Pour chaque itération de la boutlce des colonnes, on ajoute un <th>
        const th     = document.createElement('th')
        // ensuite on ajoute le texte dans le <th> créé
        th.innerHTML = column
  
        // puis on ajoute ce <th> au <tr> créé juste au-dessus
        tr.append(th)
      }
  
      // Enfin on ajoute le contenu du <tr> au <thead> de la <table#users>
      thead.append(tr)
  
      // construction du tbody
      // On parcourt les enregistrements (data.users.records)
      // Un enregistrement = une <tr>
      for (let record of data.users.records) {
        const tr = document.createElement('tr')
  
        // Ici, on remplit les colonnes en fonction des données de colonnes fournit par l'api en se servant de leur index
        for (let i in data.users.columns) {
          const td = document.createElement('td')
          td.innerHTML = record[i]
          tr.append(td)
        }
  
        tbody.append(tr)
      }
  
    }
  }
  init()