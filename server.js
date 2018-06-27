var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var states = require('./livingWageStates');

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  url = 'http://livingwage.mit.edu';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

	  var desiredStates = ["Delaware", "Hawaii"];
	  var results =[];
      
	  var resultsToDisplay = [];
	  
	  
	  
	  $('.states').children('div').children('li').children('a').each(function(i, elm) {	

			var data = $(this);
			
			if(desiredStates.includes(data.text().trim())){
				var state = data.text().trim();
				var newUrl = url + data.attr("href");
				console.log(state + " about to go to " + newUrl);
				states.processStateHTML(state, newUrl);
				//resultsToDisplay.push(results);	
			
				
			};
			

			
			
			
		});
	  
	 /*
      $('.states list-unstyled row').filter(function(){
        var data = $(this);
        title = data.children().first().text().trim();
        //release = data.children().last().children().last().text().trim();

        //json.title = title;
        //json.release = release;
      })
		
	
		resultsToDisplay.sort(function(a, b) {
		return parseFloat(a.livingWageAmt) - parseFloat(b.livingWageAmt);
		});
   */
    }

    //fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
     // console.log('File successfully written! - Check your project directory for the output.json file');
    //})
	//console.log(resultsToDisplay);
    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;