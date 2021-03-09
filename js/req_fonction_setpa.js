"use strict";

const fs = require("fs");

const traiter = function(liste_Niveau, liste_Heros, l) {

    for(let i = 0; i < liste_Heros.length; i++) {
        for(let j = 0; j < 3; j++) { 
            if(liste_Heros[i].Nom === liste_Niveau[l].Heros[j].Nom) { 
                liste_Niveau[l].Heros[j].PA = liste_Heros[i].PA;
            	for(let x = 0; x < 4; x++) {
					liste_Niveau[l].Heros[j].Ability[x].end_cd = "";
				}
			}
        }
    }
    let contenu_fichier2 = JSON.stringify(liste_Niveau, null, "\t");
    fs.writeFileSync("liste_Niveau.json", contenu_fichier2,"utf-8");
};

module.exports = traiter;

