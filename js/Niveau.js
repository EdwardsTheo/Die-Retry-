"use strict"

const kbd = require("kbd");
const fs = require("fs");
let liste_Niveau = [];
let contenu_fichier;

liste_Niveau.push({
	"Pseudo": "BaptisteTheobald",
	"Niveau": "1",
	"Contenu": [{}]
});

contenu_fichier = JSON.stringify(liste_Niveau);
fs.writeFileSync("liste_Niveau.json", contenu_fichier, "utf-8");
