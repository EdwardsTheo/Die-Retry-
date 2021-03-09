"use strict"; 

/////////////////////PREPARE GRD TOUR POUR LE PROCHAIN COMBAT///////////////////

const fs = require("fs");
const trait = function () { 

	let grd_Tour = [{"Tour": 1,}];
	let contenu_fichier7 = JSON.stringify(grd_Tour);
	fs.writeFileSync("grd_Tour.json", contenu_fichier7, "utf-8");
};

module.exports = trait;
