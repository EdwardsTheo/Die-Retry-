"use strict";

const fs = require("fs");
const initial_effect = require("./req_fonction_effect.js");
const prepa_monstres = require("./req_fonction_monstres.js");
const initial_grdTour = require("./req_fonction_grdTour.js");
const initial_historique = require("./req_fonction_historique.js");
const which_level = require("./req_fonction_level.js");
const set_pv = require("./req_fonction_setpv.js");
const set_pa = require("./req_fonction_setpa.js");
const bouton_niveau = require("./req_fonction_bouton.js");

const traiter = function(trouve, liste_Niveau, liste_Heros, l, marqueurs) {
	which_level(liste_Niveau, l);
	let p = liste_Niveau[l].Niveau;
	prepa_monstres(trouve, p);
    initial_effect();
    initial_grdTour();
    initial_historique();
    set_pv(liste_Niveau, liste_Heros, l);
    set_pa(liste_Niveau, liste_Heros, l);
	bouton_niveau(p, marqueurs);	
};

module.exports = traiter;
