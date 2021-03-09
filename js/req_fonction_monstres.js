"use strict"

////PREPARE LA LISTE DE MONSTRES EN FONCTION DU NIVEAU DE SAUVEGARDE DU JOUEUR/////

const fs = require("fs");
const trait = function(trouve, p) { 

	let monstres = [];
	
	let contenu_fichier1 = fs.readFileSync('liste_Monstre.json', 'utf-8');
    let liste_Monstre = JSON.parse(contenu_fichier1);	
	
	for(let i = 0; i < liste_Monstre.length; i++) {
		if(liste_Monstre[i].Niveau === p) { 
			for(let j = 0; j < 3; j++) { 
				monstres[j] = liste_Monstre[i]["Monstre" + j];
			}
		}
	}
	contenu_fichier1 = JSON.stringify(monstres, null, "\t");
    fs.writeFileSync("monstres.json", contenu_fichier1, "utf-8");
};

module.exports = trait;
