//=========================================================================
// Traitement de "req_identifier"
// Auteurs : P. Thiré & T. Kerbrat
// Version : 12/09/2018
//=========================================================================
"use strict";

const fs = require("fs");
require('remedial');
const fonctions = require ("./req_fonctions.js")

const trait = function (req, res, query) {

	let marqueurs;
	let pseudo;
	let password;
	let page;
	let membre;
	let contenu_fichier;
	let listeMembres;
	let i;
	let trouve;

	// ON LIT LES COMPTES EXISTANTS
	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');
	listeMembres = JSON.parse(contenu_fichier);

	// ON VERIFIE QUE LE PSEUDO/PASSWORD EXISTE
	
	function check_member (listeMembres, query){
		trouve = false;
		i = 0;
		while(i < listeMembres.length && trouve === false) {
			if(listeMembres[i].pseudo === query.pseudo) {
				if(listeMembres[i].password === query.password) {
					trouve = true;
				}
			}
			i++;
		}
	}
	check_member(listeMembres, query);
	
	// ON RENVOIT UNE PAGE HTML 
	
	if(trouve === false) {
		// SI IDENTIFICATION INCORRECTE, ON REAFFICHE PAGE ACCUEIL AVEC ERREUR
		page = fs.readFileSync('modele_accueil.html', 'utf-8');
		marqueurs = {};
		marqueurs.erreur = "ERREUR : compte ou mot de passe incorrect";
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

	}else {
		// SI IDENTIFICATION OK, ON ENVOIE PAGE ACCUEIL MEMBRE
		page = fs.readFileSync('modele_accueil_membre.html', 'UTF-8');
		marqueurs = {};
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);
	}

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
