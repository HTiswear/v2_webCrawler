const express = require('express');
const fs      = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app     = express();
var counties = require('./livingWageCounties');


exports.processStateHTML = async function (inState, url){
	var resultsToDisplay = [];
	var newUrl;
	var results = {};
	
		 request(url, function(error, response, html){
			if(!error){
				  var $ = cheerio.load(html);
				  //var results ={};
								  
				  $('.counties').children('div').children('li').children('a').each(function(i, elm) {			

							var data = $(this);
							var county = data.text().trim();
							var newUrl = 'http://livingwage.mit.edu' + data.attr("href");
							//counties.processCountyHTML(inState, county, newUrl);
							setTimeout(function(){
									  processCountyHTML(inState, county, newUrl);
									}, 3000);
							//resultsToDisplay.push(results);																					
					
						
					});	   
			}
	  })


	
};

function processCountyHTML (c_state, c_county, c_url){
	var state, county, livingWageAmt;
	var countyInfo = { state : "", county : "", livingWageAmt : ""};
	var myJSON;
	
	 request(c_url, function(error, response, html){
		if(!error){
			  var $ = cheerio.load(html);
     			  			  
			  var row = $('.expenses_table').find("tr[class='odd results']").find("td:nth-child(8)").text().trim();
			  //countyInfo.state = instate;
			  //countyInfo.county = incounty;
			  //countyInfo.livingWageAmt = row;	
			  stringtowrite = '\n' + c_state + ";" + c_county + ";" + row + ";";
			  fs.appendFile('livingwage.csv', stringtowrite , (err) => {  
					if (err) throw err;
					console.log('The file was updated!');
				});
			  
			  
		};
	});
   		
};