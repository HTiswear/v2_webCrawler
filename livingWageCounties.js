const express = require('express');
const fs      = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app     = express();


exports.processCountyHTML = function (instate, incounty, url){
	var state, county, livingWageAmt;
	var countyInfo = { state : "", county : "", livingWageAmt : ""};
	var myJSON;
	
	 request(url, function(error, response, html){
		if(!error){
			  var $ = cheerio.load(html);
     			  			  
			  var row = $('.expenses_table').find("tr[class='odd results']").find("td:nth-child(8)").text().trim();
			  countyInfo.state = instate;
			  countyInfo.county = incounty;
			  countyInfo.livingWageAmt = row;	
			  stringtowrite = '\n' + instate + "," + incounty + "," + row;
			  fs.appendFile('livingwage.txt', stringtowrite , (err) => {  
					if (err) throw err;
					console.log('The file was updated!');
				});
			  
			  
		};
	});
   		
};

