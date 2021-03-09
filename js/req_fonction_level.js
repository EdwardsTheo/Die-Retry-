"use strict";

const fs = require("fs");

const traiter = function(liste_Niveau, l) { 
	
	console.log(l);
	if(liste_Niveau[l].Niveau < 4) {  
		liste_Niveau[l].Niveau = 1;
	}
	else if(liste_Niveau[l].Niveau > 4) {
		liste_Niveau[l].Niveau = 4;
	}

};

module.exports = traiter;
