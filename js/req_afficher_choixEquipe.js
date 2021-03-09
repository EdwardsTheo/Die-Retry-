"use strict"

const fs = require("fs");
require('remedial');
const fonctions = require("./req_fonctions.js");
const prep_niveau = require("./req_fonction_prepniveau.js");

const trait = function (req, res, query) {

//////ON REGARDE SI L'UTILISATEUR EXISTE DANS NOS SAUVEGARDE////////////
	
	let contenu_fichier = fs.readFileSync("liste_Niveau.json", 'utf-8');
	let liste_Niveau = JSON.parse(contenu_fichier);
	
	let contenu_fichier1 = fs.readFileSync("liste_Heros.json", 'utf-8');
	let liste_Heros = JSON.parse(contenu_fichier1);
	
	let Utilisateur;
	let trouve;
	let trouve2;
	let marqueurs;
	marqueurs = {};
	let page;
	let l;
	let i;
	let p;

//////FONCTION POUR REGARDER SI L'UTILISATEUR EXISTE DANS LES SAUVEGARDES///////
	
	[l, trouve] = fonctions.trouve_value(liste_Niveau, query, l, trouve); 

//////GESTION DE LA SAUVEGARDE//////////
	
	function save (liste_Niveau){
		if(trouve === false) {
			liste_Niveau.push({
				"Pseudo": query.pseudo,
				"Niveau": 1,
				"Inventaire": [],
				"Heros": "",
			});
			page = fs.readFileSync('modele_afficher_choixEquipe.html', 'utf-8');
		}
		else if(query.bouton === "Changer Equipe" || query.bouton === "Rejouer" ) {
			liste_Niveau[l].Niveau = 1;
			liste_Niveau[l].Inventaire = [];
			liste_Niveau[l].Heros = "";
			page = fs.readFileSync('modele_afficher_choixEquipe.html', 'utf-8');
		}
		else {
			prep_niveau(trouve, liste_Niveau, liste_Heros, l, marqueurs);
			page = fs.readFileSync('modele_affichage_tour.html', 'utf-8');
		}
		
		contenu_fichier = JSON.stringify(liste_Niveau, null, "\t");
		fs.writeFileSync("liste_Niveau.json", contenu_fichier, "utf-8"); 
		marqueurs.erreur = "";
	}
	save(liste_Niveau);


	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

module.exports = trait;
