//fonctions qu'on utilise souvent

"use strict"

const trouve_value = function(liste_Niveau, query, l, trouve){
	l = 0;
	trouve = false;
	while (l < liste_Niveau.length && trouve === false){
		if (liste_Niveau[l].Pseudo === query.pseudo){
			trouve = true;
		}else{
			l++;
		}
	}
	return [l, trouve];
};

const f_marqueurs = function(l, v, liste_Niveau, fs, marqueurs, message, grd_Tour){
	let page = fs.readFileSync('modele_Niveau.html', 'UTF-8');
	marqueurs.tour = liste_Niveau[l].Heros[v].Nom;
	marqueurs.Basic = liste_Niveau[l].Heros[v].Ability[0].type;
	marqueurs.Special0 = liste_Niveau[l].Heros[v].Ability[1].name;
	marqueurs.Special1 = liste_Niveau[l].Heros[v].Ability[2].name;
	marqueurs.Ultim = liste_Niveau[l].Heros[v].Ability[3].name;
	marqueurs.PA = liste_Niveau[l].Heros[v].PA;

	marqueurs.Basic_Image = '<div class ="back1" style="background-image:url('+liste_Niveau[l].Heros[v].Ability[0].comp_image+'); background-size: cover;"/>';

	marqueurs.div1 = '</div>'

	marqueurs.Special0_Image = '<div class ="back2" style="background-image:url('+liste_Niveau[l].Heros[v].Ability[1].comp_image+'); background-size:cover;"/>';

	marqueurs.div2 = '</div>'

	marqueurs.Special1_Image = '<div class="back3" style="background-image:url('+liste_Niveau[l].Heros[v].Ability[2].comp_image+'); background-size : cover;"/>';

	marqueurs.div3 = '</div>'

	marqueurs.Ultim_Image = '<div class ="back4"style="background-image:url('+liste_Niveau[l].Heros[v].Ability[3].comp_image+'); background-size:cover;"/>';

	marqueurs.div4 = '</div>'

	for (let s = 0; s<4; s++){
		marqueurs["Attack"+s+"_Nom"] = liste_Niveau[l].Heros[v].Ability[s].name;
		marqueurs["Attack"+s+"_Describe"]= liste_Niveau[l].Heros[v].Ability[s].description;
		marqueurs["Attack"+s+"_PA"] = liste_Niveau[l].Heros[v].Ability[s].pa;
		if (liste_Niveau[l].Heros[v].Ability[s].end_cd === ""){
			marqueurs["end_cd"+s] = "0";
		}else{
			if (liste_Niveau[l].Heros[v].Ability[s].end_cd-grd_Tour[0].Tour <= 0){
				marqueurs["end_cd"+s] = "0";
			}else {
				marqueurs["end_cd"+s] = liste_Niveau[l].Heros[v].Ability[s].end_cd-grd_Tour[0].Tour;
			}
		}
	}
	if (message === undefined){
		marqueurs.erreur = "";
	}else{
		marqueurs.erreur = message; 
	}
	marqueurs.historique = "";
	marqueurs = how_many(liste_Niveau, marqueurs, l);
	return [page, marqueurs];

};

const how_many = function(liste_Niveau, marqueurs, l){
	let compteur = 0;
	let i = -1;
	do{
		i++;
		if(compteur === 0){
			fonct_marqueurs(marqueurs, compteur, liste_Niveau[l].Inventaire[0], liste_Niveau[l].Inventaire[1], liste_Niveau[l].Inventaire[2]);
		}else if(compteur === 1){
			fonct_marqueurs(marqueurs, compteur, liste_Niveau[l].Inventaire[0], liste_Niveau[l].Inventaire[1], liste_Niveau[l].Inventaire[2]);
		}else if(compteur === 2){
			fonct_marqueurs(marqueurs, compteur, liste_Niveau[l].Inventaire[0], liste_Niveau[l].Inventaire[1], liste_Niveau[l].Inventaire[2]);
		}else if(compteur === 3){ 
			fonct_marqueurs(marqueurs, compteur, liste_Niveau[l].Inventaire[0], liste_Niveau[l].Inventaire[1], liste_Niveau[l].Inventaire[2]);
		}
		compteur++;
}while(i<liste_Niveau[l].Inventaire.length);
	return marqueurs;
};

const fonct_marqueurs = function(marqueurs, compteur, objet0, objet1, objet2){
	if(compteur === 0){
		for(let i=0; i<3; i++){
			marqueurs["obj"+i+"_nb"]="";
			marqueurs["Objet"+i] = "";
			marqueurs["Objet"+i+"_Nom"]="";
			marqueurs["Objet"+i+"_Image"]="";
			marqueurs["end"+i]="";
		}
	}else if(compteur === 1){
		marqueurs["obj0_nb"]= objet0.RealName + '<br/>' + objet0.Ability[0].description;
		marqueurs["Objet0"] = '<input type="checkbox" name="Ability" value="'+objet0.Nom+'" class ="O">';
		marqueurs["Objet0_Nom"]=objet0.RealName;
		marqueurs["Objet0_Image"]= '<div class ="obj0_nom" style ="background-image:url('+objet0.image+'); background-size:cover">';
		marqueurs["end0"]='</div>';

	}else if(compteur === 2){
			marqueurs["obj1_nb"]= objet1.RealName + '<br/>' + objet1.Ability[0].description;
			marqueurs["Objet1"] = '<input type="checkbox" name="Ability" value="'+objet1.Nom+'" class ="O">';
			marqueurs["Objet1_Nom"]=objet1.RealName;
			marqueurs["Objet1_Image"]= '<div class ="obj1_nom" style ="background-image:url('+objet1.image+'); background-size:cover">';
			marqueurs["end1"]='</div>';
	}else if(compteur === 3){
			marqueurs["obj2_nb"]= objet2.RealName + '<br/>' + objet2.Ability[0].description;
			marqueurs["Objet2"] = '<input type="checkbox" name="Ability" value="'+objet2.Nom+'" class ="O">';
			marqueurs["Objet2_Nom"]=objet2.RealName;
			marqueurs["Objet2_Image"]= '<div class ="obj2_nom" style ="background-image:url('+objet2.image+'); background-size:cover">';
			marqueurs["end2"]='</div>';
	}
	return marqueurs;
};



const f_afficher_perso = function(liste_Niveau, marqueurs, liste_Heros, page, l){
	let image;
	let image_2;
	let image_3;
	let fin_div;
	//.............................................................
	//Affichage du héros sur le premier marqueur
	//.............................................................
	if (liste_Niveau[l].Heros[0].Nom === "Clerc"){
		image = '<div class="Hero0" style="background-image:url('+liste_Heros[0].Image+'); background-size: 60%; display:flex; flex-direction:column; width: 100%; height: 100%; background-repeat: no-repeat; background-position: center"/>';
		fin_div = '</div>'
	}else if(liste_Niveau[l].Heros[0].Nom === "Impetigo"){
		image = '<div class="Hero0" style="background-image:url('+liste_Heros[1].Image+'); background-size: 60%; display:flex; flex-direction:column; width: 100%; height: 100%; background-repeat: no-repeat; background-position: center"/>';
		fin_div = '</div>'
	}else{
		image = '<div class="Hero0" style="background-image:url('+liste_Heros[2].Image+'); background-size: 60%; display:flex; flex-direction:column; width: 100%; height: 100%; background-repeat: no-repeat; background-position: center"/>';
		fin_div = '</div>'
	}

	//.............................................................
	//Affichage du héros dans le deuxième marqueur
	//.............................................................
	if (liste_Niveau[l].Heros[1].Nom=== "Impetigo"){
		image_2 = '<div class="Hero1" style="background-image:url('+liste_Heros[1].Image+'); background-size: 60%; display:flex; flex-direction:column; width: 100%; height: 100%; background-repeat: no-repeat; background-position: center"/>';
		fin_div = '</div>'
	}else if(liste_Niveau[l].Heros[1].Nom === "Balanite"){
		image_2 = '<div class="Hero1" style="background-image:url('+liste_Heros[2].Image+'); background-size: 60%; display:flex; flex-direction:column; width: 100%; height: 100%; background-repeat: no-repeat; background-position: center"/>';
		fin_div = '</div>'
	}else{
		image_2 = '<div class="Hero1" style="background-image:url('+liste_Heros[3].Image+'); background-size: 60%; display:flex; flex-direction:column; width: 100%; height: 100%; background-repeat: no-repeat; background-position: center"/>';
		fin_div = '</div>'
	}
	//.............................................................
	//Affichage du héros dans le troisième marqueur
	//.............................................................

	if (liste_Niveau[l].Heros[2].Nom === "Balanite" ){
		image_3 = '<div class="Hero2" style="background-image:url('+liste_Heros[2].Image+'); background-size: 60%; display:flex; flex-direction:column; width: 100%; height: 100%; background-repeat: no-repeat; background-position: center"/>';
		fin_div = '</div>'
	}else if (liste_Niveau[l].Heros[2].Nom === "Escarre"){
		image_3 = '<div class="Hero2" style="background-image:url('+liste_Heros[3].Image+'); background-size: 60%; display:flex; flex-direction:column; width: 100%; height: 100%; background-repeat: no-repeat; background-position: center"/>';
		fin_div = '</div>'
	}else{
		image_3 = '<div class="Hero2" style="background-image:url('+liste_Heros[4].Image+'); background-size: 60%; display:flex; flex-direction:column; width: 100%; height: 100%; background-repeat: no-repeat; background-position: center"/>';
		fin_div = '</div>'
	}

	//.............................................................
	//Initialisation des héros dans les marqueurs 
	//.............................................................
	marqueurs.perso_1 = image;
	marqueurs.fin_div = fin_div;
	marqueurs.perso_2 = image_2;
	marqueurs.fin_div2 = fin_div;
	marqueurs.perso_3 = image_3;
	marqueurs.fin_div3 = fin_div;
	return marqueurs;
};
const f_afficher_monstre = function(monstres, marqueurs, page, l){
	let monstres_1;
	let monstres_2;
	let monstres_3;
	let fin_div_m;
	monstres_1 = '<div class="monstre1" style="background-image:url('+monstres[0][0].Image+'); background-size: 100%; display:flex; flex-direction:column; width: 100%; height: 100%; background-repeat: no-repeat; background-position: center"/>';
	monstres_2 = '<div class="monstre2" style="background-image:url('+monstres[1][0].Image+'); background-size: 100%; display:flex; flex-direction:column; width: 100%; height: 100%; background-repeat: no-repeat; background-position: center"/>';
	monstres_3 = '<div class="monstre3" style="background-image:url('+monstres[2][0].Image+'); background-size: 100%; display:flex; flex-direction:column; width: 100%; height: 100%; background-repeat: no-repeat; background-position: center"/>';
	fin_div_m = '</div>'
	marqueurs.monstres_1 = monstres_1;
	marqueurs.monstres_2 = monstres_2;
	marqueurs.monstres_3 = monstres_3;
	marqueurs.fin_div_m = fin_div_m;
	marqueurs.fin_div_m2 = fin_div_m;
	marqueurs.fin_div_m3 = fin_div_m;
	return marqueurs;
};
const f_afficher_map = function (liste_Niveau, marqueurs, page, l){
	let map;
	let fin_map;
	let html;

	if(liste_Niveau[l].Niveau === 1 || liste_Niveau[l].Niveau === 2){
		map = '<div class="Map1-2" style="background-image: url(Map_1-2.jpg); background-repeat: no-repeat; background-size: cover; background-position: center">';
		fin_map = '</div>';
	}else if (liste_Niveau[l].Niveau === 3){
		map = '<div class="Map3" style="background-image: url(Map_3.jpg); background-repeat: no-repeat; background-size: cover; background-position: center">';
		fin_map = '</div>';
	}else if (liste_Niveau[l].Niveau === 4 || liste_Niveau[l].Niveau === 5){
		map = '<div class="Map4-5" style="background-image: url(Map_4-5.jpg); background-repeat: no-repeat; background-size: cover; background-position: center">';
		fin_map = '</div>';
	}else if (liste_Niveau[l].Niveau === 6){
		map = '<div class="Map6" style="background-image: url(Map_6.jpg); background-repeat: no-repeat; background-size: cover; background-position: center">';
		fin_map = '</div>';
	}
	marqueurs.map = map;
	marqueurs.fin_map = fin_map;
	return marqueurs;

};
const f_competences = function(marqueurs, page){
	marqueurs.Basic = "";
	marqueurs.Special0 = "";
	marqueurs.Special1 = "";
	marqueurs.Ultim = "";
	return marqueurs;
}
module.exports = {trouve_value : trouve_value, f_marqueurs : f_marqueurs, f_afficher_perso : f_afficher_perso, f_afficher_monstre : f_afficher_monstre, f_afficher_map : f_afficher_map, f_competences : f_competences};

