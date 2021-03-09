//=========================================================================
// Site WEB demo PI
// Auteurs : P. Thiré & T. Kerbrat
// Version : 09/11/2018
//=========================================================================

"use strict";

const http = require("http");
const url = require("url");
let mon_serveur;
let port;

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

const req_commencer = require("./req_commencer.js");
const req_afficher_formulaire_inscription = require("./req_afficher_formulaire_inscription.js");
const req_inscrire = require("./req_inscrire.js");
const req_identifier = require("./req_identifier.js");
const req_afficher_Tour = require("./req_afficher_Tour.js");
const req_afficher_choixEquipe = require("./req_afficher_choixEquipe.js");
const req_Niveau = require('./req_Niveau.js');
const req_MenuAdieu = require('./req_MenuAdieu.js');
const req_MenuEchec = require('./req_MenuEchec.js');
const req_VictoireRecompense = require ("./req_VictoireRecompense.js");
const req_Ennemis = require('./req_Ennemis.js');
const req_static = require("./req_statique.js");
const req_erreur = require("./req_erreur.js");
const req_VictoireFinale = require('./req_VictoireFinale.js');
//const req_test = require ("./grille.js")


//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

const traite_requete = function (req, res) {

	let requete;
	let pathname;
	let query;

	console.log("URL reçue : " + req.url);
	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;

	// ROUTEUR

	try {
		switch (pathname) {
			case '/':
			case '/req_commencer':
				req_commencer(req, res, query);
				break;
			case '/req_afficher_formulaire_inscription':
				req_afficher_formulaire_inscription(req, res, query);
				break;
			case '/req_inscrire':
				req_inscrire(req, res, query);
				break;
			case '/req_identifier':
				req_identifier(req, res, query);
				break;
			case '/req_afficher_Tour':
				req_afficher_Tour(req, res, query);
				break;
			case '/req_afficher_choixEquipe':
				req_afficher_choixEquipe(req, res, query);
				break;
			case '/req_Niveau':
				req_Niveau(req, res, query);
				break;
			case '/req_Ennemis':
				req_Ennemis(req, res, query);
				break;
			case '/req_MenuEchec':
				req_MenuEchec(req, res, query); 
				break;
			case '/req_VictoireRecompense' :
				req_VictoireRecompense(req, res, query);
				break;
			case '/req_MenuAdieu' :
				req_MenuAdieu(req, res, query);
				break;
			case '/req_VictoireFinale' : 
				req_VictoireFinale(req, res, query);
				break;
		//	case '/req_test':
		//		req_test(req,res,query);
		//		break;
			default:
				req_static(req, res, query);
				break;
		}
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		//console.trace();
		req_erreur(req, res, query);
	}
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

mon_serveur = http.createServer(traite_requete);
port = 5000;
//port = process.argv[2];
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
