//=========================================================================
// Traitement de "req_inscrire"
// Auteurs : P. Thiré & T. Kerbrat
// Version : 12/09/2018
//=========================================================================
"use strict";

const fonctions = require("./req_fonctions.js");
const fs = require("fs");
require('remedial');

const trait = function (req, res, query){
	
	let marqueurs;
	let pseudo;
	let password;
	let page;
	let nouveauMembre;
	let contenu_fichier;
	let listeMembres;
	let trouve;
	let i;
	trouve = false;

	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');
	listeMembres = JSON.parse(contenu_fichier);

	[i, trouve] = fonctions.trouve_value(listeMembres, query);

	function member(listeMembres,query){
		trouve = false;
		let i;	
		i = 0;
		while (i < listeMembres.length && trouve === false){
			if(listeMembres[i].pseudo === query.pseudo){
				trouve = true;
			}
			i++;
		}
	}
	member(listeMembres,query);
	
	function new_member(){
		
		nouveauMembre = {};
		nouveauMembre.pseudo = query.pseudo;
		nouveauMembre.password = query.password;
		listeMembres[listeMembres.length] = nouveauMembre;

		contenu_fichier = JSON.stringify(listeMembres);
		fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');
	}

	console.log(trouve);
	if (trouve === false) {
		new_member();
	}

	// ON RENVOIT UNE PAGE HTML 
		if (trouve === true) {
			// SI CREATION PAS OK, ON REAFFICHE PAGE FORMULAIRE AVEC ERREUR
			page = fs.readFileSync('modele_formulaire_inscription.html', 'utf-8');
			marqueurs = {};
			marqueurs.erreur = "ERREUR : ce compte existe déjà";
			marqueurs.pseudo = query.pseudo;
			page = page.supplant(marqueurs);

		} else {
			// SI CREATION OK, ON RENVOIE A LA PAGE DE CONNEXION
			page = fs.readFileSync('modele_accueil.html', 'UTF-8');
			marqueurs = {};
			marqueurs.pseudo = query.pseudo;
			marqueurs.erreur = "";
			marqueurs.password = query.password;
			page = page.supplant(marqueurs);
		}
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

module.exports = trait;
