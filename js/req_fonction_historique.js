"use strict";

const fs = require("fs");
const trait = function() { 

	let contenu_fichier9 = fs.readFileSync('historique.json', 'utf-8');
	let historique = JSON.parse(contenu_fichier9);

	historique = [];
    
	contenu_fichier9 = JSON.stringify(historique, null, "\t");
    fs.writeFileSync("historique.json", contenu_fichier9, "utf-8");

};

module.exports = trait;
