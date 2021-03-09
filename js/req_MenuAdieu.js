"use strict";

const fs = require("fs");
require('remedial');

const trait = function (req, res, query) {

	let marqueurs;
	let page;
	let liste_Niveau = [];
	let contenu_fichier = fs.readFileSync('liste_Niveau.json', 'utf-8');
	liste_Niveau = JSON.parse(contenu_fichier);
	let liste_Heros = [];
	let contenu_fichier2 = fs.readFileSync('liste_Heros.json','utf-8');
	liste_Heros = JSON.parse(contenu_fichier2);
	page = fs.readFileSync('modele_MenuAdieu.html', 'utf-8');
	let i = 0;
	let trouve = false;

	function afficher_pseudo(liste_Niveau){
		while (i < liste_Niveau.length && trouve === false){
			
			if(query.pseudo === liste_Niveau[i].Pseudo){
				console.log("la query est : "+query.pseudo);
				console.log("le Pseudo est : "+liste_Niveau[i].Pseudo);
				trouve = true;
			}
			i++;
		}
	}
	afficher_pseudo(liste_Niveau);
	
	function save_palier (liste_Niveau){
		if (liste_Niveau[i -1].Niveau < 4){
		
			liste_Niveau.splice(i -1, 1);
			console.log(liste_Niveau);

		}else if (liste_Niveau[i -1].Niveau >= 4 && liste_Niveau[i -1].Niveau <= 6){
			
			liste_Niveau[i -1].Niveau = 4;
			liste_Niveau[i -1].Inventaire = "";

			for (let l = 0; l < liste_Niveau[i -1].Heros.length; l++){
				for (let c = 0; c < liste_Heros.length; c++){
					if (liste_Niveau[i -1].Heros[l].Nom === liste_Heros[c].Nom){
						liste_Niveau[i -1].Heros[l].PV = liste_Heros[c].PV;

					}
				} 
			}
			console.log(liste_Niveau);
		}else if (liste_Niveau[i -1].Niveau === 7){
		
			liste_Niveau[i -1].Niveau = 7;

			for (let l = 0; l < liste_Niveau[i -1].Heros.length; l++){
				for (let c = 0; c < liste_Heros.length; c++){
					if (liste_Niveau[i -1].Heros[l].Nom === liste_Heros[c].Nom){
						liste_Niveau[i -1].Heros[l].PV = liste_Heros[c].PV;

					}
				} 
			}
		}
	}

	contenu_fichier = JSON.stringify(liste_Niveau);
	fs.writeFileSync("liste_Niveau.json",contenu_fichier,"utf-8");

	
	marqueurs = {};
	page = page.supplant(marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();

};

module.exports = trait;
