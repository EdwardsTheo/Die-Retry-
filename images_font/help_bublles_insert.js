// Tri à bubble
"use strict"

const bubble = function (nombres){
	let trouve;
	do{
	 trouve = false;
		for(let i = 1; i < nombres.length; i++){
			if(nombres[i-1] > nombres[i]){
				let o = nombres[i];
				nombres[i] = nombres[i-1];
				nombres[i-1] = o;
				trouve = true;
			}
		}
	}while(trouve === true);

	return nombres;
};

console.log(bubble([10,8,3,5]));

const insert = function (nombres, critere){
	
	let im;
	let max;
	let fin;
	let tmp;

	for(fin = nombres.length - 1; fin > 0; fin --){
		max = 0;

		for(let i = 1; i <= fin; i++){
			if(critere(nombres[max] < nombres[i])){
				im = 1;
			}
		}
		if(im !== fin){
			tmp = nombres[max];
			nombres[max] = nombres[fin];
			nombres[fin] = tmp;
		}
	}
	return nombres;
};
console.log(insert([10,8,3,5], function (a,b){
	return a < b;
}));

console.log(insert([1,2,3,4], function (a,b){
	return Math.random() < 0.5 ? true:false;
}));
