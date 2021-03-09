"use strict";

//////////////////PREPARE LA LISTE DES EFFET//////////////////////////

const fs = require("fs");
const trait = function() { 
	
	let effect = [];	
	effect.push({
	"Effet_Nom": "Buff_Dps",
	"On": [],

	});
	effect.push({
	"Effet_Nom": "Provocation",
	"On": [],

	});
	effect.push({
	"Effet_Nom": "Hush",
	"On": [],

	});
	
	let contenu_fichier8 = JSON.stringify(effect, null, "\t");
	fs.writeFileSync("effect.json", contenu_fichier8, "utf-8");
};

module.exports = trait;
