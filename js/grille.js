"use strict";

const fs = require("fs");
require('remedial');

const perso = {
	x: 1,
	y: 1
};

const trait = function (req, res, query) {

	let marqueurs;
	let page;
	let contenu;
	let contenu_2;
	let grille;
	let html;
	let i;
	let j;
	let perso;
	let url;

	//Récupération contexte

	contenu = fs.readFileSync("grille.json", "utf-8");
	grille = JSON.parse(contenu);

	contenu_2 = fs.readFileSync("perso.json","utf-8");
	perso = JSON.parse(contenu_2);

	//Traitement
    query.x = Number(query.x);
    query.y = Number(query.y);
	if(
        query.y >=0
        && query.y < grille.length
        && query.x >=0
        && query.x < grille[query.y].length
        && grille[query.x] === 0
    ){
        perso.x = query.x;
        perso.y = query.y;
    }

	html = '<div class="grille">';

	for (i = 0; i < grille.length; i++) {
		html += '<div class="grille-ligne">';

		for (j = 0; j < grille[i].length; j++) {
			url ="/req_test?x="+ j + "&y="+ i;

			if (perso.x === j && perso.y === i) {
				html += '<span class="case">';
				html += '<img src = "healer.png">';
				html += '</span>';
			}else if (grille[i][j] === 0){
				if(
					(perso.x === j && perso.y === i - 1)
					|| (perso.x === j && perso.y === i + 1) 
					|| (perso.x === j - 1 && perso.y === i)
					|| (perso.x === j + 1 && perso.y === i)
				){
				html += '<a href="'+url+'"><span class="case"> '+0+'</a></span>';
				}else{
					html += '<span class = "case"></span>'
				}
			} else if (grille[i][j] === 1) {
				html += '{erreur}';
				}
		}
		html += '</div>';
	}
html += '</div>';

	//Mémorisation du contexte 

	contenu = JSON.stringify(perso);
	fs.writeFileSync("perso.json", contenu , "utf-8");

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('test.html', 'utf-8');

	marqueurs = {};
	marqueurs.grille = html;
	page = page.supplant(marqueurs);

	perso.x++;

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
	return html;
};
//--------------------------------------------------------------------------

module.exports = trait;

