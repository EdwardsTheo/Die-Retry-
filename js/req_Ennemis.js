"use strict"

const fs = require("fs");
require('remedial');
const fonctions = require("./req_fonctions.js");

const traiter = function (req, res, query){
	
	let contenu_fichier = fs.readFileSync('monstres.json', 'utf-8');
	let monstres = JSON.parse(contenu_fichier);
	
	let contenu_fichier1 = fs.readFileSync('liste_Monstre.json', 'utf-8'); 
	let liste_Monstre = JSON.parse(contenu_fichier1);

    let contenu_fichier2 = fs.readFileSync('liste_Niveau.json', 'utf-8');
    let liste_Niveau = JSON.parse(contenu_fichier2);

	let contenu_fichier3 = fs.readFileSync('liste_Heros.json', 'utf-8');
    let liste_Heros = JSON.parse(contenu_fichier3);
 	
	let contenu_fichier4 = fs.readFileSync('liste_Tour.json','utf-8');
    let liste_Tour = JSON.parse(contenu_fichier4);
    let v = liste_Tour.Tour;
	
	let contenu_fichier5 = fs.readFileSync('liste_Tour2.json', 'utf-8');
    let liste_Tour2 = JSON.parse(contenu_fichier5);
 
 	let contenu_fichier6 = fs.readFileSync('grd_Tour.json', 'utf-8');
    let grd_Tour = JSON.parse(contenu_fichier6);

    let contenu_fichier7 = fs.readFileSync('effect.json', 'utf-8');
    let effect = JSON.parse(contenu_fichier7);

    let contenu_fichier8 = fs.readFileSync('historique.json','utf-8');
    let historique = JSON.parse(contenu_fichier8);
	
	let marqueurs = {};
	let page;
	let ability;
	let win;
	let loose;
	let trouve;
	let target;
	let compteur = 0;
	let damage = 0;
	let bonus_damage;
	let j = randomNumber();
	let m = randomNumber();
	let a = 0;
	let l;
	let y;
	
	[l, trouve] = fonctions.trouve_value(liste_Niveau, query, l, trouve);
	
	function randomNumber() { 
		return Math.floor(Math.random() * 3);
	}
	
	function transform() {
		if(typeof query.target === "string") {
			target = [query.target];
		}
		else {
			target = query.target;
		}
	}
	transform();
	
	Heros_Play(target, liste_Niveau[l].Heros[v], potion_or_skills());

///////////////FONCTION QUI PERMET AU HEROS DE JOUER/////////////////////////
	
	function Heros_Play(target, launcher, ability) {
        if(target === undefined) {
            right_page(ability, launcher);
        }
		else {
			let message = checking(ability, launcher, a);
            if(message === undefined) {
				launcher.PA = launcher.PA - ability.pa;
				for(let i = 0; i < target.length; i++) {
                    let x = randomNumber();
                    sort_name(launcher, ability, know_target(launcher, ability, target, i), i, x);
                    check_pv(know_target(launcher, ability, target, i));
                }
            }
            else{
                [page, marqueurs] = fonctions.f_marqueurs(l, v, liste_Niveau, fs, marqueurs, message, grd_Tour);
            }
            right_page(ability, launcher, message, grd_Tour);
        }
    bonus_damage = undefined;
    }

//////////////////////////FONCTION SPECIFIQUE AU HEROS///////////////////////////////////
	
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

//************FONCTION DE GESTION DES OBJETS***************//
 	
	function potion_or_skills() { 
        a = sort_type();
        if(have_potion() !== undefined) { 
            return to_potion();

        }else{
            return liste_Niveau[l].Heros[v].Ability[a];
        }
    }
	
	function have_potion() { 
        for(let i = 0; i < liste_Niveau[l].Inventaire.length; i++) {
            if(query.Ability !== undefined) {
                if(query.Ability === liste_Niveau[l].Inventaire[i].Nom) {
                    return "";
                }
            }
        }
    }
 	
	function to_potion() {
        for(let i = 0; i < liste_Niveau[l].Inventaire.length; i++) {
            if(query.Ability === liste_Niveau[l].Inventaire[i].Nom && compteur === 0) {
                a = 0;
                compteur++;
                liste_Niveau[l].Inventaire[i].avaible = "off";
                return liste_Niveau[l].Inventaire[i].Ability[a];
            }
        }
    }
	
	function delete_potion() { 
        for(let i = 0; i < liste_Niveau[l].Inventaire.length; i++) {
            if(liste_Niveau[l].Inventaire[i].avaible === "off") {
                liste_Niveau[l].Inventaire[i] = [];
                liste_Niveau[l].Inventaire.splice(i, 1);
            }
        }
    }
    delete_potion();

//**********************************//**********************************//
/////////////////////////////////////////////////////////////////////////

/////////////////FONCTION PERMETTANT AUX MONSTRES DE JOUER//////////////
 	
	function Monster_Play(liste_Niveau) {
        let a = initialize_Monster();
		let silence = hush(monstres[y][0]); 
		if(silence === undefined) {
			let target = [];
			let boucle = monstres[y][0].Ability[a].nb_target;
			console.log(monstres[y][0].Ability[a]);
			for(let j = 0; j < boucle; j++) {
				target.push(target_Monster(A_o_E(monstres[y][0].Ability[a])));
			}
			for(let i = 0; i < boucle; i++) {
				let x = randomNumber();
				sort_name(monstres[y][0], monstres[y][0].Ability[a], know_target(monstres[y][0], monstres[y][0].Ability[a], target, i), i, x);
            	check_pv(know_target(monstres[y][0], monstres[y][0].Ability[a], target, i));
			}
        }
	}
	
///////////////////////////FONCTION SPECIFIQUE AU MONSTRE//////////////////
	
	function initialize_Monster() { 
        y = dead_monster();
		let a = find_skill(monstres[y][0]);
		return a;
    } 

	function find_skill(monstres) {
        let a = Math.floor(Math.random() * 2);
		let message;
		target = [];
        target.length = monstres.Ability[a].nb_target;
        if(a === 1) {
			message = checking(monstres.Ability[1], monstres, a);   
		}
		if(message !== undefined) {
           a = 0;
        }
        return a;
	}
	
	function target_Monster(j) { 
        let x;
		if(j === 1) { 
            x = dead_monster();
			return monstres[x][0].Nom;
        }
        if(j === 0) {
			x = dead_heros();
			return liste_Niveau[l].Heros[x].Nom;
        }
    }
	
	function A_o_E (ability) { 
		switch(ability.name) {
            case "Dps": return 0 ;
            break;
            case "Heal": return 1;
            break;
            case "Shield": return 1;
            break;
            case "Provocation": return 0;
            break;
            case "Rez": return 1;
            break;
            case "Hush": return 0;
            break;
            case "Buff_Dps": return 1;
            break;
        }
    }

 	function dead_monster() { 
        let i = liste_Tour2.Tour;
        for(let j = 0; j < 3; j++) { 
            if(monstres[i][0].AoD !== "alive") { 
                i++;
            }
            if(i === 3) { 
                i = 0;
            }
        }
		return i;
    }

	function dead_heros() { 
        let i = randomNumber();
        for(let j = 0; j < 3; j++) { 
            if(liste_Niveau[l].Heros[i].AoD !== "alive") { 
                i++;
            }
            if(i === 3) {
                i = 0;
            }
        }
		return i;
    }

/////////////////////////////////////////////////////////////////////////

//////////////////////////FONCTION DE COMBAT//////////////////////////

 	function checking(ability, launcher, a) {
        let message = "";
		if(ability.end_cd <= grd_Tour[0].Tour) {
            ability.end_cd = "";
        }

        if(launcher.PA < ability.pa) {
            return message = "Vous n'avez pas assez de PA !";
        }
        else if(ability.nb_target !== target.length) {
            return message = "Tu ne peux pas lancer ce sort sur moins ou plus d'ennemis";
        }
        if(a !== 0) {
            if(ability.end_cd === "") {
                ability.end_cd = ability.cd + grd_Tour[0].Tour;
            }
            else if(ability.end_cd !== grd_Tour[0].Tour) {
                let cooldown = ability.end_cd - grd_Tour[0].Tour;
                return message = "Patience, ce sort sera disponible dans " + cooldown;
            }
        }
    }
	
	function sort_name(launcher, ability, target, i, x) {
		switch(ability.name) {
            case "Dps": dps(launcher, ability, target, x);
            break;
            case "Heal": heal(ability, target, x, launcher);
            break;
            case "Shield": shield(ability, target, x, launcher);
            break;
            case "Provocation": which_effect(launcher, ability, target, x);
            break;
            case "Rez": rez(ability, target, launcher, x);
            break;
            case "Hush": which_effect(launcher, ability, target, x);
            break;
            case "Buff_Dps": which_effect(launcher, ability, target, x);
            break;
        }
    }

	function know_target(launcher, ability, target, i) {
		for(let z = 0; z < effect[1].On.length; z++) {
            if(effect[1].On[z] !== undefined) {
                if(effect[1].On[z].state === "active") {
                    if(effect[1].On[z].target === launcher.Nom) {
                        effect[1].On[z].state = "inactive";
                        target[i] = effect[1].On[z].launcher;
                    }
                }
            }
        }
        for(let j = 0; j < 3; j++) {
			if(target[i] === monstres[j][0].Nom) {
				return monstres[j][0];
            }
            else if(target[i] === liste_Niveau[l].Heros[j].Nom) {
				return liste_Niveau[l].Heros[j];
            }
        }
    }
 	
	function know_level() {
        //Utilisé dans la fonction Heal pour liste_monstre
		j = liste_Niveau[l].Niveau;
        return j - 1;
    }

 	function dps(launcher, ability, target, x) {
        buff_dps(launcher, ability, target, x);
		if(bonus_damage !== undefined) {
            damage = ability.stat[x] + bonus_damage[x];
        }
        else{
            damage = ability.stat[x];
        }
		target.PV = target.PV - damage;
        crea_historique(historique, target, a, launcher, damage, x, ability);
    }

	function heal(ability, target, x, launcher) {
		let j = know_level();
        if(target.PV === 0) {
            target.PV = 0;
        }
        else{
			target.PV = target.PV + ability.stat[x];
        }
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
        crea_historique(historique, target, a, launcher, damage, x, ability);
	}

	function shield(ability, target, x, launcher) {
        target.PV = target.PV + ability.stat[x];
        crea_historique(historique, target, a, launcher, damage, x, ability);
    }
    
    function rez(ability, target, launcher, x) { 
        for(let i = 0; i < 3; i++) {
            for(let z = 0; z < 5; z++) {
                if(target.Nom === liste_Heros[z].Nom) {
                    target.PV = liste_Heros[z].PV;
                    target.AoD = "alive";
                }
                if(target.Nom === liste_Monstre[j]["Monstre" + i][0].Nom) {
                    target.PV = liste_Monstre[j]["Monstre" + i][0].PV;
                    target.AoD = "alive";
                }
            }
        }
        crea_historique(historique, target, a, launcher, damage, x, ability);
    }
    
//****************FONCTION POUR LES EFFETS**********************//	
	
	function which_effect(launcher, ability, target, x) {
        for(let i = 0; i < effect.length; i++) {
            if(ability.name === effect[i].Effet_Nom) {
                effect[i].On.push({"target": target.Nom,
                                     "stat": ability.stat,
                                     "state": "active",
                                     "launcher": launcher.Nom,
                                    })
            }
        }
        crea_historique(historique, target, a, launcher, damage, x, ability);
    }
	
	function hush(launcher) {
        for(let j = 0; j < effect[2].On.length; j++) { 
            if(effect[2].On[j] !== undefined) { 
                if(effect[2].On[j].state === "active") {
					if(effect[2].On[j].target === launcher.Nom) {
                        effect[2].On[j].state = "inactive";
                        return true; 
                    }
				}
			}
        }
    }
    
    function buff_dps(launcher, ability, target, x) {
        for(let j = 0; j < effect[0].On.length; j++) {
            if(effect[0].On[j] !== undefined) { 
                if(effect[0].On[j].state === "active") {
                    if(effect[0].On[j].target === launcher.Nom) {
                        bonus_damage = effect[0].On[j].stat;
                        effect[0].On[j].state = "inactive";
                    
                    }
                }
            }
        }
    }

//*********************************************************************//

 function check_pv(target) { 
        if(target.PV <= 0) { 
			target.PV = 0;
            target.AoD = "dead";
        }
    }

/////////////////////////////////////////////////////////////////////////

//////////////GESTION DES JSON/PAGES/MARQUEURS///////////////////////////

	function right_page(ability, launcher, message, grd_Tour) {
        page = dead_team(liste_Niveau[l].Heros, monstres);
        if(page === undefined) { 
            if(query.bouton === "Fin de tour") {
                page = fs.readFileSync('modele_Ennemis.html', 'UTF-8');
                launcher.PA = launcher.PA + 3;
                up_tour();
				marqueurs = fonctions.f_afficher_perso(liste_Niveau, marqueurs, liste_Heros, page, l);
				marqueurs = fonctions.f_afficher_monstre(monstres, marqueurs, page, l);
				marqueurs = fonctions.f_afficher_map(liste_Niveau, marqueurs, page, l);
				marqueurs = fonctions.f_competences(marqueurs, page);
				Monster_Play(liste_Niveau[l]);
            }else if(query.bouton === "Résolution") {
                if(launcher.PA <= 0) {
                    page = fs.readFileSync('modele_Ennemis.html', 'UTF-8');
                    launcher.PA = launcher.PA + 3;
                    up_tour();
				marqueurs = fonctions.f_afficher_perso(liste_Niveau, marqueurs, liste_Heros, page, l);
				marqueurs = fonctions.f_afficher_monstre(monstres, marqueurs, page, l);
				marqueurs = fonctions.f_afficher_map(liste_Niveau, marqueurs, page, l);
				marqueurs = fonctions.f_competences(marqueurs, page);
                Monster_Play(liste_Niveau[l]);
                }else{
				marqueurs = fonctions.f_afficher_perso(liste_Niveau, marqueurs, liste_Heros, page, l);
				marqueurs = fonctions.f_afficher_monstre(monstres, marqueurs, page, l);
				marqueurs = fonctions.f_afficher_map(liste_Niveau, marqueurs, page, l);
				contenu_fichier2 = JSON.stringify(liste_Niveau, null, "\t");
				fs.writeFileSync("liste_Niveau.json", contenu_fichier2,"utf-8");
                    [page, marqueurs] = fonctions.f_marqueurs(l, v, liste_Niveau, fs, marqueurs, message, grd_Tour);
                }
            }
        }
    }

	function dead_team(Heros_Team, Monster_Team, marqueurs) {
        let total_Hpv = 0;
        let total_Mpv = 0;
        for(let i = 0; i < 3; i++) { 
            total_Hpv = total_Hpv + Heros_Team[i].PV;
            total_Mpv = total_Mpv + Monster_Team[i][0].PV;
        }
        if(total_Hpv === 0) {
            return page = fs.readFileSync('modele_MenuEchec.html', 'UTF-8');
        }
        if(total_Mpv === 0 && liste_Niveau[l].Niveau !== 6) {
            liste_Niveau[l].Niveau = liste_Niveau[l].Niveau + 1;
			return page = fs.readFileSync('modele_VictoireRecompense.html', 'UTF-8');
        }/*
		if(total_Mpv === 0){
			marqueurs.boutton = "submit";
		}else if(total_Mpv !== 0){
			marqueurs.boutton = "hidden";
		}*/
        if(total_Mpv === 0 && liste_Niveau[l].Niveau === 6) {
            return page = fs.readFileSync('modele_Victoire.html', 'UTF-8');
        }
    }
	
	function up_tour() {
        if(liste_Tour.Tour <= 2 ){
            liste_Tour.Tour = liste_Tour.Tour + 1;
        }
        if(liste_Tour.Tour > 2){
            liste_Tour.Tour = 0;
            grd_Tour[0].Tour = grd_Tour[0].Tour + 1;
        }
        if(liste_Tour2.Tour <= 2) {
            liste_Tour2.Tour = liste_Tour2.Tour + 1;
        }
        if(liste_Tour2.Tour > 2) {
            liste_Tour2.Tour = 0;
        }
    }

 	function crea_historique(historique, target, a, launcher, damage, x, ability){
		if (ability.name === "Dps"){
            historique.push(launcher.Nom + " a utilisé "+ability.name+" (-"+ability.pa+" PA) sur "+target.Nom+" (-"+damage+" PV)");
        }else if (ability.name === "Heal"){
            historique.push(launcher.Nom + " a utilisé "+ability.name+" (-"+ability.pa+" PA) sur "+target.Nom+" (+"+ability.stat[x]+" PV)");
        }else if (ability.name === "Shield"){
            historique.push(launcher.Nom+" a donné un bonus de "+ability.stat[x]+" PV sur "+target.Nom);
        }else if (ability.name === "Hush"){
            historique.push(launcher.Nom+" a rendu silencieux "+target.Nom);
        }else if (ability.name === "Buff_Dps"){
            historique.push(launcher.Nom+" a donné un bonus de "+ability.stat[x]+" dégats sur "+target.Nom);
        }else if (ability.name === "Provocation"){
            historique.push(launcher.Nom+" a provoqué "+ target.Nom);
        }else if (ability.name === "Rez"){
			historique.push(launcher.Nom+" a ressuscité "+target.Nom);
		}

        if (historique.length > 5){
            historique.splice(0, 1);
        }
      	contenu_fichier8 = JSON.stringify(historique);
        fs.writeFileSync("historique.json",contenu_fichier8,"UTF-8");
    }
	
	function afficher_historique(marqueurs, historique){
        marqueurs.historique += "<ul>";
        for (let i=0; i<historique.length; i++){
            marqueurs.historique += "<li>" + historique[i] + "</li>";
        }
        marqueurs.historique += "</ul>";
    }
    afficher_historique(marqueurs, historique);

	if(trouve === true){
        for(let n = 0; n < 3; n++){
            marqueurs[["Hero" + n]+["_Nom"]] = liste_Niveau[l].Heros[n].Nom;
            marqueurs[["Hero" + n]+["_PV"]] = liste_Niveau[l].Heros[n].PV;
            marqueurs[["Monstre" + n]+["_Nom"]] = monstres[n][0].Nom;
            marqueurs[["Monstre" + n]+["_PV"]] = monstres[n][0].PV;
        }
    }
	
   	contenu_fichier = JSON.stringify(monstres, null, "\t");
    fs.writeFileSync("monstres.json", contenu_fichier, "utf-8");
    
	contenu_fichier2 = JSON.stringify(liste_Niveau, null, "\t");
    fs.writeFileSync("liste_Niveau.json", contenu_fichier2,"utf-8");

	contenu_fichier4 = JSON.stringify(liste_Tour);
    fs.writeFileSync("liste_Tour.json", contenu_fichier4,"utf-8");
 
 	contenu_fichier5 = JSON.stringify(liste_Tour2);
    fs.writeFileSync("liste_Tour2.json", contenu_fichier5, "utf-8");

 	contenu_fichier6 = JSON.stringify(grd_Tour);
    fs.writeFileSync("grd_Tour.json", contenu_fichier6, "utf-8");
    
	contenu_fichier7 = JSON.stringify(effect, null, "\t");
    fs.writeFileSync("effect.json", contenu_fichier7, "utf-8");

	marqueurs.tour = liste_Niveau[l].Heros[v].Nom;
	marqueurs.pseudo = query.pseudo;
    page = page.supplant(marqueurs);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();

//////////////////////////////////////////////////////////////////////////////

};

module.exports = traiter;
