"use strict"

const fs = require("fs");
require('remedial');
const fonctions = require("./req_fonctions.js");
const prep_niveau = require("./req_fonction_prepniveau.js");

const traiter = function(req, res, query) {
	
	let compteur = 0;
	let heros = [];
	let effect = [];
	let marqueurs;
	marqueurs = {};
	let page;
	let p;
	let i = 0;
	let trouve;
	let l;

	let contenu_fichier = fs.readFileSync('liste_Heros.json', 'utf-8');
	let liste_Heros = JSON.parse(contenu_fichier);
	
	let contenu_fichier2 = fs.readFileSync('liste_Niveau.json', 'utf-8');
	let liste_Niveau = JSON.parse(contenu_fichier2); 
	
	[l, trouve] = fonctions.trouve_value(liste_Niveau, query, l, trouve);
	
//////SI LE JOUEUR VIENT DE MENU ECHEC ET VEUX GARDER SON EQUIPE//////
	
	function restart (){		
		if(query.bouton === "Recommencer au dernier palier") {
			page = fs.readFileSync('modele_affichage_tour.html', 'UTF-8');
			query.character = ["0", "1", "2"];
			prep_niveau(trouve, liste_Niveau, liste_Heros, l, marqueurs);
		}
	}
	restart();
	
///////////SI LE JOUEUR A BIEN SELECTIONNÉ 3 HEROS///////////////
	
	function select_3_persos(){
		if(query.character.length === 3) {
			page = fs.readFileSync('modele_affichage_tour.html', 'UTF-8');
			heros_in_save(trouve, l);
			prep_niveau(trouve, liste_Niveau, liste_Heros, l, marqueurs);

		}else{
			//SI LE JOUEUR N'A PAS SELECTIONNÉ 3 PERSONNAGE RELANCE CHOIX EQUIPE AVEC MESSAGE D'ERREUR
			page = fs.readFileSync('modele_afficher_choixEquipe.html', 'UTF-8');
			marqueurs.erreur = "ERREUR: vous devez selectionner 3 personnages";
		}
	}
	select_3_persos();
	
////////PLACE LES HEROS DANS LA SAUVEGARDE DU JOUEUR///////////////
	
	function heros_in_save(trouve, l){
		if(trouve === true) { 
			for(let i = 0; i < 3; i++) {
				for(let k = 0; k < liste_Heros.length; k++) {
					if(query.character[i] === liste_Heros[k].Nom) {
						heros.push(liste_Heros[k]);	
						liste_Niveau[l].Heros = heros;
					}
				}
			}
			contenu_fichier2 = JSON.stringify(liste_Niveau, null, "\t");
			fs.writeFileSync("liste_Niveau.json", contenu_fichier2,"utf-8");
		}
	};

	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = traiter;



















