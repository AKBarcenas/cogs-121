const yelp = require('yelp-fusion');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	const clientId = 'KXC96infFDZ2iOOox_LLbg';
	const clientSecret = 'eP6r7DHPtsnfQp9DltHDuQyN4ENFk1y71E1VBWfXX0B9DjXAVeoeWctji0ECc58i';

	app.get('/yelp', function (req,res){
		console.log(req);
		var food = req.query.food;
		var longitude=req.query.longitude;
		var latitude=req.query.latitude;

		const searchRequest = {
		  term: food,
		  longitude: longitude,
		  latitude: latitude
		};

		console.log(food);

		yelp.accessToken(clientId, clientSecret).then(response => {
		  const client = yelp.client(response.jsonBody.access_token);
		  console.log("2");
		  client.search(searchRequest).then(response => {
		    const firstResult = response.jsonBody.businesses[0];
		    const prettyJson = JSON.stringify(firstResult, null, 4);
		    //console.log(prettyJson);
		    res.status(200).json(firstResult);
		  });
		}).catch(e => {
		  console.log(e);
		});
	});

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};