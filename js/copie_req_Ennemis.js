"use strict"

const fs = require("fs");
require('remedial');
const fonctions = require("./req_fonctions.js");

const traiter = function (req, res, query){
	
	let marqueurs = {};
	let page;
	let ability;
	let contenu_fichier7 = fs.readFileSync('grd_Tour.json', 'utf-8');
	let grd_Tour = JSON.parse(contenu_fichier7);
	
	let liste_Monstre = [];
	let contenu_fichier8 = fs.readFileSync('liste_Monstre.json', 'utf-8');
	liste_Monstre = JSON.parse(contenu_fichier8);
	
	let liste_Heros = [];
	let contenu_fichier2 = fs.readFileSync('liste_Heros.json', 'utf-8');
	liste_Heros = JSON.parse(contenu_fichier2);
	
	let liste_Niveau = [];
	let contenu_fichier3 = fs.readFileSync('liste_Niveau.json', 'utf-8');
	liste_Niveau = JSON.parse(contenu_fichier3);
	
	let monstres = [];
	let contenu_fichier = fs.readFileSync('monstres.json', 'utf-8');
	monstres = JSON.parse(contenu_fichier);
	
	let contenu_fichier4 = fs.readFileSync('liste_Tour.json','utf-8');
	let liste_Tour = JSON.parse(contenu_fichier4);
	let v = liste_Tour.Tour; 
	
	let j = randomNumber();
	let m = randomNumber();	
	let a;
	let l = 0;
	let trouve = false;		
	let target;

	function randomNumber() {
		return Math.floor(Math.random() * 3);
	}
	
	if(typeof query.target === "string") {
		target = [query.target];
	}
	else {
		target = query.target;
	}
	
	
	while(l < liste_Niveau.length && trouve === false){
		if(liste_Niveau[l].Pseudo === query.pseudo){
			trouve = true;
		}else{
			l++;
		}
	}
	if(trouve === true){
			for(let n = 0; n < 3; n++){
				marqueurs[["Hero" + n]+["_Nom"]] = liste_Niveau[l].Heros[n].Nom;
           	 	marqueurs[["Hero" + n]+["_PV"]] = liste_Niveau[l].Heros[n].PV;
           	 	marqueurs[["Monstre" + n]+["_Nom"]] = monstres[n][0].Nom;
           		marqueurs[["Monstre" + n]+["_PV"]] = monstres[n][0].PV;
            }
	}
	
	function Heros_Play(target, launcher) {
		a = sort_type();
		let message = checking(launcher.Ability[a], launcher, a); 
		if(message === undefined) {
			
			for(let i = 0; i < target.length; i++) {
			sort_name(launcher.Ability[a], know_target(target, i));
			}	
		}
		else{
			console.log(message);
			[page, marqueurs] = fonctions.f_marqueurs(l, v, liste_Niveau, fs, marqueurs, message);
		}
		right_page(launcher.Ability[a], launcher, message);
	}

	Heros_Play(target, liste_Niveau[l].Heros[v]);	
	
	
	function Monster_Play() {
	
	}
	
	function sort_type() { 
		switch(query.Ability) {
			case "Basic": return a = 0;
			break;
			case "Special_0": return a = 1;
			break;
			case "Special_1": return a = 2;
			break;
			case "Ultime" : return a = 3;
		}	
	}
	
	function sort_name(ability, target) {
		switch(ability.name) {
			case "Dps": dps(ability, target);
			break;
			case "Heal": heal(ability, target);
			break;
			case "Shield": console.log("S");
			break;
			case "Provocation": console.log("P");
			break;
			case "Dps_Heal": console.log("D_H");
			break;
			case "Hush": console.log("H");
			break;
			case "Buff_Dps": console.log("BD");
			break;
		}	
	}
	
	function dps(ability, target) {
		let a = randomNumber();
		target.PV = target.PV - ability.stat[a];
	}
	function heal(ability, target) {
		let a = randomNumber();
		let j = know_level();
		target.PV = target.PV + ability.stat[a];
		for(let i = 0; i < 3; i++) {
			for(let z = 0; z < 5; z++) {
				if(target.Nom === liste_Heros[z].Nom) {
					if(target.PV > liste_Heros[z].PV) {
						target.PV = liste_Heros[z].PV;
					}
				}
				if(target.Nom === liste_Monstre[j]["Monstre" + i][0].Nom) {
					if(target.PV > liste_Monstre[j]["Monstre" + i][0].PV) {
						target.PV = liste_Monstre[j]["Monstre" + i][0].PV;
					}
				}
			}
		}
	}	
	
	function know_level() {
		j = liste_Niveau[l].Niveau;
		return j - 1;
	}
	
	function know_target(target, i) {
		for(let j = 0; j < 3; j++) {
			if(target[i] === monstres[j][0].Nom) {
				return monstres[j][0];
			}
			else if(target[i] === liste_Niveau[l].Heros[j].Nom) {
				return liste_Niveau[l].Heros[j];
			}
		}
	}	

		
	function checking(ability, launcher, a) {
		let message = "";
		if(ability.end_cd >= grd_Tour[0].Tour) {
			ability.end_cd = "";
		}
		else if(ability.pa > launcher.pa) {
			return message = "Vous n'avez pas assez de PA !"; 
		}
		else if(ability.nb_target !== target.length) {
			return message = "Tu ne peux pas lancer ce sort sur moins ou plus d'ennemis"; 
		}
		if(a !== 0) {
			console.log(ability.end_cd);
			console.log(grd_Tour[0].Tour);
			if(ability.end_cd === "") {
				ability.end_cd = ability.cd + grd_Tour[0].Tour;
			}
			else if(ability.end_cd !== grd_Tour[0].Tour) {
				console.log(ability.end_cd)
				console.log(grd_Tour[0].Tour);
				let cooldown = ability.end_cd - grd_Tour[0].Tour;
				return message = ["Patience; ce sort sera disponible dans " + cooldown];
			}
		}
	}
	
	function right_page(ability, launcher, message) {
		if(query.bouton === "Fin de tour") {
			if(liste_Tour.Tour <= 2 ){
				liste_Tour.Tour = liste_Tour.Tour +1;
			}
			if(liste_Tour.Tour > 2){
				liste_Tour.Tour = 0;
				grd_Tour[0].Tour = grd_Tour[0].Tour + 1;
			}
			page = fs.readFileSync('modele_Ennemis.html', 'UTF-8');
		}

		else if(query.bouton === "Résolution") {
			if(launcher.pa === 0) {
				page = fs.readFileSync('modele_Ennemis.html', 'UTF-8');
			}
			else{
			[page, marqueurs] = fonctions.f_marqueurs(l, v, liste_Niveau, fs, marqueurs, message);
			}
		}
	}
	
	contenu_fichier7 = JSON.stringify(grd_Tour);
	fs.writeFileSync("grd_Tour.json", contenu_fichier7, "utf-8");
	
	contenu_fichier3 = JSON.stringify(liste_Niveau);
	fs.writeFileSync("liste_Niveau.json", contenu_fichier3,"utf-8");
	
	contenu_fichier = JSON.stringify(monstres);
	fs.writeFileSync("monstres.json", contenu_fichier, "utf-8");
	
	contenu_fichier4 = JSON.stringify(liste_Tour)
	fs.writeFileSync("liste_Tour.json", contenu_fichier4,"utf-8");

	marqueurs.tour = liste_Niveau[l].Heros[v].Nom;


	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = traiter;

