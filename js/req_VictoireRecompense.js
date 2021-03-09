//fichier permettant de choisir la récompense a chaque fin de Niveau 

"use strict"

const fs = require("fs");
require('remedial');
const fonctions = require("./req_fonctions.js");
const prepa_monstres = require("./req_fonction_monstres.js");
const initial_grdTour = require("./req_fonction_grdTour.js");
const initial_historique = require("./req_fonction_historique.js");
const initial_effect = require("./req_fonction_effect.js");
const set_pa = require("./req_fonction_setpa.js");

const traiter = function (req, res, query){
	
	let contenu_fichier6 = fs.readFileSync('liste_Heros.json', 'utf-8');
	let liste_Heros = JSON.parse(contenu_fichier6);
	
	let contenu_fichier5 = fs.readFileSync('liste_Niveau.json','utf-8');
	let liste_Niveau = JSON.parse(contenu_fichier5);
	
	let contenu_fichier = fs.readFileSync('usable_objects.json','utf-8');
	let usable_objects = JSON.parse(contenu_fichier);

	let contenu_fichier4 = fs.readFileSync('statics_objects.json', 'utf-8'); 
	let statics_objects = JSON.parse(contenu_fichier4);
	
	let marqueur;
	marqueur = {};
	let page;
	let liste_objets_inventaire = [];
	let image_usable;
	let image_usable2;	
	let image_usable3;
	let objects_usable;
	let objects_usable2;
	let objects_usable3;
	let image_static;
	let image_static2;
	let objects_static;
	let l;	
	let p = 0;
	let trouve;
	
	[l, trouve] = fonctions.trouve_value(liste_Niveau, query);
	
///////////////FONCTION POUR LES OBJECTS UTILISABLE//////////////////////////	
	
	function usable() {
		let boucle = Math.floor(Math.random() * 2 + 1);
		if(liste_Niveau[l].Niveau === 1 && liste_Niveau[l].Inventaire.length !== 3) {
			for(let i = 0; i < 3; i++) { 
				let random = Math.floor(Math.random()*3);
				if(i === 0) {
					objects_usable = usable_objects[0];
					image_usable = '<img class="recompense-description1" src="'+objects_usable.image+'"/>';
					marqueur.objet_usable = image_usable;
					marqueur.objet_usable2 = "";
					marqueur.objet_usable3 = "";
				}
				if(i === 1) {
					objects_usable2 = usable_objects[1];
					image_usable2 = '<img class="recompense-description2" src="'+objects_usable2.image+'"/>';	
					marqueur.objet_usable2 = image_usable2; 
				}
				if(i === 2) {
					objects_usable3 = usable_objects[2];
					image_usable3 = '<img class="recompense-description3" src="'+objects_usable3.image+'"/>';	
					marqueur.objet_usable3 = image_usable3; 
			
				}
			}
		}
	}
	if(liste_Niveau[l].Inventaire !== 3){ 
		usable();
	}else{
		marqueur.objet_usable = "";
		marqueur.objet_usable2 = "";
		marqueur.objet_usable3 = "";	
	}	
	
	function add_object(liste_Niveau) {
		if(liste_Niveau[l].Niveau === 1 && liste_Niveau[l].Inventaire !== 3) {
			if(trouve === true) {
				if(liste_Niveau[l].Inventaire === []) {
					liste_objets_inventaire.push(objects_usable);
					if(objects_usable2 !== undefined) { 
						liste_objets_inventaire.push(objects_usable2);	
					}
					if(objects_usable3 !== undefined) { 
						liste_objets_inventaire.push(objects_usable3);	
					}
				
				}else{
					for(let j = 0; j < liste_Niveau[l].Inventaire.length; j++){
						liste_objets_inventaire.push(liste_Niveau[l].Inventaire[j]);
					}
					
					liste_objets_inventaire.push(objects_usable);
					if(objects_usable2 !== undefined) { 
					liste_objets_inventaire.push(objects_usable2);
					}
					if(objects_usable3 !== undefined) { 
						liste_objets_inventaire.push(objects_usable3);	
					}
				}
				liste_Niveau[l].Inventaire = liste_objets_inventaire;
			}
		}
		else{
			marqueur.objet_usable = ""; 
			marqueur.objet_usable2 = ""; 
			marqueur.objet_usable3 = ""; 
		}
	}
	add_object (liste_Niveau);

////////////////////////////////////////////////////////////////////////////////////	
	
///////////////////FONCTION POUR LES OBJETS PERMANENTS////////////////////////	
	
	function statics(heros,	Hvanilla) { 
		set_pa(liste_Niveau, liste_Heros, l);
		let boucle = Math.floor(Math.random() * 2 + 1); 
		for(let i = 0; i < boucle; i++) { 
			let random = Math.floor(Math.random() * 6);
			if(i === 0) { 
				objects_static = statics_objects[random];
				image_static = '<img src="'+objects_static.image+'"/>';
				marqueur.objet_static = image_static;
				marqueur.objet_static2 = "";
				add_stat(objects_static, heros, Hvanilla);
			}
			if(i === 1) { 
				objects_static = statics_objects[random];
				image_static2 = '<img src="'+objects_static.image+'"/>';
				marqueur.objet_static2 = image_static2;
				add_stat(objects_static, heros, Hvanilla);
			}
		}
	}
	statics(liste_Niveau[l].Heros, liste_Heros);

//*********************AJOUT DU BONUS EN FONTION DE L'OBJET**********************//	
	
	function add_stat(object, heros, Hvanilla) {
		let x = Math.floor(Math.random()*3);
		switch(object.Effect[0].type) { 
			case "Max_Heal": max_heal(object, heros, Hvanilla, x);
			break;
			case "Buff_PA": buff_pa(object.Effect[0].stat, heros[x]);
			break;
			case "Buff_Dps": buff_dps(object, heros, x);
			break;
			case "Low_PA": low_pa(object, heros, x);
			break;
		}
	}
	
	function max_heal(object, heros, Hvanilla, x) { 
		for(let i = 0; i < Hvanilla.length; i++) {
			for(let j = 0; j < heros.length; j++) {
				if(Hvanilla[i].Nom === heros[j].Nom && object.Nom === "Benediction de Melitele") { 
					heros[j].PV = Hvanilla[i].PV;	
				}
				if(Hvanilla[i].Nom === heros[x].Nom && object.Nom === "Senzu") { 
					heros[x].PV = Hvanilla[i].PV;
				}			
			}
		}	
	}
	
	function buff_pa(stat, heros) { 
		heros.PA = heros.PA + stat;
	}
	
	function buff_dps(object, heros, x) { 
		let z = Math.floor(Math.random() * 3);
		if(heros[0].Nom === "Clerc") {
			x = Math.floor(Math.random() * 2 + 1);
		}
		while(heros[x].Ability[z].name !== "Dps") {
			z = Math.floor(Math.random() * 3);	
		}
		for(let i = 0; i < 3; i++) { 
			heros[x].Ability[z].stat[i] = heros[x].Ability[z].stat[i] + object.Effect[0].stat;
		}
	}
	
	function low_pa(object, heros, x) { 
		let z = Math.floor(Math.random()* 3 + 1);
		heros[x].Ability[z].pa = heros[x].Ability[z].pa - object.Effect[0].stat;
	}
	
////////////////////////////////////////////////////////////////////////////	
	
	
/////////////////FONCTION PERMETTANT DE PREPARER LE PROCHAIN NIVEAU////////////////////	
	
	function prepa_nextTurn() {
		liste_Niveau[l].Niveau = liste_Niveau[l].Niveau + 1;
		p = liste_Niveau[l].Niveau;
		initial_effect();
		initial_grdTour();
		initial_historique(); 
		prepa_monstres(trouve, p);
	}
	prepa_nextTurn();
	
	contenu_fichier5 = JSON.stringify(liste_Niveau, null, "\t");
	fs.writeFileSync('liste_Niveau.json', contenu_fichier5, 'utf-8');

	page = fs.readFileSync('modele_VictoireRecompense.html', 'utf-8');
	marqueur.pseudo = query.pseudo;
	page = page.supplant(marqueur);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = traiter;
