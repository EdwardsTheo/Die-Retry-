"use strict"

const fs = require("fs");
require('remedial');
const fonctions = require("./req_fonctions.js");

const traiter = function (req, res, query){
	
	let contenu_fichier = fs.readFileSync('monstres.json', 'utf-8');
	let monstres = JSON.parse(contenu_fichier);
	
	let contenu_fichier2 = fs.readFileSync('liste_Heros.json', 'utf-8');
	let liste_Heros = JSON.parse(contenu_fichier2);
	
	let contenu_fichier3 = fs.readFileSync('liste_Niveau.json', 'utf-8');
	let liste_Niveau = JSON.parse(contenu_fichier3);
	
	let contenu_fichier4 = fs.readFileSync('liste_Tour.json','utf-8');
	let liste_Tour = JSON.parse(contenu_fichier4);
	let v = liste_Tour.Tour;

	let contenu_fichier5 = fs.readFileSync('historique.json','utf-8')
	let historique = JSON.parse(contenu_fichier5);
	
	let grd_Tour = [];
	let contenu_fichier6 = fs.readFileSync('grd_Tour.json','utf-8');
	grd_Tour = JSON.parse(contenu_fichier6);

	let marqueurs;
	marqueurs = {};
	let page;
	let p; 	
	let l;
	let trouve;

	[l, trouve]= fonctions.trouve_value(liste_Niveau, query, l, trouve);
	let message = undefined;

	function stay_dead() {
		v = liste_Tour.Tour;
    	for(let i = 0; i < 3; i++) {
			if(liste_Niveau[l].Heros[v].AoD !== "alive") { 
				v++;
			}
			if(v === 3) { 
				v = 0;
			}
		}
	}
	stay_dead();
	liste_Tour.Tour = v;

///////AFFICHAGE DES HEROS EN FONCTION DE LA SAUVEGARDE DU JOUEUR////////////////
	
	if(trouve === true) {
		for(let n = 0; n < 3; n++){
			marqueurs[["Hero" + n]+["_Nom"]] = liste_Niveau[l].Heros[n].Nom;
			marqueurs[["Hero" + n]+["_PV"]] = liste_Niveau[l].Heros[n].PV;
			marqueurs[["Monstre" + n]+["_Nom"]] = monstres[n][0].Nom;	
			marqueurs[["Monstre" + n]+["_PV"]] = monstres[n][0].PV;
		}
		
		[page, marqueurs] = fonctions.f_marqueurs(l, v, liste_Niveau, fs, marqueurs, message, grd_Tour);
	}
	
	function afficher_historique(marqueurs, historique){
		marqueurs.historique += "<ul>";
		for (let i=0; i<historique.length; i++){
			marqueurs.historique += "<li>" + historique[i] + "</li>";
		}
		marqueurs.historique += "</ul>";
	}
	afficher_historique(marqueurs, historique);

	contenu_fichier4 = JSON.stringify(liste_Tour);
	fs.writeFileSync("liste_Tour.json", contenu_fichier4,"utf-8");
	
	marqueurs.pseudo = query.pseudo;
	marqueurs = fonctions.f_afficher_map (liste_Niveau, marqueurs, page, l);
	marqueurs = fonctions.f_afficher_perso(liste_Niveau, marqueurs, liste_Heros, page, l);
	marqueurs = fonctions.f_afficher_monstre(monstres, marqueurs, page, l);
	
	page = fs.readFileSync('modele_Niveau.html', 'UTF-8');
	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
	
};

module.exports = traiter;


