/*app.factory('UserPosts', function($http, $localStorage) {
    return $http.get('/e8oada3z/get_author_posts/?id=' + $localStorage.UserMeta.id + '&post_type=product');
 });
 
 app.factory('UserPostsProfile', function($http, $rootScope, $stateParams) {
    return $http.get('/e8oada3z/get_author_posts_profile/?id=' + $stateParams.profileID + '&post_type=product');
 }); 
 
app.factory('GetPost', function($http, $rootScope) {
    return $http.get('/e8oada3z/get_post/?id=' + $rootScope.visit_post_id + '&post_type=product');
 });*/ 
 
app.factory('ImageDataGeneral', function($http) {
    return $http.get('/e8oada3z/get_posts/?post_type=product');
 });
 
/*app.factory('ItemSearch', function($http, $scope) {
    return $http.get('/e8oada3z/get_search_results/?search=' + encodeURIComponent($scope.searchterm) + '&post_type=product');
 });*/
 
app.factory('Urls', function($localStorage) {
	
  // Generating the keys START
  
			var text1 = "";
			  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		  
			  for( var i=0; i < 16; i++ )
				  text1 += possible.charAt(Math.floor(Math.random() * possible.length));
		  
			  var OauthKey = text1;
		  
		  
			  var text2 = "";
			  var possible2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		  
			  for( var i=0; i < 6; i++ )
				  text2 += possible2.charAt(Math.floor(Math.random() * possible2.length));
			  
			  var Nonce = text2;
		  
			  var Timestamp = new Date().getTime();
		  
  // Generating the keys END
		  
		  var httpMethod = 'POST',
			  url = '/wc-api/v2/products',
			  oauth_consumer_key = OauthKey,
			  oauth_nonce = Nonce,
			  oauth_timestamp = Timestamp,
			  oauth_signature_method = 'HMAC-SHA1',
			  oauth_version = '1.0',
			  par1 = '?fields=id',
		  
			  consumer_key = $localStorage.UserMeta.ck,
			  consumer_secret = $localStorage.UserMeta.cs,
			  // generates a RFC3986 encoded, BASE64 encoded HMAC-SHA1 hash
			  encodedSignature = oauthSignature.generate( httpMethod, url, oauth_consumer_key, oauth_nonce, oauth_timestamp, oauth_signature_method, oauth_version, $localStorage.UserMeta.ck, $localStorage.UserMeta.cs ),
			  // generates a BASE64 encode HMAC-SHA1 hash
			  signature = oauthSignature.generate( httpMethod, url, oauth_consumer_key, oauth_nonce, oauth_timestamp, oauth_signature_method, oauth_version, $localStorage.UserMeta.ck, $localStorage.UserMeta.cs, 
				  { encodeSignature: false});
		
			var	producturl = url + par1 +'&consumer_key='+ $localStorage.UserMeta.ck +'&consumer_secret='+ $localStorage.UserMeta.cs +'&oauth_consumer_key='+ oauth_consumer_key +'&oauth_signature_method='+ oauth_signature_method +'&oauth_timestamp='+ oauth_timestamp +'&oauth_nonce='+ oauth_nonce +'&oauth_signature='+ signature;
		
			var	posturl = '?consumer_key='+ $localStorage.UserMeta.ck +'&consumer_secret='+ $localStorage.UserMeta.cs +'&oauth_consumer_key='+ oauth_consumer_key +'&oauth_signature_method='+ oauth_signature_method +'&oauth_timestamp='+ oauth_timestamp +'&oauth_nonce='+ oauth_nonce +'&oauth_signature='+ signature;
			
			var service = {};

			service.GetProductUrl = function() {
				return producturl;
			}
			
			service.GetPostUrl = function() {
				return posturl;
			}
			
			return service;

});

app.factory('DeleteUrl', function($localStorage) {
	
	// Generating the keys START
	
	 var text1 = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	
		for( var i=0; i < 16; i++ )
			text1 += possible.charAt(Math.floor(Math.random() * possible.length));
	
		var OauthKey = text1;
	
	
		var text2 = "";
		var possible2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	
		for( var i=0; i < 6; i++ )
			text2 += possible2.charAt(Math.floor(Math.random() * possible2.length));
		
		var Nonce = text2;
	
	
		var Timestamp = new Date().getTime();
	
	// Generating the keys END
	
	var httpMethod = 'DELETE',
		url = '/wc-api/v2/products',
		oauth_consumer_key = OauthKey,
		oauth_nonce = Nonce,
		oauth_timestamp = Timestamp,
		oauth_signature_method = 'HMAC-SHA1',
		oauth_version = '1.0',
		var1 = '?force=false', // Delete something permenantly
	
		consumer_key = $localStorage.UserMeta.ck,
		consumer_secret = $localStorage.UserMeta.cs,
		// generates a RFC3986 encoded, BASE64 encoded HMAC-SHA1 hash
		encodedSignature = oauthSignature.generate( httpMethod, url, oauth_consumer_key, oauth_nonce, oauth_timestamp, oauth_signature_method, oauth_version, $localStorage.UserMeta.ck, $localStorage.UserMeta.cs ),
		// generates a BASE64 encode HMAC-SHA1 hash
		signature = oauthSignature.generate( httpMethod, url, oauth_consumer_key, oauth_nonce, oauth_timestamp, oauth_signature_method, oauth_version, $localStorage.UserMeta.ck, $localStorage.UserMeta.cs, 
			{ encodeSignature: false});
	
		deleteurl = '/' + var1 + '&consumer_key='+ $localStorage.UserMeta.ck +'&consumer_secret='+ $localStorage.UserMeta.cs +'&oauth_consumer_key='+ oauth_consumer_key +'&oauth_signature_method='+ oauth_signature_method +'&oauth_timestamp='+ oauth_timestamp +'&oauth_nonce='+ oauth_nonce +'&oauth_signature='+ signature;
		
	var service = {};
	
	  service.GetDeleteUrl = function() {
		  return deleteurl;
	  }
			
		  return service;	
});

app.factory('WcApiUrl', function($localStorage) {

	// Generating the keys START
	
	 var text1 = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	
		for( var i=0; i < 16; i++ )
			text1 += possible.charAt(Math.floor(Math.random() * possible.length));
	
		var OauthKey = text1;
	
	
		var text2 = "";
		var possible2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	
		for( var i=0; i < 6; i++ )
			text2 += possible2.charAt(Math.floor(Math.random() * possible2.length));
		
		var Nonce = text2;
	
	
		var Timestamp = new Date().getTime();
	
	// Generating the keys END
	
	var httpMethod = 'GET',
		oauth_consumer_key = OauthKey,
		oauth_nonce = Nonce,
		oauth_timestamp = Timestamp,
		oauth_signature_method = 'HMAC-SHA1',
		oauth_version = '1.0',
		consumer_key = $localStorage.UserMeta.ck,
		consumer_secret = $localStorage.UserMeta.cs,
		// generates a RFC3986 encoded, BASE64 encoded HMAC-SHA1 hash
		encodedSignature = oauthSignature.generate( httpMethod, oauth_consumer_key, oauth_nonce, oauth_timestamp, oauth_signature_method, oauth_version, $localStorage.UserMeta.ck, $localStorage.UserMeta.cs ),
		// generates a BASE64 encode HMAC-SHA1 hash
		signature = oauthSignature.generate( httpMethod, oauth_consumer_key, oauth_nonce, oauth_timestamp, oauth_signature_method, oauth_version, $localStorage.UserMeta.ck, $localStorage.UserMeta.cs, 
			{ encodeSignature: false});
	
		generalurl = '?consumer_key=' + $localStorage.UserMeta.ck + '&consumer_secret=' + $localStorage.UserMeta.cs + '&oauth_consumer_key=' + oauth_consumer_key + '&oauth_signature_method=' + oauth_signature_method + '&oauth_timestamp=' + oauth_timestamp +'&oauth_nonce=' + oauth_nonce + '&oauth_signature=' + signature;
		
	var service = {};
	
	  service.GetGeneralUrl = function() {
		  return generalurl;
	  }
			
		  return service;		
	
});

app.factory('Categories', function() {
	
unis = {
    "product_categories": [
        {
            "id": 387,
            "name": "Aberystwyth University",
            "slug": "aberystwyth-university",
            "parent": 0,
            "description": "",
            "count": 0
        },
        {
            "id": 27,
            "name": "Anglia Ruskin University, Cambridge",
            "slug": "anglia-ruskin-university-cambridge",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 28,
            "name": "Aston University, Birmingham",
            "slug": "aston-university-birmingham",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 30,
            "name": "Bangor University",
            "slug": "bangor-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 31,
            "name": "Bath Spa University",
            "slug": "bath-spa-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 32,
            "name": "Birkbeck, University of London",
            "slug": "birkbeck-university-of-london",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 33,
            "name": "Birmingham City University",
            "slug": "birmingham-city-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 34,
            "name": "Birmingham Conservatoire",
            "slug": "birmingham-conservatoire",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 35,
            "name": "Bishop Grosseteste University",
            "slug": "bishop-grosseteste-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 36,
            "name": "Bournemouth University",
            "slug": "bournemouth-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 29,
            "name": "BPP University",
            "slug": "bpp-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 37,
            "name": "Brighton and Sussex Medical School",
            "slug": "brighton-and-sussex-medical-school",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 38,
            "name": "Brunel University, Uxbridge and London",
            "slug": "brunel-university-uxbridge-and-london",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 39,
            "name": "Buckinghamshire New University, High Wycombe",
            "slug": "buckinghamshire-new-university-high-wycombe",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 40,
            "name": "Camberwell College of Arts",
            "slug": "camberwell-college-of-arts",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 41,
            "name": "Camborne School of Mines",
            "slug": "camborne-school-of-mines",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 42,
            "name": "Canterbury Christ Church University, Canterbury, Thanet, Tunbridge Wells and Chatham",
            "slug": "canterbury-christ-church-university-canterbury-thanet-tunbridge-wells-and-chatham",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 43,
            "name": "Cardiff International Academy of Voice",
            "slug": "cardiff-international-academy-of-voice",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 44,
            "name": "Cardiff Metropolitan University (UWIC)",
            "slug": "cardiff-metropolitan-university-uwic",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 45,
            "name": "Cardiff University",
            "slug": "cardiff-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 46,
            "name": "Cardiff University School of Medicine",
            "slug": "cardiff-university-school-of-medicine",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 47,
            "name": "Cass Business School",
            "slug": "cass-business-school",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 48,
            "name": "Central Saint Martins College of Art and Design",
            "slug": "central-saint-martins-college-of-art-and-design",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 49,
            "name": "Central School of Speech and Drama",
            "slug": "central-school-of-speech-and-drama",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 50,
            "name": "Chelsea College of Art and Design",
            "slug": "chelsea-college-of-art-and-design",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 51,
            "name": "City Law School",
            "slug": "city-law-school",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 52,
            "name": "City University London",
            "slug": "city-university-london",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 53,
            "name": "Courtauld Institute of Art",
            "slug": "courtauld-institute-of-art",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 54,
            "name": "Coventry University",
            "slug": "coventry-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 55,
            "name": "Cranfield University, Cranfield, Shrivenham and Silsoe",
            "slug": "cranfield-university-cranfield-shrivenham-and-silsoe",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 56,
            "name": "Dartington College of Arts",
            "slug": "dartington-college-of-arts",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 57,
            "name": "De Montfort University, Leicester",
            "slug": "de-montfort-university-leicester",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 58,
            "name": "Durham University, Durham and Stockton-on-Tees (Queen's Campus)",
            "slug": "durham-university-durham-and-stockton-on-tees-queens-campus",
            "parent": 381,
            "description": "",

            "count": 0
        },
        {
            "id": 59,
            "name": "Eastman Dental Institute",
            "slug": "eastman-dental-institute",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 60,
            "name": "Edge Hill University, Ormskirk, Lancashire",
            "slug": "edge-hill-university-ormskirk-lancashire",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 61,
            "name": "Edinburgh Napier University",
            "slug": "edinburgh-napier-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 62,
            "name": "Falmouth University",
            "slug": "falmouth-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 63,
            "name": "Glasgow Caledonian University",
            "slug": "glasgow-caledonian-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 64,
            "name": "Glyndwr University, Wrexham",
            "slug": "glyndwr-university-wrexham",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 65,
            "name": "Goldsmiths, University of London",
            "slug": "goldsmiths-university-of-london",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 66,
            "name": "Harper Adams University, Newport, Shropshire",
            "slug": "harper-adams-university-newport-shropshire",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 67,
            "name": "Heriot-Watt University, Edinburgh and Galashiels",
            "slug": "heriot-watt-university-edinburgh-and-galashiels",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 68,
            "name": "Heythrop College",
            "slug": "heythrop-college",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 69,
            "name": "Hull York Medical School (HYMS)",
            "slug": "hull-york-medical-school-hyms",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 71,
            "name": "Imperial College at Wye",
            "slug": "imperial-college-at-wye",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 70,
            "name": "Imperial College London",
            "slug": "imperial-college-london",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 72,
            "name": "Institute for the Study of the Americas",
            "slug": "institute-for-the-study-of-the-americas",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 73,
            "name": "Institute of Advanced Legal Studies",
            "slug": "institute-of-advanced-legal-studies",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 74,
            "name": "Institute of Archaeology",
            "slug": "institute-of-archaeology",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 75,
            "name": "Institute of Cancer Research",
            "slug": "institute-of-cancer-research",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 76,
            "name": "Institute of Child Health",
            "slug": "institute-of-child-health",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 77,
            "name": "Institute of Classical Studies",
            "slug": "institute-of-classical-studies",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 78,
            "name": "Institute of Commonwealth Studies",
            "slug": "institute-of-commonwealth-studies",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 79,
            "name": "Institute of Education",
            "slug": "institute-of-education",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 80,
            "name": "Institute of English Studies",
            "slug": "institute-of-english-studies",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 81,
            "name": "Institute of Germanic &amp; Romance Studies",
            "slug": "institute-of-germanic-romance-studies",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 82,
            "name": "Institute of Historical Research",
            "slug": "institute-of-historical-research",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 83,
            "name": "Institute of Musical Research",
            "slug": "institute-of-musical-research",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 84,
            "name": "Institute of Neurology",
            "slug": "institute-of-neurology",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 85,
            "name": "Institute of Philosophy",
            "slug": "institute-of-philosophy",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 86,
            "name": "Institute of Psychiatry (IOP)",
            "slug": "institute-of-psychiatry-iop",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 87,
            "name": "Keele University, Staffordshire",
            "slug": "keele-university-staffordshire",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 88,
            "name": "King's College London",
            "slug": "kings-college-london",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 89,
            "name": "Kingston University",
            "slug": "kingston-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 90,
            "name": "Lancaster University",
            "slug": "lancaster-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 91,
            "name": "Leeds Metropolitan University",
            "slug": "leeds-metropolitan-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 92,
            "name": "Leeds Trinity University, Horsforth, Leeds",
            "slug": "leeds-trinity-university-horsforth-leeds",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 93,
            "name": "Liverpool Hope University",
            "slug": "liverpool-hope-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 94,
            "name": "Liverpool John Moores University",
            "slug": "liverpool-john-moores-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 95,
            "name": "Liverpool School of Tropical Medicine",
            "slug": "liverpool-school-of-tropical-medicine",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 96,
            "name": "London Business School",
            "slug": "london-business-school",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 97,
            "name": "London College of Communication",
            "slug": "london-college-of-communication",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 98,
            "name": "London College of Fashion",
            "slug": "london-college-of-fashion",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 99,
            "name": "London College of Music",
            "slug": "london-college-of-music",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 100,
            "name": "London Metropolitan University",
            "slug": "london-metropolitan-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 101,
            "name": "London School of Economics and Political Science (LSE)",
            "slug": "london-school-of-economics-and-political-science-lse",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 102,
            "name": "London School of Hygiene and Tropical Medicine",
            "slug": "london-school-of-hygiene-and-tropical-medicine",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 103,
            "name": "London South Bank University",
            "slug": "london-south-bank-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 104,
            "name": "Loughborough University",
            "slug": "loughborough-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 105,
            "name": "Manchester Metropolitan University",
            "slug": "manchester-metropolitan-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 106,
            "name": "Middlesex University, London",
            "slug": "middlesex-university-london",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 107,
            "name": "Newcastle University",
            "slug": "newcastle-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 108,
            "name": "Newman University, Birmingham",
            "slug": "newman-university-birmingham",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 109,
            "name": "Northumbria University, Newcastle upon Tyne",
            "slug": "northumbria-university-newcastle-upon-tyne",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 110,
            "name": "Norwich University of the Arts",
            "slug": "norwich-university-of-the-arts",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 111,
            "name": "Nottingham Trent University",
            "slug": "nottingham-trent-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 220,
            "name": "Other",
            "slug": "other-uni",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 112,
            "name": "Oxford Brookes University",
            "slug": "oxford-brookes-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 113,
            "name": "Queen Margaret University, Edinburgh",
            "slug": "queen-margaret-university-edinburgh",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 114,
            "name": "Queen Mary, University of London",
            "slug": "queen-mary-university-of-london",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 115,
            "name": "Queen's University Belfast",
            "slug": "queens-university-belfast",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 116,
            "name": "Roehampton University, London",
            "slug": "roehampton-university-london",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 117,
            "name": "Royal Academy of Music",
            "slug": "royal-academy-of-music",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 118,
            "name": "Royal Agricultural University, Cirencester",
            "slug": "royal-agricultural-university-cirencester",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 119,
            "name": "Royal College of Art, London",
            "slug": "royal-college-of-art-london",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 120,
            "name": "Royal College of Nursing Institute",
            "slug": "royal-college-of-nursing-institute",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 121,
            "name": "Royal Holloway, University of London, Egham",
            "slug": "royal-holloway-university-of-london-egham",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 122,
            "name": "Royal School of Mines",
            "slug": "royal-school-of-mines",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 123,
            "name": "Royal Veterinary College",
            "slug": "royal-veterinary-college",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 124,
            "name": "School of Advanced Study",
            "slug": "school-of-advanced-study",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 125,
            "name": "School of Oriental and African Studies (SOAS)",
            "slug": "school-of-oriental-and-african-studies-soas",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 126,
            "name": "School of Pharmacy, University of London",
            "slug": "school-of-pharmacy-university-of-london",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 127,
            "name": "School of Slavonic and East European Studies (SSEES)",
            "slug": "school-of-slavonic-and-east-european-studies-ssees",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 128,
            "name": "Sheffield Hallam University",
            "slug": "sheffield-hallam-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 129,
            "name": "Southampton Solent University",
            "slug": "southampton-solent-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 130,
            "name": "St George's, University of London",
            "slug": "st-georges-university-of-london",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 131,
            "name": "St Mary's University College",
            "slug": "st-marys-university-college",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 132,
            "name": "St Salvator's Quad at the University of St Andrews",
            "slug": "st-salvators-quad-at-the-university-of-st-andrews",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 133,
            "name": "Staffordshire University, Stoke-on-Trent, Stafford and Lichfield",
            "slug": "staffordshire-university-stoke-on-trent-stafford-and-lichfield",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 134,
            "name": "Stranmillis University College",
            "slug": "stranmillis-university-college",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 135,
            "name": "Swansea Metropolitan University",
            "slug": "swansea-metropolitan-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 136,
            "name": "Swansea University",
            "slug": "swansea-university",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 137,
            "name": "Teesside University, Middlesbrough and Darlington",
            "slug": "teesside-university-middlesbrough-and-darlington",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 138,
            "name": "The Arts University Bournemouth",
            "slug": "the-arts-university-bournemouth",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 139,
            "name": "The Founder's Building of Royal Holloway",
            "slug": "the-founders-building-of-royal-holloway",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 140,
            "name": "The Open University, Milton Keynes",
            "slug": "the-open-university-milton-keynes",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 141,
            "name": "The Radcliffe Camera, University of Oxford",
            "slug": "the-radcliffe-camera-university-of-oxford",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 142,
            "name": "The Robert Gordon University, Aberdeen",
            "slug": "the-robert-gordon-university-aberdeen",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 143,
            "name": "University Centre at Blackburn College, Blackburn",
            "slug": "university-centre-at-blackburn-college-blackburn",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 144,
            "name": "University College Birmingham",
            "slug": "university-college-birmingham",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 145,
            "name": "University College London (UCL)",
            "slug": "university-college-london-ucl",
            "parent": 381,
            "description": "",

            "count": 0
        },
        {
            "id": 147,
            "name": "University for the Creative Arts, Canterbury, Epsom, Farnham, Maidstone and Rochester",
            "slug": "university-for-the-creative-arts-canterbury-epsom-farnham-maidstone-and-rochester",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 146,
            "name": "University Marine Biological Station, Millport",
            "slug": "university-marine-biological-station-millport",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 148,
            "name": "University of Aberdeen",
            "slug": "university-of-aberdeen",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 149,
            "name": "University of Abertay Dundee",
            "slug": "university-of-abertay-dundee",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 150,
            "name": "University of Bath",
            "slug": "university-of-bath",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 151,
            "name": "University of Bedfordshire, Luton and Bedford",
            "slug": "university-of-bedfordshire-luton-and-bedford",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 152,
            "name": "University of Birmingham",
            "slug": "university-of-birmingham",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 153,
            "name": "University of Bolton",
            "slug": "university-of-bolton",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 154,
            "name": "University of Bradford",
            "slug": "university-of-bradford",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 155,
            "name": "University of Brighton",
            "slug": "university-of-brighton",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 156,
            "name": "University of Bristol",
            "slug": "university-of-bristol",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 157,
            "name": "University of Buckingham",
            "slug": "university-of-buckingham",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 158,
            "name": "University of Cambridge",
            "slug": "university-of-cambridge",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 159,
            "name": "University of Central Lancashire, Preston and Burnley",
            "slug": "university-of-central-lancashire-preston-and-burnley",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 160,
            "name": "University of Chester, Chester and Warrington",
            "slug": "university-of-chester-chester-and-warrington",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 161,
            "name": "University of Chichester",
            "slug": "university-of-chichester",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 162,
            "name": "University of Cumbria, Carlisle (main campus), Penrith and Ambleside",

            "slug": "university-of-cumbria-carlisle-main-campus-penrith-and-ambleside",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 163,
            "name": "University of Derby",
            "slug": "university-of-derby",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 164,
            "name": "University of Dundee",
            "slug": "university-of-dundee",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 165,
            "name": "University of East Anglia, Norwich",
            "slug": "university-of-east-anglia-norwich",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 166,
            "name": "University of East London",
            "slug": "university-of-east-london",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 167,
            "name": "University of East London School of Law",
            "slug": "university-of-east-london-school-of-law",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 168,
            "name": "University of Edinburgh",
            "slug": "university-of-edinburgh",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 169,
            "name": "University of Essex, Colchester and Southend-on-Sea",
            "slug": "university-of-essex-colchester-and-southend-on-sea",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 170,
            "name": "University of Exeter",
            "slug": "university-of-exeter",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 171,
            "name": "University of Glasgow",
            "slug": "university-of-glasgow",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 172,
            "name": "University of Gloucestershire, Cheltenham, Gloucester and London",
            "slug": "university-of-gloucestershire-cheltenham-gloucester-and-london",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 173,
            "name": "University of Greenwich",
            "slug": "university-of-greenwich",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 174,
            "name": "University of Hertfordshire, Hatfield",
            "slug": "university-of-hertfordshire-hatfield",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 175,
            "name": "University of Huddersfield, Huddersfield &amp; Barnsley",
            "slug": "university-of-huddersfield-huddersfield-barnsley",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 176,
            "name": "University of Hull, Hull and Scarborough",
            "slug": "university-of-hull-hull-and-scarborough",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 177,
            "name": "University of Kent, Canterbury and Medway",
            "slug": "university-of-kent-canterbury-and-medway",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 178,
            "name": "University of Leeds",
            "slug": "university-of-leeds",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 179,
            "name": "University of Leicester",
            "slug": "university-of-leicester",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 180,
            "name": "University of Lincoln, Lincoln, Hull, Riseholme and Holbeach",
            "slug": "university-of-lincoln-lincoln-hull-riseholme-and-holbeach",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 181,
            "name": "University of Liverpool",
            "slug": "university-of-liverpool",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 182,
            "name": "University of London",
            "slug": "university-of-london",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 183,
            "name": "University of Manchester",
            "slug": "university-of-manchester",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 184,
            "name": "University of Northampton",
            "slug": "university-of-northampton",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 185,
            "name": "University of Nottingham",
            "slug": "university-of-nottingham",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 186,
            "name": "University of Oxford",
            "slug": "university-of-oxford",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 187,
            "name": "University of Plymouth",
            "slug": "university-of-plymouth",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 188,
            "name": "University of Portsmouth",
            "slug": "university-of-portsmouth",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 189,
            "name": "University of Reading",
            "slug": "university-of-reading",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 190,
            "name": "University of Salford",
            "slug": "university-of-salford",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 191,
            "name": "University of Sheffield",
            "slug": "university-of-sheffield",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 192,
            "name": "University of South Wales",
            "slug": "university-of-south-wales",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 193,
            "name": "University of Southampton",
            "slug": "university-of-southampton",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 194,
            "name": "University of St Andrews",
            "slug": "university-of-st-andrews",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 195,
            "name": "University of St Mark &amp; St John, Plymouth",
            "slug": "university-of-st-mark-st-john-plymouth",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 196,
            "name": "University of Stirling, Bridge of Allan",
            "slug": "university-of-stirling-bridge-of-allan",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 197,
            "name": "University of Strathclyde",
            "slug": "university-of-strathclyde",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 198,
            "name": "University of Strathclyde, Glasgow",
            "slug": "university-of-strathclyde-glasgow",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 199,
            "name": "University of Sunderland",
            "slug": "university-of-sunderland",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 200,
            "name": "University of Surrey, Guildford",
            "slug": "university-of-surrey-guildford",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 201,
            "name": "University of Sussex, Falmer and Brighton",
            "slug": "university-of-sussex-falmer-and-brighton",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 213,
            "name": "University of the Arts London",
            "slug": "university-of-the-arts-london",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 214,
            "name": "University of the Highlands &amp; Islands, Inverness, Elgin, Perth",
            "slug": "university-of-the-highlands-islands-inverness-elgin-perth",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 215,
            "name": "University of the West of England, Bristol",
            "slug": "university-of-the-west-of-england-bristol",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 216,
            "name": "University of the West of Scotland, Paisley, Hamilton, Ayr &amp; Dumfries",
            "slug": "university-of-the-west-of-scotland-paisley-hamilton-ayr-dumfries",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 202,
            "name": "University of Ulster, Belfast",
            "slug": "university-of-ulster-belfast",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 203,
            "name": "University of Ulster, Coleraine, Jordanstown, Magee and Belfast",
            "slug": "university-of-ulster-coleraine-jordanstown-magee-and-belfast",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 204,
            "name": "University of Wales",
            "slug": "university-of-wales",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 205,
            "name": "University of Wales, Trinity Saint David",
            "slug": "university-of-wales-trinity-saint-david",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 206,
            "name": "University of Warwick, Coventry",
            "slug": "university-of-warwick-coventry",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 207,
            "name": "University of West London, Ealing and Brentford",
            "slug": "university-of-west-london-ealing-and-brentford",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 208,
            "name": "University of Westminster, London",
            "slug": "university-of-westminster-london",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 209,
            "name": "University of Winchester",
            "slug": "university-of-winchester",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 210,
            "name": "University of Wolverhampton",
            "slug": "university-of-wolverhampton",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 211,
            "name": "University of Worcester",
            "slug": "university-of-worcester",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 212,
            "name": "University of York",
            "slug": "university-of-york",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 217,
            "name": "Warburg Institute",
            "slug": "warburg-institute",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 218,
            "name": "Wimbledon College of Art",
            "slug": "wimbledon-college-of-art",
            "parent": 381,
            "description": "",
            "count": 0
        },
        {
            "id": 219,
            "name": "York St John University",
            "slug": "york-st-john-university",
            "parent": 381,
            "description": "",
            "count": 0
        }
    ]
}

	var service = {};
	
	  service.GetUnis = function() {
		  return unis;
	  }
			
		  return service;		
	
});

app.factory('Courses', function() {
	
courses = {
    "course_list": [
        {
            "id": 1,
            "name": "Accounting, Business & Finance"
        },
        {
            "id": 2,
            "name": "Advertising"
        },
        {
            "id": 3,
            "name": "Agriculture and Horticulture"
        },
        {
            "id": 4,
            "name": "Archaeology"
        },
        {
            "id": 5,
            "name": "Architecture, Building & Planning"
        },
        {
            "id": 6,
            "name": "Art and design"
        },
        {
            "id": 7,
            "name": "Biology"
        },
        {
            "id": 8,
            "name": "Chemistry"
        },
        {
            "id": 9,
            "name": "Communication"
        },
        {
            "id": 10,
            "name": "Computing & IT"
        },
        {
            "id": 11,
            "name": "Dentistry"
        },
        {
            "id": 12,
            "name": "Earth Sciences"
        },
        {
            "id": 13,
            "name": "Education"
        },
        {
            "id": 14,
            "name": "Engineering"
        },
        {
            "id": 15,
            "name": "English Language"
        },
        {
            "id": 16,
            "name": "English Literature"
        },
        {
            "id": 17,
            "name": "Fashion and textiles"
        },
        {
            "id": 18,
            "name": "Geography"
        },
        {
            "id": 19,
            "name": "Health and Medicine"
        },
        {
            "id": 20,
            "name": "History"
        },
        {
            "id": 21,
            "name": "Hospitality & Catering"
        },
        {
            "id": 22,
            "name": "Languages"
        },
        {
            "id": 23,
            "name": "Law"
        },
        {
            "id": 24,
            "name": "Management"
        },
        {
            "id": 25,
            "name": "Marketing"
        },
        {
            "id": 26,
            "name": "Mathematics"
        },
        {
            "id": 27,
            "name": "Media"
        },
        {
            "id": 28,
            "name": "Music"
        },
        {
            "id": 29,
            "name": "Nursing"
        },
        {
            "id": 30,
            "name": "Pharmacology"
        },
        {
            "id": 31,
            "name": "Philosophy"
        },
        {
            "id": 32,
            "name": "Physics"
        },
        {
            "id": 33,
            "name": "Politics"
        },
        {
            "id": 34,
            "name": "Psychology and Counselling"
        },
        {
            "id": 35,
            "name": "Publishing"
        },
        {
            "id": 36,
            "name": "Public Relations"
        },
        {
            "id": 37,
            "name": "Social Work"
        },
        {
            "id": 38,
            "name": "Sociology"
        },
        {
            "id": 39,
            "name": "Sports & Leisure"
        },
        {
            "id": 40,
            "name": "Theatre & Dramatic Arts"
        },
        {
            "id": 41,
            "name": "Theology & Religion"
        },
        {
            "id": 42,
            "name": "Travel and Tourism"
        },
        {
            "id": 43,
            "name": "Veterinary Medicine"
        },
        {
            "id": 44,
            "name": "Zoology"
        },
        {
            "id": 45,
            "name": "Other"
        }
   ]
}

	var service = {};
	
	  service.GetCourses = function() {
		  return courses;
	  }
			
		  return service;		
	
});