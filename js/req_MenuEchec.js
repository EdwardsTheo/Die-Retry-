"use strict"

const fs = require("fs");
require('remedial');
const fonctions = require("./req_fonctions.js");
const which_level = require("./req_fonction_level.js");

const trait = function (req, res, query) {
	
	let page;
	let marqueurs;
	let l;
	let trouve;
	
	let contenu_fichier2 = fs.readFileSync('liste_Niveau.json', 'utf-8');
	let liste_Niveau = JSON.parse(contenu_fichier2);
	
	[l, trouve] = fonctions.trouve_value(liste_Niveau, query, l, trouve);
	
	which_level(liste_Niveau, l);
	
	contenu_fichier2 = JSON.stringify(liste_Niveau, null, "\t");
	fs.writeFileSync("liste_Niveau.json", contenu_fichier2, "utf-8");
	
	page = fs.readFileSync('modele_MenuEchec.html', 'utf-8');
	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);
	
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();

};

module.exports = trait;
