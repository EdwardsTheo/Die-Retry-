"use strict";

const fs = require("fs");

const traiter = function(p, marqueurs) { 

	if(p === 1){
    	marqueurs.niveau = "disabled";
        marqueurs.niveau2 = ""
    }else{
        marqueurs.niveau = "";
       	marqueurs.niveau2 = "disabled";
    }
};

module.exports = traiter;

