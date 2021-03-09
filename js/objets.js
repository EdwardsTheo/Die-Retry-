//Crée un json pour une liste d'objets

"use strict"

const fs = require ("fs");
let usable_objects = [];
let statics_objects = [];
let contenu_fichier;

usable_objects.push ({
	"Nom": "Potion_soin", 
	"image": "potion.jpeg",
	"Ability": [{"type": "Basic", "name": "Heal", "nb_target": 1, "pa": 2, "cd": 0, "end_cd": "", "stat": [5, 6, 9], "description": "Soigne un allié unique"}]
});

usable_objects.push ({
	"Nom": "Potion_degats", 
	"image": "degat.jpg",
	"Ability": [{"type": "Basic", "name": "Dps", "nb_target": 1, "pa": 2, "cd": 0, "end_cd": "", "stat": [6, 7, 10], "description": "Attaque un ennemi unique"}]
});

usable_objects.push ({
	"Nom": "Plume de phenix", 
	"image": "plume.jpg",
	"Ability": [{"type": "Basic", "name": "Rez", "nb_target": 1, "pa": 3, "cd": 0, "end_cd": "", "stat": [0], "description": "Réssuscite un allié mort"}]
});

console.log(usable_objects);
contenu_fichier = JSON.stringify(usable_objects, null, "\t");
fs.writeFileSync('usable_objects.json',contenu_fichier,'utf-8');

statics_objects.push ({
	"Nom": "Baton de Gandalf", 
	"image": "Gandalf.jpg",
	"Effect": [{"type": "Buff-Heal", "stat": "5"}],
	"Description": "Augmente les statistiques de Heal",				
});
console.log(statics_objects);
statics_objects.push ({
	"Nom": "Senzu",
	"image": "senzu.jpg",
	"Effect": [{"type": "Max_Heal", "stat": ""}],
	"Description": "Redonne tout ses points de vie à l'allié le plus endommagé",				
});

statics_objects.push ({
	"Nom": "Botte de Nain",
	"image": "Boots.jpg",
	"Effect": [{"type": "Buff_PA", "stat": "1"}],
	"Description": "Augmente les PA d'un allié au hasard",				
});

statics_objects.push ({
	"Nom": "Deuillegivre",
	"image": "Deuillegivre.jpg",
	"Effect": [{"type": "Buff_Dps", "stat": "5"}],
	"Description": "Augmente les statistiques d'une attaque DPS",				
});

statics_objects.push ({
	"Nom": "Glaive de Kratos",
	"image": "Kratos.jpg",
	"Effect": [{"type": "Buff_Dps", "stat": "4"}],
	"Description": "Augmente les statistiques d'une attaque DPS",				
});

statics_objects.push ({
	"Nom": "Benediction de Melitele", 
	"image": "Melitele.png",
	"Effect": [{"type": "Max_Heal", "stat": ""}],
	"Description": "Rends tous les pv à tous les heros",				
}); 

statics_objects.push ({
	"Nom": "Sagesse de Thrall",
	"image": "Thrall.jpg",
	"Effect": [{"type": "Buff_cd", "stat": "2"}],
	"Description": "Baisse le coup en PA d'une compètences au hasard",				
});

contenu_fichier = JSON.stringify(statics_objects, null, "\t");
fs.writeFileSync('statics_objects.json',contenu_fichier,'utf-8');
