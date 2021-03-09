"use strict";

const fs = require("fs");

const traiter = function(liste_Niveau, liste_Heros, l) {
	
	for(let i = 0; i < liste_Heros.length; i++) {
		for(let j = 0; j < 3; j++) { 
			if(liste_Heros[i].Nom === liste_Niveau[l].Heros[j].Nom) { 
				liste_Niveau[l].Heros[j].PV = liste_Heros[i].PV;
				liste_Niveau[l].Heros[j].AoD = "alive";
			}
		}
	}
	let contenu_fichier2 = JSON.stringify(liste_Niveau, null, "\t");
    fs.writeFileSync("liste_Niveau.json", contenu_fichier2,"utf-8");
};

module.exports = traiter;
