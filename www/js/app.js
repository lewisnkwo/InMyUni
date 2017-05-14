// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

/* http://ionicframework.com/docs/platform-customization/styling-angularjs.html */ 
var app = angular.module('todo', ['ionic', 'ionic.contrib.ui.cards', 'ngCordova', 'ngStorage', 'ngCordovaOauth', 'ngAnimate', 'permission', 'stripe.checkout', 'angular.css.injector' /* 'uiGmapgoogle-maps' , 'ngTagsInput', */])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
  });
});

app.run( ['$rootScope', '$state', '$stateParams',
	function ($rootScope,   $state,   $stateParams) {
		$rootScope.$state = $state.current.name; // the current state, which gets put into $rootScope
		$rootScope.$stateParams = $stateParams; // the URL of the state
	}
])

app.run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
    $state.previous = fromState;
  });

});

/*app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    var push = new Ionic.Push({
      "debug": true
    });

    push.register(function(token) {
      console.log("Device token:",token.token);
    });
  });
})*/

app.run(function ($rootScope, $state, $ionicPlatform) {
	
	$ionicPlatform.registerBackButtonAction(function (event) {
			
	 if ($state.current.name === "login") { // Log user out
	   navigator.app.exitApp();
	 } else if ($state.current.name === "sell") {	   
	   
	 } else {
	   navigator.app.backHistory();
	 }
	}, 100);
	
	$rootScope.goprevious = function() {
	  navigator.app.backHistory();
	};

});


app.run(function(Permission, $rootScope) {
  // Define anonymous role
  Permission.defineRole('anonymous', function (stateParams) {
	// If the returned value is *truthy* then the user has the role, otherwise they don't
	if ($rootScope.role == "anon") {
	  return true; // Is anonymous
	  console.log("User is logged out!");
	}
	return false;
  });
  
  Permission.defineRole('seller', function (stateParams) {
	// If the returned value is *truthy* then the user has the role, otherwise they don't
	if ($rootScope.role == "seller") {
	  return true; // Is Logged in
	  console.log("User is logged in!");
	}
	return false;
  });	    
  
}); 

app.config(function($httpProvider, $ionicConfigProvider) {
  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show')
        return config
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide')
        return response
      }
    }
  })
  
app.config(function($cordovaInAppBrowserProvider) {

  var defaultOptions = {
    location: 'no',
    clearcache: 'no',
    toolbar: 'no'
  };

  document.addEventListener(function () {

    $cordovaInAppBrowserProvider.setDefaultOptions(options)

  }, false);
});  

  $httpProvider.useApplyAsync(true);
  
  var isAndroid = ionic.Platform.isAndroid();
	if (isAndroid) {
   $ionicConfigProvider.scrolling.jsScrolling(false);
	} else {
	$ionicConfigProvider.scrolling.jsScrolling(true);		
	}

	$ionicConfigProvider.views.maxCache(0);
	
	$ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
	

})

app.run(function($rootScope, $ionicLoading) {
/*  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({template: '<ion-spinner class="spinner-energized"></ion-spinner> One Sec...'})
  })

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide()
  })*/
})

app.run(function($rootScope, $state) {

	$rootScope.platform = ionic.Platform.isAndroid() == true ? 'android' : 'ios';
	
	if ($rootScope.platform == 'android') {
	
		$rootScope.platform_android = true;
		
	} else {
		
		$rootScope.platform_android = false;
		
	}
	
	if ($rootScope.platform == 'ios') {
	
		$rootScope.platform_ios = true;
		
	} else {
		
		$rootScope.platform_ios = false;
		
	}	

	if ($state.current.name === 'explore' && $rootScope.role === 'seller') {
		
		$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams){ 
			event.preventDefault(); 
			// transitionTo() promise will be rejected with 
			// a 'transition prevented' error
		})
		
	}

})

app.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('signup', {
               url: '/signup',
				  data: {
					permissions: {
					  except: ['seller']
					}
				  }, 
                templateUrl: 'templates/signup.html'
            })
            .state('login', {
                url: '/login',
 				  data: {
					permissions: {
					  except: ['seller']
					}
				  }, 
                templateUrl: 'templates/login.html'
            })
            .state('forgotpassword', {
                url: '/forgotpassword',
				  data: {
					permissions: {
					  except: ['seller']
					}
				  }, 
                templateUrl: 'templates/forgotpassword.html'
            })
            .state('changepassword', {
                url: '/changepassword',
 				  data: {
					permissions: {
					  except: ['seller']
					}
				  }, 
                templateUrl: 'templates/changepassword.html'
            })
            .state('explore', {
                url: '/explore',
				controller: function($scope, $rootScope, $state, $stateParams) {
					// get the id
					$scope.id = $stateParams.profileID;
					if ($rootScope.role !== 'seller') {
 					$state.go('login');
					}
				},
/*				  data: {
					permissions: {
					  only: ['seller'],
          			  redirectTo: 'login'
					}
				  }, */
                templateUrl: 'templates/explore.html'
            })
            .state('myitems', {
                url: '/myitems',
/*				  data: {
					permissions: {
					  only: ['seller'],
          			  redirectTo: 'login'
					}
				  }, */
                templateUrl: 'templates/myitems.html'
            })
            .state('sell', {
                url: '/sell',
/*				  data: {
					permissions: {
					  only: ['seller'],
          			  redirectTo: 'login'
					}
				  }, */
                templateUrl: 'templates/sell.html'
            })
            .state('profile', {
                url: '/profile/:profileID',
				controller: function($scope, $stateParams) {
					// get the id
					$scope.id = $stateParams.profileID;
				},
/*				  data: {
					permissions: {
					  only: ['seller'],
          			  redirectTo: 'login'
					}
				  }, */
                templateUrl: 'templates/profile.html'
            })
            .state('exploregrid', {
                url: '/exploregrid',
/*				  data: {
					permissions: {
					  only: ['seller'],
          			  redirectTo: 'login'
					}
				  }, */
                templateUrl: 'templates/exploregridview.html'
            })
            .state('edititem', {
                url: '/edititem/:itemID',
				controller: function($scope, $stateParams) {
					// get the id
					$scope.id = $stateParams.itemID;
				},
/*				  data: {
					permissions: {
					  only: ['seller'],
          			  redirectTo: 'login'
					}
				  }, */
                templateUrl: 'templates/edititem.html'
            })
            .state('editprofile', {
                url: '/editprofile',
/*				  data: {
					permissions: {
					  only: ['seller'],
          			  redirectTo: 'login'
					}
				  }, */
                templateUrl: 'templates/editprofile.html'
            })
            .state('about', {
                url: '/about',
/*				  data: {
					permissions: {
					  only: ['seller'],
          			  redirectTo: 'login'
					}
				  }, */
                templateUrl: 'templates/about.html'
            })
            .state('itemsingle', {
                url: '/itemsingle/:postID',
				controller: function($scope, $stateParams) {
					// get the id
					$scope.id = $stateParams.postID;
				},
/*				  onExit: function(){
				  },
				  data: {
					permissions: {
					  only: ['seller'],
          			  redirectTo: 'login'
					}
				  }, */
                templateUrl: 'templates/item-single.html'
            })
            .state('search', {
                url: '/search',
/*				  data: {
					permissions: {
					  only: ['seller'],
          			  redirectTo: 'login'
					}
				  }, */
                templateUrl: 'templates/search.html'
            })
            .state('followers', {
                url: '/followers/:profileID',
				controller: function($scope, $stateParams) {
					// get the id
					$scope.id = $stateParams.profileID;
				},
/*				  data: {
					permissions: {
					  only: ['seller'],
          			  redirectTo: 'login'
					}
				  }, */
                templateUrl: 'templates/followers.html'
            })
            .state('following', {
                url: '/following/:profileID',
				controller: function($scope, $stateParams) {
					// get the id
					$scope.id = $stateParams.profileID;
				},
/*				  data: {
					permissions: {
					  only: ['seller'],
          			  redirectTo: 'login'
					}
				  }, */
                templateUrl: 'templates/following.html'
            })
            .state('view_ratings', {
                url: '/view_ratings/:profileID',
				controller: function($scope, $stateParams) {
					// get the id
					$scope.id = $stateParams.profileID;
				},
/*				  data: {
					permissions: {
					  only: ['seller'],
          			  redirectTo: 'login'
					}
				  }, */
                templateUrl: 'templates/view_ratings.html'
            })
            .state('dashboard', {
                url: '/dashboard/:profileID',
				controller: function($scope, $stateParams) {
					// get the id
					$scope.id = $stateParams.profileID;
				},
/*				  data: {
					permissions: {
					  only: ['seller'],
          			  redirectTo: 'login'
					}
				  }, */
                templateUrl: 'templates/dashboard.html'
            })
            .state('order', {
                url: '/order/:orderID',
				controller: function($scope, $stateParams) {
					// get the id
					$scope.id = $stateParams.orderID;
				},
/*				  data: {
					permissions: {
					  only: ['seller'],
          			  redirectTo: 'login'
					}
				  }, */
                templateUrl: 'templates/view_order.html'
            })
            .state('myorder', {
                url: '/order/myorders/:orderID',
				controller: function($scope, $stateParams) {
					// get the id
					$scope.id = $stateParams.orderID;
				},
/*				  data: {
					permissions: {
					  only: ['seller'],
          			  redirectTo: 'login'
					}
				  }, */
                templateUrl: 'templates/view_my_order.html'
            })	
            .state('payments', {
                url: '/dashboard/settings/payments/:profileID',
/*				  data: {
					permissions: {
					  only: ['seller'],
          			  redirectTo: 'login'
					}
				  }, */
                templateUrl: 'templates/settings-payments.html'
            })	
            .state('account', {
                url: '/dashboard/settings/account/:profileID',
/*				  data: {
					permissions: {
					  only: ['seller'],
          			  redirectTo: 'login'
					}
				  }, */
                templateUrl: 'templates/settings-account.html'
            })	
				 

		$urlRouterProvider.otherwise( function($injector) {
		  var $state = $injector.get("$state");
		  $state.go('login');
		});

    });

angular.module('app.filters', []).
  filter('striphtml', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
);

/*app.controller('NetworkCtrl', function($scope, $rootScope, $cordovaNetwork, $ionicPopup) {

  document.addEventListener("deviceready", function () {

    var type = $cordovaNetwork.getNetwork()

    var isOnline = $cordovaNetwork.isOnline()

    var isOffline = $cordovaNetwork.isOffline()


    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      var onlineState = networkState;
    })

    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
		
      var offlineState = networkState;
	  
	  if ($scope.goneoffline == false) {
	  
		$scope.goneoffline = true;
		
		var alertPopup = $ionicPopup.alert({
		  title: 'Your network connection is offline <i class="icon ion-alert popuplink"></i>',
		  template: 'Loading will not work properly from now on. Please reconnect.'
		});
		  alertPopup.then(function(res) {
			  
			  $scope.goneoffline = false;
		});	
	
	  } else {
		  
	  }
	
    });

  }, false);
  
});*/

app.controller("TheSideMenuCtrl", function ($scope, $ionicSideMenuDelegate) {
  $scope.OpenMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
});


app.controller("BarcodeCtrl", function($scope, $rootScope, $cordovaBarcodeScanner, $http, $ionicPopup) {
 
    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
		var barcode = imageData.text;
		
			if (!barcode) {
				
			  var alertPopup = $ionicPopup.alert({
					 title: "Couldn't find a Barcode",
					 template: "We couldn't find a barcode. Please try scanning the barcode again in the center of the scanning box."
				   });
				   alertPopup.then(function(res) {
				   });
				   $timeout(function() {
					alertPopup.close(); 
				 }, 7000);				
			
			} else {
		
				 $http.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + barcode + '&key=AIzaSyDFoK0a2ICXoFb8YGJauG_Ha6NSJgTUpBE').
						 success(function(data) {
								 	 
							bookdata = JSON.stringify(data);
							bookdatap = JSON.parse(bookdata);
							

				// Use to hide input field or not				
					$scope.isbncode = ( bookdatap.items[0].volumeInfo.industryIdentifiers[1].identifier || bookdatap.items[0].volumeInfo.industryIdentifiers[0].identifier ); 
					$scope.authors = bookdatap.items[0].volumeInfo.authors;
					$scope.publisher = bookdatap.items[0].volumeInfo.publisher;
					$scope.bookcover = bookdatap.items[0].volumeInfo.imageLinks.thumbnail;
					
					$rootScope.iteminfo = {
						title: bookdatap.items[0].volumeInfo.title,
						desc: bookdatap.items[0].volumeInfo.description,
						isbn: ( bookdatap.items[0].volumeInfo.industryIdentifiers[1].identifier || bookdatap.items[0].volumeInfo.industryIdentifiers[0].identifier ), // ISBN 10 or 13
						authors: bookdatap.items[0].volumeInfo.authors,
						publisher: bookdatap.items[0].volumeInfo.publisher,
						thumb: bookdatap.items[0].volumeInfo.imageLinks.thumbnail,
						preview: bookdatap.items[0].volumeInfo.previewLink						
					};		

					var alertPopup = $ionicPopup.alert({
						   title: 'Complete!',
						   template: 'Successfully scanned: <strong>' + bookdatap.items[0].volumeInfo.title + '</strong>'
						 });
						 alertPopup.then(function(res) {
						 });
						 $timeout(function() {
						  alertPopup.close(); 
					   }, 7000);	
				
				 });
				 
			}
  		 }),
		 function (error) {
          alert("Scanning failed: " + error);
      	} 
    };
		 	
});


app.controller('CardsCtrl', function($scope, $rootScope, $http, $ionicSwipeCardDelegate, $ionicSideMenuDelegate, $localStorage, $state, ImageDataGeneral, $ionicLoading, $ionicPopup) {
	
$scope.openMenu = function() {
	
	$ionicSideMenuDelegate.toggleLeft();
	
};
	
$scope.cardRefresh = function(index) {
	
	$ionicLoading.show({template: 'Refreshing items... <ion-spinner class="spinner-energized"></ion-spinner>'});
   
     $http.get('/e8oada3z/get_posts/?post_type=product&count=-1')
     .success(function(data) {
		 
		 $ionicLoading.hide();
	
		$scope.ImageDataGeneral_run = true;
		 
       $rootScope.dataforcards = data;
	   console.log($rootScope.dataforcards);
	   
		if ($rootScope.dataforcards.posts.length == 0) {
			
		
					var alertPopup = $ionicPopup.alert({
						title: 'Opps <i class="icon ion-alert popuplink"></i>',
						template: 'No items are available at the moment. Why not sell something?'
					});
						alertPopup.then(function(res) {
						$state.go('sell');
					});
			
		
		} else {
	   
// Create the Cards object
carddata = {nest: []};

			// Loop through the inmyuni products JSON hash and get the title, img, etc..
			for ( var i = 0; i < $rootScope.dataforcards.posts.length; i++) {
				
			var pidstring = JSON.stringify($rootScope.dataforcards.posts[i].id);
			var pidreplace = pidstring.replace(/['"]+/g, ''); // Remove quotes
				
			var titlestring = JSON.stringify($rootScope.dataforcards.posts[i].title);
			var titlereplace = titlestring.replace(/['"]+/g, ''); // Remove quotes
			
			var imagestring = JSON.stringify($rootScope.dataforcards.posts[i].imagefull);
			var imagereplace = imagestring.replace(/['"]+/g, ''); // Remove quotes
			
			var pricestring = JSON.stringify($rootScope.dataforcards.posts[i].price);
			var pricereplace = pricestring.replace(/['"]+/g, ''); // Remove quotes
			
			var authorstring = JSON.stringify($rootScope.dataforcards.posts[i].author.slug);
			var authorreplace = authorstring.replace(/['"]+/g, ''); // Remove quotes
			
			var author_id_string = JSON.stringify($rootScope.dataforcards.posts[i].author.id);
			var author_id_replace = author_id_string.replace(/['"]+/g, ''); // Remove quotes
			
			var unistring = JSON.stringify($rootScope.dataforcards.posts[i].taxonomy_product_cat[0].title);
			var unireplace = unistring.replace(/['"]+/g, ''); // Remove quotes
			
			var statusstring = JSON.stringify($rootScope.dataforcards.posts[i].item_status);
			var statusreplace = statusstring.replace(/['"]+/g, ''); // Remove quotes
				
			carddata.nest.push({
				"pid" : pidreplace,
				"title" : titlereplace,
				"img"  : imagereplace,
				"price"	: pricereplace,
				"uni" : unireplace,
				"author" : authorreplace,
				"author_id" : author_id_replace,
				"status" : statusreplace,
				"cardindex" : i
			}); 
			
//			console.log(carddata.nest);  
			
			} // END for loop
			
				$scope.cardinfo = carddata.nest;
				console.log($scope.cardinfo);
			
				  var cardTypes = $scope.cardinfo;
					
				  $rootScope.cards = Array.prototype.slice.call(cardTypes, 0, 0);
				
				  $scope.cardSwiped = function(index) {
					$scope.addCard();
				  };
				
				  $scope.cardDestroyed = function(index) {
					$scope.cards.splice(index, 1);
				  };
				
				  $scope.addCard = function() {
					var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
					newCard.id = Math.random();
					$scope.cards.push(angular.extend({}, newCard));
				  }  
	   
		$state.go($state.current, {}, {reload: true});
		
		}
     })
	 
}

var swipecounter = 0;

if ($scope.ImageDataGeneral_run === true) { // Prevent overwrite of $rootScope.dataforcards after refresh 
 
	return;
	
} else {
		
ImageDataGeneral.success(function(data) {
	
		$rootScope.dataforcards = data;
		   console.log($rootScope.dataforcards);
				  
		  // Create the Cards object
		  carddata = {nest: []};
		  
			  // Loop through the inmyuni products JSON hash and get the title, img, etc..
			  for ( var i = 0; i < $rootScope.dataforcards.posts.length; i++) {
				  
			  var pidstring = JSON.stringify($rootScope.dataforcards.posts[i].id);
			  var pidreplace = pidstring.replace(/['"]+/g, ''); // Remove quotes
				  
			  var titlestring = JSON.stringify($rootScope.dataforcards.posts[i].title);
			  var titlereplace = titlestring.replace(/['"]+/g, ''); // Remove quotes
			  
			  var imagestring = JSON.stringify($rootScope.dataforcards.posts[i].imagefull);
			  var imagereplace = imagestring.replace(/['"]+/g, ''); // Remove quotes
			  
			  var pricestring = JSON.stringify($rootScope.dataforcards.posts[i].price);
			  var pricereplace = pricestring.replace(/['"]+/g, ''); // Remove quotes
			  
			  var authorstring = JSON.stringify($rootScope.dataforcards.posts[i].author.slug);
			  var authorreplace = authorstring.replace(/['"]+/g, ''); // Remove quotes
			  
			  var author_id_string = JSON.stringify($rootScope.dataforcards.posts[i].author.id);
			  var author_id_replace = author_id_string.replace(/['"]+/g, ''); // Remove quotes
			  
			  var unistring = JSON.stringify($rootScope.dataforcards.posts[i].taxonomy_product_cat[0].title);
			  var unireplace = unistring.replace(/['"]+/g, ''); // Remove quotes
			  
			  var statusstring = JSON.stringify($rootScope.dataforcards.posts[i].item_status);
			  var statusreplace = statusstring.replace(/['"]+/g, ''); // Remove quotes
				  
			  carddata.nest.push({
				  "pid" : pidreplace,
				  "title" : titlereplace,
				  "img"  : imagereplace,
				  "price"	: pricereplace,
				  "uni" : unireplace,
				  "author" : authorreplace,
				  "author_id" : author_id_replace,
				  "status" : statusreplace,
				  "cardindex" : i
			  }); 
			  
				// console.log(carddata.nest);  
			  
			  } // END for loop
			  
				  $scope.cardinfo = carddata.nest;	
			  
					var cardTypes = $scope.cardinfo;
					  
					$rootScope.cards = Array.prototype.slice.call(cardTypes, 0, 0);
				  
					$scope.cardSwiped = function(index) {
					  $scope.addCard();
					  swipecounter++;
					  console.log(swipecounter);
					};
				  
					$scope.cardDestroyed = function(index) {
					  $scope.cards.splice(index, 1);
					  delete $localStorage.newCard;
					};
				  
					$scope.addCard = function() {
					  var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
					  newCard.id = Math.random();
					  $localStorage.newCard = newCard;
					  $scope.cards.push(angular.extend({}, newCard));
					}
				  
			}).error(function (data){
				
				$rootScope.$on('loading:hide', function() {
				  $ionicLoading.hide()
				})	  
								  
					  var alertPopup = $ionicPopup.alert({
						  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
						  template: 'We cannot load some items at the moment for some reason. We are currently looking into it. Please try again later.'
					  });
						  alertPopup.then(function(res) {
					  });
			
		});	// END $http
			
} // END $scope.ImageDataGeneral_run  

});

app.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  $scope.goAway = function() {
    var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
    card.swipe();
  };
});

/*app.controller("ProfileActionCtrl", function($scope, $ionicActionSheet, $timeout) {

 // Triggered on a button click, or some other target
 $scope.show = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<i class="icon ion-android-share" style="padding-right: 10px !important;"></i> Share' },
       { text: '<i class="icon ion-chevron-left" style="padding-right: 10px !important;"></i> Go Back' }
     ],
     destructiveText: '<i class="icon ion-heart-broken" style="padding-right: 10px !important;"></i> Delete Profile',
     titleText: 'Options',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       return true;
     }
   });

   $timeout(function() {
     hideSheet();
   }, 20000);

 };
});*/

app.controller('NewProductCtrl', function($scope, $rootScope, $http, $localStorage, $cordovaToast, $ionicScrollDelegate, Urls, Categories) {
	
$scope.unilist = Categories.GetUnis();
	
$rootScope.iteminfo = {
	title: '',
	price: '',
	desc: '',
	cat:  $localStorage.UserMeta.uni,
	isbn: '',
	authors: '',
	publisher: '',
	condition: '',
	local: false,
	national: false,
	preview: ''
};
	   
$scope.producturl = Urls.GetProductUrl();
$scope.posturl = Urls.GetPostUrl();

if ($rootScope.iteminfo.authors.includes(',')) {

    $scope.itemauthors = $rootScope.iteminfo.authors.split(",").join(",");

} else {
	
	$scope.itemauthors = $rootScope.iteminfo.authors;
	
}

$scope.newitem = function() {
		
	$scope.pjson = {
	  "product" : {
		"categories" : [
		  $scope.unilist.product_categories[$rootScope.iteminfo.cat].name
		],
		"regular_price" : $rootScope.iteminfo.price,
		"title" : $rootScope.iteminfo.title,
		"status" : "publish",
		"stock_quantity" : 1,
		"sold_individually" : true,
		"reviews_allowed" : false,
		"purchaseable" : true,
		"type" : "simple",
		"catalog_visibility" : "visible",
		"price" : $rootScope.iteminfo.price,
		"virtual" : false,
		"downloadable" : false,
		"short_description" : $rootScope.iteminfo.desc,
		"visible" : true,
		"backorders_allowed" : false,
		"in_stock" : true,
				"attributes": [
					{
						"name": "Isbn",
						"position": "0",
						"visible": false,
						"variation": false,
						"options": [
							$rootScope.iteminfo.isbn
						]
					},
					{
						"name": "Publisher",
						"position": "1",
						"visible": false,
						"variation": false,
						"options": [
							$rootScope.iteminfo.publisher
						]
					},
					{
						"name": "Authors",
						"position": "2",
						"visible": false,
						"variation": false,
						"options": [
							$scope.itemauthors
						]
					},
					{
						"name": "Condition",
						"position": "3",
						"visible": false,
						"variation": false,
						"options": [
							$rootScope.iteminfo.condition
						]
					},
					{
						"name": "Item Type",
						"position": "4",
						"visible": false,
						"variation": false,
						"options": [
							!$rootScope.iteminfo.isbn ? 'Product' : 'Book'
						]
					},
					{
						"name": "Sale Type",
						"position": "5",
						"visible": false,
						"variation": false,
						"options": [
							$rootScope.iteminfo.local === true ? 'Local' : null, $rootScope.iteminfo.national === true ? 'National' : null
						]
					},
					{
						"name": "Other Data",
						"position": "6",
						"visible": false,
						"variation": false,
						"options": [
							$rootScope.iteminfo.preview						
						]
					},					
				]
	  }
  
};

$scope.productjson = JSON.stringify($scope.pjson);
		
var req = {
 method: 'POST',
 url: $scope.producturl,
 headers: {
   'Content-Type': undefined
 },
 data: $scope.productjson,
}

$http(req)
	.success(function(data){
		
			$cordovaToast.showLongBottom('Item successfully added.');
			
			// Will continue to post items with the user ID '1' until I use a different consumer key and secret key.
			
			itemcallback = JSON.stringify(data);
			console.log(itemcallback);
			parseditem = JSON.parse(itemcallback);
			
			$localStorage.newproductid = parseditem.product.id;
			$ionicScrollDelegate.scrollTop(true);		
		})
		.error(function(){
					$rootScope.$broadcast('loading:hide');	
							
							var alertPopup = $ionicPopup.alert({
								title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
								template: 'Your image cannot be uploaded for some reason. Please try again later.'
							});
								alertPopup.then(function(res) {
									$state.go($state.current, {}, {reload: true});
							});
			});
	
};

/*if ($rootScope.usingfacebook != undefined && $rootScope.usingfacebook == true) {
	$scope.postToFacebook = true
} else {
	$scope.postToFacebook = false
}

if ($rootScope.usingtwitter != undefined && $rootScope.usingtwitter == true) {
	$scope.postToTwitter = true
} else {
	$scope.postToTwitter = false
}

 $scope.postTo = [
    { text: "Post to Facebook", checked: $scope.postToFacebook },
    { text: "Post to Twitter", checked: $scope.postToTwitter }
  ];
  
 $scope.sendToFacebook = function() {
	 
	// Post to Facebook  
	if ($scope.postTo[1].checked == true) {
		
		$rootScope.iteminfo.title;
		
	} else {
	
		return false;
		
	}

 }*/
	
});

app.controller('CameraCtrl', function($scope, $cordovaCamera, $localStorage) {

	$scope.takePicture = function() {
		
  var options = {
    quality : 75,
    destinationType : Camera.DestinationType.DATA_URL,
    sourceType : Camera.PictureSourceType.CAMERA,
    allowEdit : true,
    encodingType: Camera.EncodingType.JPEG,
    targetWidth: 720,
    targetHeight: 720,
    popoverOptions: CameraPopoverOptions,
    saveToPhotoAlbum: false
  };

  $cordovaCamera.getPicture(options).then(function(imageData) {
	$scope.imgURI = "data:image/jpeg;base64," + imageData;
	$localStorage.img64 = imageData;
  }, function(err) {
    alert ("An error occured: " + err);
  });
  
	}
	
	$scope.selectPicture = function() {
		
  var options = {
    quality : 75,
    destinationType : Camera.DestinationType.DATA_URL,
    sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
    allowEdit : true,
    encodingType: Camera.EncodingType.JPEG,
    targetWidth: 720,
    targetHeight: 720,
    popoverOptions: CameraPopoverOptions,
    saveToPhotoAlbum: false
  };

  $cordovaCamera.getPicture(options).then(function(imageData) {
	$scope.imgURI = "data:image/jpeg;base64," + imageData;
	$localStorage.img64 = imageData;
  }, function(err) {
    alert ("An error occured: " + err);
  });
  
	}

});

app.controller('UploadCtrl', function($scope, $rootScope, $http, $localStorage, $state, $cordovaToast, $ionicLoading) {

	$scope.uploadpic = function() {
	
	// Upload the image and attach to product
	
	basedata = $localStorage.img64;
	
	$ionicLoading.show({template: 'Uploading... <ion-spinner class="spinner-energized"></ion-spinner>'});
	
	$http({
		method: 'POST',
		url: '/iupload.php',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		transformRequest: function(obj) {
			var str = [];
			for(var p in obj)
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			return str.join("&");
		},
		data: {base64File: basedata, newitemid: $localStorage.newproductid, imageauthor: $rootScope.currentusermeta.id}
	}).success(function (data){
		$ionicLoading.hide();
		$cordovaToast.showLongBottom('Image uploaded successfully.');	
	
	//	alert(JSON.stringify(data));
		var attachmentdata = JSON.stringify(data);
		var pattachmentdata = JSON.parse(attachmentdata);
		$scope.attachimageid = pattachmentdata.imageid;
	//		alert($localStorage.attachimageid);
		$scope.attachimageurl = pattachmentdata.imageurl;
	// Set the new attachment as the product's featured image.
	
	var attachurl = '/wc-api/v2/products/' + $localStorage.newproductid + $scope.posturl;
	
	var attachjson = {
	  "product" : {
		"images" : [
		  {
			"position" : 0,
			"id" : $scope.attachimageid,
			"src" : $scope.attachimageurl
		  }
		 ]
	  }
	}
	
	var req = {
	 method: 'PUT',
	 url: attachurl,
	 headers: {
	   'Content-Type': undefined
	 },
	 data: attachjson,
	}
			
		$http(req)
		.success(function(data){
			
		delete $localStorage.newproductid;
		$state.go('myitems');
			})
			.error(function(data){
				
				$ionicLoading.hide();
				
				delete $localStorage.newproductid;
					$rootScope.$broadcast('loading:hide');	
							
							var alertPopup = $ionicPopup.alert({
								title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
								template: 'An error occured. Please try again later.'
							});
								alertPopup.then(function(res) {
											$state.go('myitems');
							});
				});
				
				
		}).error(function (data){
			
				$ionicLoading.hide();
			
					$rootScope.$broadcast('loading:hide');	
							
							var alertPopup = $ionicPopup.alert({
								title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
								template: 'An error occured. Please try again later.'
							});
								alertPopup.then(function(res) {
											$state.go('myitems');
							});
		});
		
	} // $scope.uploadpic END
	
});

app.controller('MyItemsCtrl', function($scope, $rootScope, $localStorage, $ionicPopup, $timeout, $http, $state, DeleteUrl, $cordovaToast, $ionicLoading) {
	
$scope.hidespinner = false;

$rootScope.myitemsindex = 0;
	
$scope.RefreshItems = function() {

	$http.get('/e8oada3z/get_author_posts/?id=' + $localStorage.UserMeta.id + '&post_type=product&count=-1').success(function(data){
	
		if ($localStorage.useritems !== undefined) {
			
			delete $localStorage.useritems;
			
			itemlist = JSON.stringify(data);
			$scope.useritems = JSON.parse(itemlist);
			$localStorage.useritems = $scope.useritems; // For sharing functionality
			console.log($localStorage.useritems);
			
			if ($scope.useritems.count !== undefined) {
				$rootScope.itemcount = $scope.useritems.count;
			} else {
				$rootScope.itemcount = 0; 
			}
			
		} else {
		
		$scope.hidespinner = true;
	
		   itemlist = JSON.stringify(data);
		   $scope.useritems = JSON.parse(itemlist);
		   $localStorage.useritems = $scope.useritems; // For sharing functionality
		   console.log($localStorage.useritems);
		   
			   if ($scope.useritems.count !== undefined) {
			   $rootScope.itemcount = $scope.useritems.count;
			   } else {
			   $rootScope.itemcount = 0; 
			   }
			   
		}
		   
	}).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
	
}

	$http.get('/e8oada3z/get_author_posts/?id=' + $localStorage.UserMeta.id + '&post_type=product&count=-1').success(function(data){
		
		if ($localStorage.useritems !== undefined) {
		
			delete $localStorage.useritems;
			
			$scope.hidespinner = true;
			
			itemlist = JSON.stringify(data);
			$scope.useritems = JSON.parse(itemlist);
			$localStorage.useritems = $scope.useritems; // For sharing functionality
			console.log($localStorage.useritems);
			
			if ($scope.useritems.count !== undefined) {
				$rootScope.itemcount = $scope.useritems.count;
			} else {
				$rootScope.itemcount = 0; 
			}
			
		} else {
		
		$scope.hidespinner = true;
	
		   itemlist = JSON.stringify(data);
		   $scope.useritems = JSON.parse(itemlist);
		   $localStorage.useritems = $scope.useritems; // For sharing functionality
		   console.log($localStorage.useritems);
		   
			   if ($scope.useritems.count !== undefined) {
			   $rootScope.itemcount = $scope.useritems.count;
			   } else {
			   $rootScope.itemcount = 0; 
			   }
			   
		}
		
	});	
  
$scope.producturl = DeleteUrl.GetDeleteUrl();

	$scope.hideitem = function(item, $index) {
		
		$scope.itemsid = $scope.useritems.posts[$index].id;
		
		$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=hideitem&userid=' + $localStorage.UserMeta.id + '&metakey=useritems&metavalue=' + $scope.itemsid).success(function(data) {
			
			$cordovaToast.showLongBottom('Item successfully hidden');
			
			$state.go($state.current, {}, {reload: true});
	
		}).error(function (data){	
		
			$rootScope.$broadcast('loading:hide');		

					var alertPopup = $ionicPopup.alert({
						title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
						template: 'Your item cannot be edited at the moment for some reason. We are working on it. Please try again later.'
					});
						alertPopup.then(function(res) {
							$state.go($state.current, {}, {reload: true});
					});

		});
		
	}
	
	$scope.unhideitem = function(item, $index) {
		
		$scope.itemsid = $scope.useritems.posts[$index].id;
		
		$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=unhideitem&userid=' + $localStorage.UserMeta.id + '&metakey=useritems&metavalue=' + $scope.itemsid).success(function(data) {
			
			$cordovaToast.showLongBottom('Item is currently live');
			
			$state.go($state.current, {}, {reload: true});
	
		}).error(function (data){	
		
			$rootScope.$broadcast('loading:hide');		

					var alertPopup = $ionicPopup.alert({
						title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
						template: 'Your item cannot be edited at the moment for some reason. We are working on it. Please try again later.'
					});
						alertPopup.then(function(res) {
							$state.go($state.current, {}, {reload: true});
					});

		});
		
	}

  $scope.del = function(item, $index) {

	$scope.myid = $scope.useritems.posts[$index].id;
	$scope.myitemname = $scope.useritems.posts[$index].title;
	  
	$scope.showConfirm = function() {
		 var confirmPopup = $ionicPopup.confirm({
		   title: 'Deleting this item',
		   template: 'Are you sure you want to delete <strong>' + $scope.myitemname + '</strong>?'
		 });
		 confirmPopup.then(function(res) {
		if(res) {
				   
			$ionicLoading.show({template: 'Deleting... <ion-spinner class="spinner-energized"></ion-spinner>'});
			var deletereq = '/wc-api/v2/products/' + $scope.myid + $scope.producturl;
		
			var req = {
			 method: 'DELETE',
			 url: deletereq,
			 headers: {
			   'Content-Type': undefined
			 },
			}

			$http(req).success(function(data){
				
				$ionicLoading.hide();
					
						var alertPopup = $ionicPopup.alert({
							   title: 'Success!',
							   template: $scope.myitemname +', has been successfully deleted!'
							 });
							 alertPopup.then(function(res) {
							 });
							 $timeout(function() {
							  alertPopup.close(); 
						   }, 7000);
							console.log(JSON.stringify(data));	
							$state.go($state.current, {}, {reload: true});	 
							  
							$http.get('/e8oada3z/get_author_posts/?id=' + $rootScope.currentusermeta.id + '&post_type=product&count=-1')
							 .success(function(data) {
							   $rootScope.userproducts = data;
							 })
							.error(function(){
								
								$ionicLoading.hide();
								
									$rootScope.$broadcast('loading:hide');	
											
											var alertPopup = $ionicPopup.alert({
												title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
												template: 'An error occured deleting this item. Please try again later.'
											});
												alertPopup.then(function(res) {
													$state.go($state.current, {}, {reload: true});
											});
							});
				
						})
						.error(function(data, status){
							
							$ionicLoading.hide();
							
									$rootScope.$broadcast('loading:hide');	
											
											var alertPopup = $ionicPopup.alert({
												title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
												template: 'An error occured deleting this item. Please try again later.'
											});
												alertPopup.then(function(res) {
													$state.go($state.current, {}, {reload: true});
											});
											
							});
						
					   } 
		
					 });
				   };
	
  };
  
  $scope.resetshare = function() {
	  
	// Since the popover card is only called once on pageload, I need to reinitiate each share when the share button is clicked

	var sharing_image = $localStorage.useritems.posts[$rootScope.myitemsindex].imagefull == 'img/noimage.png' ? 'https://inmyunimedia1.s3-eu-west-1.amazonaws.com/media/b148f6cd3c7a.png' : $localStorage.useritems.posts[$rootScope.myitemsindex].imagefull;
	
	var sharing_message = "Just saw '" + $localStorage.useritems.posts[$rootScope.myitemsindex].title + "' on the @inmyuni university app. Have a look:";

	var sharing_link = $localStorage.useritems.posts[$rootScope.myitemsindex].url.slice(0, - 1); 
	
	$rootScope.Share = {message: sharing_message, image: sharing_image, link: sharing_link};
	console.log($rootScope.Share);
	
  };
  
  $scope.shareitem = function(item, $index) {
	  
    $rootScope.myitemsindex = $index;
	console.log($localStorage.useritems.posts[$rootScope.myitemsindex].title);
  
  };

});

// Grid View 

app.directive('photoGrid', function() {

  function link(scope) {
    
    function load() {
    }


  }
  
  var directive = {
    link: link,
    scope: {
      photos: '='
    },
    templateUrl: 'templates/photo-grid.html',
    restrict: 'E'
  };
  
  return directive;
})

app.directive('photogridSearch', function() {

  function link(scope) {
    
    function load() {
    }

  }
  
  var directive = {
    link: link,
    scope: {
      photossearch: '='
    },
    templateUrl: 'templates/photo-grid-search.html',
    restrict: 'E'
  };
  
  return directive;
})

app.directive('profileGrid', function() {

  function link(scope) {
    
    function load() {
    }

  }
  
  var directive = {
    link: link,
    scope: {
      photos: '='
    },
    templateUrl: 'templates/photo-grid-profile.html',
    restrict: 'E'
  };
  
  return directive;
})


app.controller('PhotosCtrl', function($scope, $rootScope, $http, $ionicModal, $ionicPopover, $ionicPopup, $timeout, $state, ImageDataGeneral, $cordovaToast, $localStorage, $ionicLoading) {

$scope.RefreshItems = function() {

	$http.get('/e8oada3z/get_posts/?post_type=product').success(function(data){
		
		if($localStorage.photos) {
			delete $localStorage.photos	
		}
		
		$localStorage.photos = [];
		$rootScope.photos = $localStorage.photos;
		
		$rootScope.total_posts_available = data.count_total;
		$rootScope.page_number = 1;
		
		$scope.list_of_data = data.posts;
		
		$scope.iterate_until = data.posts.length >= 9 ? 9 : (data.posts.length - 1);
						
			for (var i = 0; i <= $scope.iterate_until; i++) {   
			   
			  $localStorage.photos.push($scope.list_of_data[i]);
			  
			}
			
			  console.log($localStorage.photos);	
			  console.log($localStorage.photos.length);		
		}).finally(function() {
		   // Stop the ion-refresher from spinning
		   $scope.$broadcast('scroll.refreshComplete');
		 });
	
}

$scope.getresults = function() {
	
	if (!$scope.searchterm.keyword) {	
		
		var alertPopup = $ionicPopup.alert({
			   title: 'Searching for ???',
			   template: 'Please enter a search term/keyword!'
			 });
			 alertPopup.then(function(res) {
			 });
			 $timeout(function() {
			  alertPopup.close(); 
		   }, 3000);	
	
	} else {
		
	$ionicLoading.show({template: '<ion-spinner class="spinner-energized"></ion-spinner> Searching...'})
		
	$http.get('/e8oada3z/get_search_results/?search=' + encodeURIComponent($scope.searchterm.keyword) + '&post_type=product&count=-1').
	  success(function(data) {
		
		$scope.hideitems = true;
		
		$ionicLoading.hide();
		  
		result = JSON.stringify(data);
		results = JSON.parse(result);
		
		if (results.count_total == 0) {		
		
			var alertPopup = $ionicPopup.alert({
				   title: 'Oh No!',
				   template: '<h3>Sorry, no items found. <i class="icon ion-sad popuplink"></i> Why not <a class="popuplink" ui-sref="sell">sell something?</a></h3>'
				 });
				 alertPopup.then(function(res) {
				 });
				 $timeout(function() {
				  alertPopup.close(); 
			   }, 7000);	
				
		} else {
		$scope.showresults = true;
		
		$scope.totalnumberresults = results.count_total;
		
		if (results.count_total == 1) {
			
			$scope.itemnoun = "item"
			
		} else {
			
			$scope.itemnoun = "items"
			
		}
		
		$cordovaToast.showLongBottom($scope.totalnumberresults + " " + $scope.itemnoun + " found");
		
	// Modal Stuff START	
		
		$scope.photossearch = data;
		
		$scope.getnewindex = function (index) {	
		$scope.searchindex = index;
		}
		
	  $ionicModal.fromTemplateUrl('templates/modals/item-view-more-search.html', {
		scope: $scope,
		animation: 'slide-in-up'
	  }).then(function(modal) {
		$scope.modal = modal;
	  });	
	  
	// Modal Stuff END		
		
		}
		
	  }) // end $http
		
	} 
  
} // end getresults

  $scope.populateList = function() {
	  
	  $rootScope.page_number++;
	  
	  $http.get('/e8oada3z/get_posts/?post_type=product&page=' + $rootScope.page_number).success(function(data) {
		  
		  $scope.iterate_until = data.posts.length >= 9 ? 9 : (data.posts.length - 1);
		  
		  for (var i = 0; i <= $scope.iterate_until; i++) {   
			 
			$localStorage.photos.push(data.posts[i]);
			
		  }
		  
			console.log($localStorage.photos);	
			console.log($localStorage.photos.length);		
			
			$scope.$broadcast('scroll.infiniteScrollComplete'); 
			
	   })
			.error(function (data){
	  
			  var alertPopup = $ionicPopup.alert({
				  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				  template: 'Seems like we cannot load data. Please try again later.'
			  });
				  alertPopup.then(function(res) {
			  });
	  
	  }); 
  
  }

  $scope.canWeLoadMoreContent = function() {
	  
	  maximum_posts = $rootScope.total_posts_available - 1;
	  return ($localStorage.photos.length > maximum_posts) ? false : true;
  
  }  
  
  $scope.populateList();

  $scope.shareitem = function($index) {
	  
    $rootScope.exploregriditemsindex = $index;
	console.log($rootScope.exploregriditemsindex);
  
  };

  $scope.resetshare = function() {
	  
	// Since the popover card is only called once on pageload, I need to reinitiate each share when the share button is clicked

	var sharing_image = $rootScope.photos[$rootScope.exploregriditemsindex].imagefull == 'img/noimage.png' ? 'https://inmyunimedia1.s3-eu-west-1.amazonaws.com/media/b148f6cd3c7a.png' : $rootScope.photos[$rootScope.exploregriditemsindex].imagefull;
	
	var sharing_message = "Just saw '" + $rootScope.photos[$rootScope.exploregriditemsindex].title + "' on the @inmyuni university app. Have a look:";

	var sharing_link = $rootScope.photos[$rootScope.exploregriditemsindex].url.slice(0, - 1); 
	
	$rootScope.Share = {message: sharing_message, image: sharing_image, link: sharing_link};
	console.log($rootScope.Share);
	
  };
  


});

/*app.controller('RefreshCtrl', function($scope, $rootScope, $localStorage, $http, $state) {

  $scope.RefreshMyItems = function() {
    $http.get('/e8oada3z/get_author_posts/?id=' + $localStorage.UserMeta.id + '&post_type=product&count=-1')
     .success(function(data) {
       $rootScope.userproducts = data;
		$state.go($state.current, {}, {reload: true});
		console.log("refreshed");
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };
  
  $scope.RefreshGeneralItems = function() {
    $http.get('/api/get_posts/?post_type=product')
     .success(function(data) {
       $rootScope.userproducts = data;
		$state.go($state.current, {}, {reload: true});
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  }; 
 
});*/

app.controller('SlidesAboutCtrl', function($scope, $ionicSlideBoxDelegate) {

  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  }

  $scope.firstSlide = function() {
    $ionicSlideBoxDelegate.slide(0);
  } 

});

app.controller('ProfileCtrl', function($scope, $rootScope, $http, $ionicModal, $ionicPopover, $ionicPopup, $timeout, $state, $localStorage, $stateParams, $ionicListDelegate, $ionicHistory, Categories) {	

$rootScope.visit_profile_id = $stateParams.profileID;
$rootScope.second_profile_id = $stateParams.profileID;
 
	  $http.get('/e8oada3z/user/profile_data/?cookie=' + $localStorage.UserMeta.cookie + '&action=getcounts&userid=' + $localStorage.UserMeta.id + '&metakey=getcounts&metavalue=' + $rootScope.visit_profile_id ).success(function(data) {
			
		result = JSON.stringify(data);
		results = JSON.parse(result);	
		
		console.log(results);
		
		$scope.loaditems();
		
		if (results.counts.followers_count == "") {
			$scope.count_followers = 0;				
		} else {	
			$scope.count_followers = results.counts.followers_count.count;				
		}
		
		if (results.counts.following_count == "") {	
			$scope.count_following = 0;			
		} else {	
			$scope.count_following = results.counts.following_count.count;	
		}		
		
		$scope.counts = {
			followers: $scope.count_followers,
			following: $scope.count_following
		};
		
		$scope.userinfo = results.counts
		console.log($scope.userinfo);
		
		if (results.counts.ratings_count.count == 1) {

			$scope.rating = {
				count: results.counts.ratings_count.count,	
				current: results.counts.rating_list[Object.keys(results.counts.rating_list)[0]].rating // Get first rating value
			}
			
			$scope.rating_noun = "Rating";
			
		} else if (results.counts.ratings_count == "") {
			
			$scope.rating = {
				count: 0,	
				current: 0
			}
		
		} else if (results.counts.ratings_count.count > 1) {
		
			$scope.rating = {
				count: results.counts.ratings_count.count,	
				current: results.counts.ratings_avg.average
			}	
			
			$scope.rating_noun = "Ratings";		
		} 
	
	});	
	
		$scope.doRefresh = function() {
			$state.go($state.current, {}, {reload: true});
		}
		
		$scope.getresults = function() {
			
		if ($scope.searchterm == undefined) {	
			
		alert("Please enter a search term/word!");
		
		} else {
			
		$http.get('/e8oada3z/get_search_results/?search=' + encodeURIComponent($scope.searchterm) + '&id=' + $localStorage.UserMeta.id + '&post_type=product&count=-1').
		  success(function(data) {
			
				$scope.hideitems = true;
				  
				result = JSON.stringify(data);
				results = JSON.parse(result);
				
				if (results.count_total == 0) {		
				
					var alertPopup = $ionicPopup.alert({
						   title: 'Oh No!',
						   template: '<h3>Sorry, no items found. <i class="icon ion-sad popuplink"></i> Why not <a class="popuplink" ui-sref="sell">sell something?</a></h3>'
						 });
						 alertPopup.then(function(res) {
						 });
						 $timeout(function() {
						  alertPopup.close(); 
					   }, 7000);	
						
				} else {
				$scope.showresults = true;
				
				$scope.totalnumberresults = results.count_total;
				
				if (results.count_total == 1) {
					
					$scope.itemnoun = "item"
					
				} else {
					
					$scope.itemnoun = "items"
					
				}
				
			// Modal Stuff START	
				
				$scope.photossearch = data;
				
				$scope.getnewindex = function (index) {	
				$scope.searchindex = index;
				}
				
			  $ionicModal.fromTemplateUrl('templates/modals/item-view-more-search.html', {
				scope: $scope,
				animation: 'slide-in-up'
			  }).then(function(modal) {
				$scope.modal = modal;
			  });	
			  
			// Modal Stuff END		
				
				}
			
		  }) // end $http
			
		} 
		  
		} // end getresults

		$scope.loaditems = function() {
		  
			$http.get('/e8oada3z/get_author_posts_profile/?id=' + $stateParams.profileID + '&aid=' + $stateParams.profileID + '&post_type=product&count=-1').success(function(data){
				
				if (data.status == "error" && data.error == "Not found.") {
					
					var alertPopup = $ionicPopup.alert({
						title: 'Error <i class="icon ion-close"></i>',
						template: 'This user has not been found or probably has been deleted.'
					});
						alertPopup.then(function(res) {
							$state.go('explore');
					});
					
				} 
					
				$scope.photos = data;
				
				$scope.description = $localStorage.UserMeta.bio
		
					if ($scope.photos.posts == null || $scope.photos.posts == "") {
						
						$scope.postscount = 0;
			
						$scope.uni = "No items found for this user";
										
									
					} else {
						
						$scope.postscount = $scope.photos.posts.length;
							
						$scope.uni = $scope.photos.posts[0].taxonomy_product_cat[0].title;
												
					}
			
				$rootScope.authorposts = $scope.photos;
				console.log($rootScope.authorposts);
				
				  $scope.$broadcast('author-posts-loaded');
			
			});
		
		};

// Dummy data:

dummyid = 2;

$scope.rating = {
    value: 3,
	current: 2.5
  };
  
$scope.rating_noun = "Ratings";
  
$scope.followers = {
    count: 0
  };

$scope.following = {
    count: 0
  };

$scope.followed = false;
$scope.unfollowed = false;

$scope.$on('author-posts-loaded', function(event) {
 
if ($rootScope.authorposts.count == 0) {
  $scope.selectedItem = {
	  id: 0000
  };	
} else {
  $scope.selectedItem = {
	  id: $rootScope.authorposts.posts[0].id
  };
}

$scope.rateuser = function() {
	
		$http.get('/e8oada3z/user/profile_data/?cookie=' + $localStorage.UserMeta.cookie + '&action=getprofile&userid=' + $stateParams.profileID + '&metakey=userorders&metavalue=' + $stateParams.profileID ).success(function(data) {		
		
		result = JSON.stringify(data);
		$scope.sellerorders = JSON.parse(result);
		console.log($scope.sellerorders);
			
			Object.keys($scope.sellerorders.orders).forEach(function(key) {
				
				if ($scope.sellerorders.orders[key].customer_id == $localStorage.UserMeta.id) {
					
					$rootScope.userbought = true;
					console.log($scope.userbought);
					
				}
				
			});


	}).error(function (data){	
	
		$rootScope.$broadcast('loading:hide');	

		  var alertPopup = $ionicPopup.alert({
			  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
			  template: 'Profile information cannot be retrieved at the moment for some reason. We are working on it. Please try again later.'
		  });
			  alertPopup.then(function(res) {

		  });
		  
	});	

	$scope.data = {}
	
	// An elaborate, custom popup
	 var myPopup = $ionicPopup.show({
	   templateUrl: 'templates/rateuser.html',
	   title: '<span style="font-size: 20px;"><i class="icon ion-android-contact"></i> Rate this user!</span>',
	   subTitle: 'Rate your buying experience with this seller',
	   scope: $scope,
	   buttons: [
		 { text: 'Cancel',
		   onTap: function(e) {
		   }
		 },
		 {
		   text: '<b>Rate</b>',
		   type: 'button-dark',
		   cssClass: 'noborder', 
		   onTap: function(e) {
	   
					 return {
						   run: $scope.updaterating()
		  //		       email: $scope.data.email
					  };
	
		   }
		 }
	   ]
	 });   
 
};
 
});
 
$scope.updaterating = function() {
	  	  
	if ($rootScope.userbought === true) {
	 
		$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=rate&userid=' + $localStorage.UserMeta.id + '&metakey=user_rating_app&metavalue=' + $stateParams.profileID + '&rating=' + $scope.rating.value + '&comment=' + encodeURIComponent($scope.rating.comment) + '&rating_item_id=' + $scope.selectedItem.id).success(function(data) {
			
					console.log(data);
		
					$scope.rated = 1
					
					result = JSON.stringify(data);
					results = JSON.parse(result);	
					
					$state.go('view_ratings', { profileID: $stateParams.profileID });			
						 
				}).error(function (data){
		
						var alertPopup = $ionicPopup.alert({
							title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
							template: 'Cannot update rating for some reason. Please try again later.'
						});
							alertPopup.then(function(res) {
						});
		
				});	
				
	} else {
		
		return;
	
	}

};
 
// For testing purposes
  $scope.clearratings = function() {	
 
		$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=clearuser&userid=' + $localStorage.UserMeta.id + '&metakey=user_rating_app&metavalue=' + $stateParams.profileID ).success(function(data) {
			
			console.log(data);
			
			$scope.rated = 'cleared'

		}).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'error'
				});
					alertPopup.then(function(res) {
				});

		});	
  };
  
$scope.followers_term = "Followers";

  $scope.follow = function() {	
 
		$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=follow&userid=' + $localStorage.UserMeta.id + '&metakey=user_followers_app&metavalue=' + $stateParams.profileID ).success(function(data) {

			console.log(data);
			
			$scope.followed = true;
			$scope.unfollowed = false;
			
			var updatefollowers = $scope.counts.followers;
			
			$scope.counts.followers = ++updatefollowers
			
			if ($scope.counts.followers == 1) {
			
			$scope.followers_term = "Follower";
				
			} else {
				
			$scope.followers_term = "Followers";
							
			}
			
			result = JSON.stringify(data);
			results = JSON.parse(result);
			
			if (results.error == 'alreadyfollowing') {
				
				var alertPopup = $ionicPopup.alert({
					title: 'Slight issue here <i class="icon ion-alert"></i>',
					template: 'You are already following this user.'
				});
					alertPopup.then(function(res) {
				});
				

			} else if (results.error == 'cannotfollowself')  {
				
				var alertPopup = $ionicPopup.alert({
					title: 'Slight issue here <i class="icon ion-alert"></i>',
					template: 'You cannot follow yourself.'
				});
					alertPopup.then(function(res) {
				});
				
			} else {
				
				$scope.followers.count = results.array.followers_count.count;
				
					if ($scope.followers.count > 1) {
					
						$scope.followers_term = "Followers";
					
					}

				if (results.array.followers_count.count == 1) {
					$scope.followers_term = "Follower";	
				}
				
			}
			
		}).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'Cannot follow the user for some reason. Please try again later.'
				});
					alertPopup.then(function(res) {
				});

		});	
  };
  
  $scope.unfollow = function() {	
 
		$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=unfollow&userid=' + $localStorage.UserMeta.id + '&metakey=user_followers_app&metavalue=' + $stateParams.profileID ).success(function(data) {
				
			console.log(data);
			
			$scope.unfollowed = true;
			$scope.followed = false;
			
			var updatefollowers = $scope.counts.followers;
			
			$scope.counts.followers = --updatefollowers
			
			if ($scope.counts.followers == 1) {
			
				$scope.followers_term = "Follower";
				
			} else {
				
				$scope.followers_term = "Followers";
							
			}
			
			result = JSON.stringify(data);
			results = JSON.parse(result);
			
			if (results.error !== undefined || results.msg !== 'notfollowing') {
				
					$scope.followers.count--;
					
					if ($scope.followers.count == 1) {
					
					$scope.followers_term = "Follower";
					
					}
					
			} else {
				
					$scope.followers.count = 0;
					$scope.followers_term = "Followers";
				
				var alertPopup = $ionicPopup.alert({
					title: 'Authentication Error <i class="icon ion-alert"></i>',
					template: 'You have to be following this user to unfollow them!'
				});
					alertPopup.then(function(res) {
				});
				
			}
			
		}).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'Cannot unfollow this user at the moment. Please try again later.'
				});
					alertPopup.then(function(res) {
				});

		});	
  };
  
// For testing purposes
  $scope.clearuser = function() {	
 
		$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=clearuser&userid=' + $localStorage.UserMeta.id + '&metakey=user_followers_app&metavalue=' + $stateParams.profileID ).success(function(data) {
			
			console.log(data);
			
			$scope.followed = 'cleared'

		}).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'error'
				});
					alertPopup.then(function(res) {
				});

		});	
  };

/*// For testing purposes
  $scope.showuser = function() {	
 
		$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=showuser&userid=' + $localStorage.UserMeta.id + '&metakey=user_followers_app&metavalue=' + $stateParams.profileID ).success(function(data) {
			
			alert(JSON.stringify(data));
			console.log(data);
			
			$scope.followed = 'shown'

		}).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'error'
				});
					alertPopup.then(function(res) {
				});

		});	
  };*/
  
  $scope.resetshare = function() {
	  
	// Since the popover card is only called once on pageload, I need to reinitiate each share when the share button is clicked

	var sharing_image = $rootScope.authorposts.posts[$rootScope.profileitemsindex].imagefull == 'img/noimage.png' ? 'https://inmyunimedia1.s3-eu-west-1.amazonaws.com/media/b148f6cd3c7a.png' : $rootScope.authorposts.posts[$rootScope.profileitemsindex].imagefull;
	
	var sharing_message = "Just saw '" + $rootScope.authorposts.posts[$rootScope.profileitemsindex].title + "' on the @inmyuni university app. Have a look:";

	var sharing_link = $rootScope.authorposts.posts[$rootScope.profileitemsindex].url.slice(0, - 1); 
	
	$rootScope.Share = {message: sharing_message, image: sharing_image, link: sharing_link};
	console.log($rootScope.Share);
	
  };
  
  $scope.shareitem = function($index) {
	  
    $rootScope.profileitemsindex = $index;
	console.log($localStorage.useritems.posts[$rootScope.profileitemsindex].title);
  
  };
  
  $scope.shareprofilelink = function() {
	  
	var sharing_image = $scope.userinfo.user.image[0] == 'img/noimage.png' ? 'https://inmyunimedia1.s3-eu-west-1.amazonaws.com/media/b148f6cd3c7a.png' : $scope.userinfo.user.image[0];
	
	var sharing_message = "Just saw " + $scope.userinfo.user.name + "'s items on @inmyuni. Have a look:";

	var sharing_link = "/profile/" + $scope.userinfo.user.name; 
	
	$rootScope.Share = {message: sharing_message, image: sharing_image, link: sharing_link};
	console.log($rootScope.Share);
	
  };

});

app.controller('FollowersCtrl', function($scope, $rootScope, $state, $http, $ionicPopup, $localStorage, $ionicListDelegate, $stateParams) {
	
$rootScope.visit_profile_id = $stateParams.profileID;

$scope.hidespinner = false;
	
			$http.get('/e8oada3z/user/profile_data/?cookie=' + $localStorage.UserMeta.cookie + '&action=followers&userid=' + $localStorage.UserMeta.id + '&metakey=user_followers_app&metavalue=' + $rootScope.visit_profile_id ).success(function(data) {		
			
			$scope.hidespinner = true;
	
			console.log(data);
			
			result = JSON.stringify(data);
			$scope.followers = JSON.parse(result);	
	
			console.log($scope.followers.profile);	
			
/*				if ($rootScope.visit_profile_id == $localStorage.UserMeta.id && $scope.followers.profile == null) {
					
					$scope.user_term = "You are"
					
				} else if ($rootScope.visit_profile_id != $localStorage.UserMeta.id && $scope.followers.profile == null) {
					
					$scope.user_term = "This user is"
				} */


		}).error(function (data){
			

			$scope.runalert = function() {
				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'Cannot obtain your followers for some reason. Please try again later.'
				});
					alertPopup.then(function(res) {
				});
			}
		});		
		
	$scope.follow = function($id) {
				
		$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=follow&userid=' + $localStorage.UserMeta.id + '&metakey=user_followers_app&metavalue=' + $id ).success(function(data) {
		
					console.log("follow success");
					
				}).error(function (data){
		
						var alertPopup = $ionicPopup.alert({
							title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
							template: 'You cannot currently follow this user for some reason. We are working on it.'
						});
							alertPopup.then(function(res) {
						});
		
				});	 
		
	};


	
	$scope.unfollow = function($id) {
		
	 $http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=unfollow&userid=' + $localStorage.UserMeta.id + '&metakey=user_followers_app&metavalue=' + $id ).success(function(data) {
	
				console.log("unfollow success");
					
				$ionicListDelegate.closeOptionButtons();			
				
			}).error(function (data){
	
					var alertPopup = $ionicPopup.alert({
						title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
						template: 'You cannot currently unfollow this user for some reason. We are working on it.'
					});
						alertPopup.then(function(res) {
					});
	
			});	
		
	}; 

	
});

app.controller('FollowingCtrl', function($scope, $rootScope, $state, $http, $ionicPopup, $localStorage, $ionicLoading, $stateParams, $ionicListDelegate) {
	
 $rootScope.visit_profile_id = $stateParams.profileID;
 
 $scope.hidespinner = false;
	
			$http.get('/e8oada3z/user/profile_data/?cookie=' + $localStorage.UserMeta.cookie + '&action=following&userid=' + $localStorage.UserMeta.id + '&metakey=user_following_app&metavalue=' + $rootScope.visit_profile_id ).success(function(data) {	
			
			$scope.hidespinner = true;
	
			console.log(data);
			
			result = JSON.stringify(data);
			$scope.following = JSON.parse(result);


		}).error(function (data){	


				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'Cannot obtain following list for some reason. Please try again later.'
				});
					alertPopup.then(function(res) {
				});
			
		});		
		
	$scope.follow = function($id) {
			
		$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=follow&userid=' + $localStorage.UserMeta.id + '&metakey=user_followers_app&metavalue=' + $id ).success(function(data) {
		
					console.log("follow success");
					
				}).error(function (data){
		
						var alertPopup = $ionicPopup.alert({
							title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
							template: 'You cannot currently follow this user for some reason. We are working on it.'
						});
							alertPopup.then(function(res) {
						});
		
				});	 
		
	};


	
	$scope.unfollow = function($id) {
		
 $http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=unfollow&userid=' + $localStorage.UserMeta.id + '&metakey=user_followers_app&metavalue=' + $id ).success(function(data) {

			console.log("unfollow success");
			
			$ionicListDelegate.closeOptionButtons();
			
		}).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'You cannot currently unfollow this user for some reason. We are working on it.'
				});
					alertPopup.then(function(res) {
				});

		});	
		
	};
	
	
});

app.controller('ItemSingleCtrl', function($scope, $rootScope, $localStorage, $http, $state, $cordovaToast, $stateParams, WcApiUrl, $ionicPopup) {

$scope.hidespinner = false;	

$rootScope.visit_post_id = $stateParams.postID;

	$scope.likebuttons = {
		
		like: false,
		liked: false	
		
	};

// Refresh 
  $scope.RefreshPost = function() {
	  
	$http.get('/e8oada3z/get_post/?id=' + $rootScope.visit_post_id + '&post_type=product&userid=' + $localStorage.UserMeta.id).success(function(data) {

		result = JSON.stringify(data);
		results = JSON.parse(result);
		console.log(results);
		
		$rootScope.post = results.post
		
		$scope.postcomments = results.post.comments;
		$scope.totalcomments = $scope.postcomments.length;
		$rootScope.charge_amount = Number(($rootScope.post.price).toString().split(".").join(""));
	
		if ($rootScope.post.likes.liked == true) {
			
			$scope.likebuttons = {
				
				likebutton: false,
				likedbutton: true	
				
			};		
			
		} else if ($rootScope.post.likes.liked == false) {
			
			$scope.likebuttons = {
				
				likebutton: true,
				likedbutton: false
				
			};			
			
		}	
		
		$localStorage.post = $rootScope.post;
		
		$scope.$emit('profile-updated');

		}).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'There was a problem accessing this item.'
				});
					alertPopup.then(function(res) {
				});

		})
		
		$http.get('/wc-api/v2/products/' + $rootScope.visit_post_id + ApiUrl).success(function(data) {
			
			$scope.hidespinner = true;
	
			result = JSON.stringify(data);
			results = JSON.parse(result);			
			$rootScope.post_wc = results.product
			console.log($rootScope.post_wc);
			
			$scope.$broadcast('post-wc-loaded');

			  $scope.saletype = {
				  local: false,
				  national: false	
			  }
			
				if ($rootScope.post_wc.attributes[5].options.length == 2) {
					
					$scope.saletype = {
						local: true,
						national: true	
					}
							
				} else if ($rootScope.post_wc.attributes[5].options.length == 1 && $rootScope.post_wc.attributes[5].options[0] === "Local") {
					
					$scope.saletype = {
						local: true,
						national: false	
					}	
					
				} else if ($rootScope.post_wc.attributes[5].options.length == 1 && $rootScope.post_wc.attributes[5].options[0] !== "National") {
					
					$scope.saletype = {
						local: false,
						national: true
					}	
				}

		}).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'Cannot load this item at the moment for some weird reason. We are on to it. Please try again later.'
				});
					alertPopup.then(function(res) {
				});

		})
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
	 
  };
  
ApiUrl = WcApiUrl.GetGeneralUrl();
	
	$scope.getpost = function() { 
	
		$http.get('/wc-api/v2/products/' + $rootScope.visit_post_id + ApiUrl).success(function(data) {
			
			$scope.hidespinner = true;
	
			result = JSON.stringify(data);
			results = JSON.parse(result);			
			$rootScope.post_wc = results.product
			console.log($rootScope.post_wc);
			
			$scope.$broadcast('post-wc-loaded');

			  $scope.saletype = {
				  local: false,
				  national: false	
			  }
			
				if ($rootScope.post_wc.attributes[5].options.length == 2) {
					
					$scope.saletype = {
						local: true,
						national: true	
					}
							
				} else if ($rootScope.post_wc.attributes[5].options.length == 1 && $rootScope.post_wc.attributes[5].options[0] === "Local") {
					
					$scope.saletype = {
						local: true,
						national: false	
					}	
					
				} else if ($rootScope.post_wc.attributes[5].options.length == 1 && $rootScope.post_wc.attributes[5].options[0] !== "National") {
					
					$scope.saletype = {
						local: false,
						national: true
					}	
				}

		}).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'Cannot load this item at the moment for some weird reason. We are on to it. Please try again later.'
				});
					alertPopup.then(function(res) {
				});

		});		

	
		$http.get('/e8oada3z/get_post/?id=' + $rootScope.visit_post_id + '&post_type=product&item_id=' + $rootScope.visit_post_id).success(function(data) {	
			
			result = JSON.stringify(data);
			results = JSON.parse(result);
			$rootScope.post = results.post
			console.log($rootScope.post);
	
			$scope.$broadcast('post-loaded');
			
			$scope.postcomments = results.post.comments;
			$scope.totalcomments = $scope.postcomments.length;

			$rootScope.charge_amount = Number(($rootScope.post.price).toString().split(".").join(""));

			if ($scope.post.likes.liked == true) {
				
				$scope.likebuttons = {
					
					likebutton: false,
					likedbutton: true	
					
				};		
				
			} else if ($scope.post.likes.liked == false) {
				
				$scope.likebuttons = {
					
					likebutton: true,
					likedbutton: false
					
				};			
				
			}
			
			if ($rootScope.post.author.id == $localStorage.UserMeta.id) {
				
				$scope.hideuserbuttons = true;
				
			}
			
	
    		$scope.$broadcast('profile-updated');

		}).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'error'
				});
					alertPopup.then(function(res) {
				});

		});	
		
	};
	
	$scope.getpost();

	$scope.like = function() {	
	
	$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=like&post_author=' + $scope.post.author.id + '&userid=' + $localStorage.UserMeta.id + '&metakey=post_likes&metavalue=' + $scope.post.id).success(function(data) {
	  
			  console.log(data);	
			  
				$scope.likebuttons = {
					
					likebutton: false,
					likedbutton: true
					
				};
				   
		  }).error(function (data){
	
			  $scope.runalert = function() {
				  var alertPopup = $ionicPopup.alert({
					  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					  template: 'Cannot update your like to this post. Please try again later.'
				  });
					  alertPopup.then(function(res) {
				  });
			  }
		  });	

	};
	
	$scope.unlike = function() {	
	
	$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=unlike&userid=' + $localStorage.UserMeta.id + '&metakey=post_likes&metavalue=' + $scope.post.id).success(function(data) {
	  
			  console.log(data);

				$scope.likebuttons = {
					
					likebutton: true,
					likedbutton: false
					
				};
				   
		  }).error(function (data){
	
			  $scope.runalert = function() {
				  var alertPopup = $ionicPopup.alert({
					  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					  template: 'Cannot update your like to this post. Please try again later.'
				  });
					  alertPopup.then(function(res) {
				  });
			  }
		  });	
	
	};
	
	$scope.clearlikes = function() {	
	
	$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=clearlikes&userid=' + $localStorage.UserMeta.id + '&metakey=post_likes&metavalue=' + $scope.post.id).success(function(data) {
	  
			  console.log(data);	
				   
		  }).error(function (data){
	
			  $scope.runalert = function() {
				  var alertPopup = $ionicPopup.alert({
					  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					  template: 'Cannot update your like to this post. Please try again later.'
				  });
					  alertPopup.then(function(res) {
				  });
			  }
		  });	
	
	};
	
  $scope.shareitemsingle = function() {
	  
	var sharing_image = $scope.post.imagefull == 'img/noimage.png' ? 'https://inmyunimedia1.s3-eu-west-1.amazonaws.com/media/b148f6cd3c7a.png' : $scope.post.imagefull;
	
	var sharing_message = "Just saw '" + $scope.post.title + "' on the @inmyuni university app. Have a look:";
  
	var sharing_link = $scope.post.url.slice(0, - 1); 
	
	$rootScope.Share = {message: sharing_message, image: sharing_image, link: sharing_link};
	console.log($rootScope.Share);
	
  };
  
   $scope.sharemyitemsingle = function() {
	  
	var sharing_image = $scope.post.imagefull == 'img/noimage.png' ? 'https://inmyunimedia1.s3-eu-west-1.amazonaws.com/media/b148f6cd3c7a.png' : $scope.post.imagefull;
	
	var sharing_message = "I am selling '" + $scope.post.title + "' on the @inmyuni university app. Have a look:";
  
	var sharing_link = $scope.post.url.slice(0, - 1); 
	
	$rootScope.Share = {message: sharing_message, image: sharing_image, link: sharing_link};
	console.log($rootScope.Share);
	
  };

	
});

app.controller('ExploreCtrl', function($scope, $rootScope, $localStorage, $http, $state) {

	$scope.settingsList = [
	  { text: "Show Only My Uni", checked: false },
	  { text: "Show From All Unis", checked: true },
	  { text: "Show Only Following", checked: false },
	  { text: "Show Only Featured", checked: false }
	];
	
	
});

app.controller('MenuCtrl', function($scope, $rootScope) {
	
	if (!$rootScope.currentusermeta) {
		
		$rootScope.itemcount = 0;
		$rootScope.visit_profile_id = 0;
		
	}
	
});

app.controller('SearchCtrl', function($scope, $rootScope, $localStorage, $http, $state, $ionicPopup, $timeout, $cordovaToast, $ionicLoading) {
	
if ($rootScope.searchterm.keyword == '') {
	
	return false;

} else {
	
	$ionicLoading.show({template: '<ion-spinner class="spinner-energized"></ion-spinner> Searching Inmyuni...'})
	
		$http.get('/e8oada3z/get_search_results/?search=' + encodeURIComponent($rootScope.searchterm.keyword) + '&post_type=product&count=-1').
			success(function(data) {
				
			$rootScope.results = data;
			
			$ionicLoading.hide();
			
			console.log($rootScope.results);
		
					if ($rootScope.results.count_total == 0) {		
					
						var alertPopup = $ionicPopup.alert({
							   title: 'Oh No!',
							   template: '<h3>Sorry, no items found. <i class="icon ion-sad popuplink"></i> Why not <a class="popuplink" ui-sref="sell">sell something?</a></h3> Or back to <a class="popuplink" ui-sref="explore">Explore</a>'
							 });
							 alertPopup.then(function(res) {				 
								$scope.popover.show($event);	 
							 });
							 $timeout(function() {
							  alertPopup.close(); 
							  $scope.popover.show($event);
						   }, 10000);	
							
					} else {
					
//					$scope.showresults = true;
					
					$scope.totalnumberresults = $rootScope.results.count_total;
				
					if ($rootScope.results.count_total == 1) {
						
						$scope.itemnoun = "item"
						
					} else {
						
						$scope.itemnoun = "items"
						
					}
				
						 $cordovaToast.showLongBottom($rootScope.results.count_total + " " + $scope.itemnoun + " found for '" + $rootScope.searchterm.keyword + "'");
		}
		
	  })
	  
}
	
});

app.controller('ViewRatingsCtrl', function($scope, $rootScope, $http, $ionicPopup, $localStorage, $stateParams) {
	
 $rootScope.visit_profile_id = $stateParams.profileID;

	$scope.hidespinner = false;	

		$http.get('/e8oada3z/user/profile_data/?cookie=' + $localStorage.UserMeta.cookie + '&action=getprofile&userid=' + $localStorage.UserMeta.id + '&metakey=profileratings&metavalue=' + $rootScope.visit_profile_id ).success(function(data) {		
			
			result = JSON.stringify(data);
			$scope.rating_list = JSON.parse(result);	
	
			$scope.hidespinner = true;
			
			console.log($scope.rating_list);	

		}).error(function (data){	

				$rootScope.$broadcast('loading:hide');

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'Cannot obtain ratings for this user for some reason. Please try again later.'
				});
					alertPopup.then(function(res) {
				});

		});		
		
});		

app.controller('DashboardCtrl', function($scope, $rootScope, $localStorage, $http, $ionicPopup, $state, $cordovaToast, $stateParams, WcApiUrl) {
	
	// Add filter to requests to sort by date/time ***************************************
	
	$rootScope.visit_profile_id = $stateParams.profileID;
	ApiUrl = WcApiUrl.GetGeneralUrl();
	
	$scope.hidespinner = false;
	
	$scope.RefreshDashboard = function() {
		
		$http.get('/wc-api/v2/customers/' + $localStorage.UserMeta.id + ApiUrl).success(function(data) {	
		
			customerdata = JSON.stringify(data);
			$scope.customer = JSON.parse(customerdata);
			console.log($scope.customer);
		
			}).error(function (data){
			
				$rootScope.$broadcast('loading:hide');			
	
				  var alertPopup = $ionicPopup.alert({
					  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					  template: 'Your orders cannot be retrieved at the moment for some reason. We are working on it. Please try again later.'
				  });
					  alertPopup.then(function(res) {
						  $state.go($state.current, {}, {reload: true});
				  });
	
			});	
	 
		$http.get('/wc-api/v2/customers/' + $localStorage.UserMeta.id + '/orders' + ApiUrl).success(function(data) {	
		
		$scope.hidespinner = true;
		
			orderdata = JSON.stringify(data);
			$scope.myorders = JSON.parse(orderdata);
			console.log($scope.myorders);
	
			var sum = 0;
			
			for ( var i = 0; i < $scope.myorders.orders.length; i++) {
				$scope.myorders.orders[i].status == 'completed' ? sum += parseFloat($scope.myorders.orders[i].total) || 0 : 0 ;
			};
			  
			$scope.totalspent = sum;	  
			  
			}).error(function (data){	
	
				$rootScope.$broadcast('loading:hide');		
	
				  var alertPopup = $ionicPopup.alert({
					  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					  template: 'Your order cannot be retrieved at the moment for some reason. We are working on it. Please try again later.'
				  });
					  alertPopup.then(function(res) {
						  $state.go($state.current, {}, {reload: true});
				  });
	
			});	
			
	
			$http.get('/e8oada3z/user/profile_data/?cookie=' + $localStorage.UserMeta.cookie + '&action=getprofile&userid=' + $localStorage.UserMeta.id + '&metakey=userorders&metavalue=' + $localStorage.UserMeta.id ).success(function(data) {		
			
			result = JSON.stringify(data);
			$scope.sellerorders = JSON.parse(result);	
	
			console.log($scope.sellerorders);	
			$scope.sellerordercount = Object.keys($scope.sellerorders.orders).length;
	
			var sum = 0;
			
			Object.keys($scope.sellerorders.orders).forEach(function(key) {
				
				$scope.sellerorders.orders[key].order_status == 'completed' ? sum += parseFloat($scope.sellerorders.orders[key].order_total) || 0 : 0 ;
				
				// If dashboard is showing empty seller orders:
				if (!$scope.sellerorders.orders[key].order_id) {
				
					delete $scope.sellerorders.orders[key];
					
					$scope.sellerordercount = Object.keys($scope.sellerorders.orders).length;
					
				}
				
			});
			  
			$scope.totalearned = sum;	
	
		}).error(function (data){	
		
			$rootScope.$broadcast('loading:hide');	
	
			  var alertPopup = $ionicPopup.alert({
				  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				  template: 'Your orders cannot be retrieved at the moment for some reason. We are working on it. Please try again later.'
			  });
				  alertPopup.then(function(res) {
	
			  });
			  
		}).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
	
	}
	
	$http.get('/wc-api/v2/customers/' + $localStorage.UserMeta.id + ApiUrl).success(function(data) {	
	
		customerdata = JSON.stringify(data);
		$scope.customer = JSON.parse(customerdata);
		console.log($scope.customer);
	
		}).error(function (data){
		
			$rootScope.$broadcast('loading:hide');			

			  var alertPopup = $ionicPopup.alert({
				  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				  template: 'Your orders cannot be retrieved at the moment for some reason. We are working on it. Please try again later.'
			  });
				  alertPopup.then(function(res) {
					  $state.go($state.current, {}, {reload: true});
			  });

		});	
 
	$http.get('/wc-api/v2/customers/' + $localStorage.UserMeta.id + '/orders' + ApiUrl).success(function(data) {	
	
	$scope.hidespinner = true;
	
		orderdata = JSON.stringify(data);
		$scope.myorders = JSON.parse(orderdata);
		console.log($scope.myorders);

		var sum = 0;
		
		for ( var i = 0; i < $scope.myorders.orders.length; i++) {
			$scope.myorders.orders[i].status == 'completed' ? sum += parseFloat($scope.myorders.orders[i].total) || 0 : 0 ;
		};
		  
		$scope.totalspent = sum;	  
		  
		}).error(function (data){	

			$rootScope.$broadcast('loading:hide');		

			  var alertPopup = $ionicPopup.alert({
				  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				  template: 'Your order cannot be retrieved at the moment for some reason. We are working on it. Please try again later.'
			  });
				  alertPopup.then(function(res) {
					  $state.go('myitems');
			  });

		});	
		
		$http.get('/e8oada3z/user/profile_data/?cookie=' + $localStorage.UserMeta.cookie + '&action=getprofile&userid=' + $localStorage.UserMeta.id + '&metakey=userorders&metavalue=' + $localStorage.UserMeta.id ).success(function(data) {		
		
		result = JSON.stringify(data);
		$scope.sellerorders = JSON.parse(result);	

		console.log($scope.sellerorders);	
		$scope.sellerordercount = Object.keys($scope.sellerorders.orders).length;

		var sum = 0;
		
		Object.keys($scope.sellerorders.orders).forEach(function(key) {
			
			$scope.sellerorders.orders[key].order_status == 'completed' ? sum += parseFloat($scope.sellerorders.orders[key].order_total) || 0 : 0 ;
			
			// If dashboard is showing empty seller orders:
			if (!$scope.sellerorders.orders[key].order_id) {
			
				// Unset order
				delete $scope.sellerorders.orders[key];
				
				// Update count
				$scope.sellerordercount = Object.keys($scope.sellerorders.orders).length;
				
			}
			
		});
		  
		$scope.totalearned = sum;	

	}).error(function (data){	
	
		$rootScope.$broadcast('loading:hide');	

		  var alertPopup = $ionicPopup.alert({
			  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
			  template: 'Your orders cannot be retrieved at the moment for some reason. We are working on it. Please try again later.'
		  });
			  alertPopup.then(function(res) {

		  });
		  
	});	

	$scope.deleteuserorders = function() {	// For Debugging
	
		$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=deleteorders&userid=' + $localStorage.UserMeta.id + '&metakey=userorders&metavalue=' + $localStorage.UserMeta.id).success(function(data) {
			
			callback = JSON.stringify(data);
			alert('deleted user orders successfully');
			
			$state.go($state.current, {}, {reload: true});
		
		}).error(function(data){
			
			callback = JSON.stringify(data);
			alert(data);			
			
		});	
	
	}	
	
});	

app.controller('SettingsPaymentsCtrl', function($scope, $rootScope, $localStorage, $http, $ionicPopup, $state, $cordovaToast, $stateParams, WcApiUrl) {
	
	$rootScope.visit_profile_id = $stateParams.profileID;
	ApiUrl = WcApiUrl.GetGeneralUrl();
	
	$scope.hidespinner = false;
	
	console.log(ApiUrl);
	
});	

app.controller('OrderCtrl', function($scope, $rootScope, $http, $stateParams, WcApiUrl, Urls, $state, $ionicPopup, $cordovaToast, $localStorage, $ionicScrollDelegate, $timeout, $filter, $ionicLoading) {
	
	$rootScope.visit_order_id = $stateParams.orderID;
	ApiUrl = WcApiUrl.GetGeneralUrl();
	$scope.posturl = Urls.GetPostUrl();
	
	$scope.hidespinner = false;
	
	$scope.statuses = [{
		name: 'Pending Payment',
		id: 'on-hold'
	},{
		name: 'Mark As Paid',
		id: 'completed'
	},{
		name: 'Cancel Order',
		id: 'cancelled'
	}];
	
	$scope.scrolldown = function() {
		
		$ionicScrollDelegate.scrollBottom(true);
		
	};
	
	$scope.RefreshOrder = function() {
		
		$http.get('/wc-api/v2/orders/' + $rootScope.visit_order_id + ApiUrl).success(function(data) {	
		
			$scope.hidespinner = true;
		
			singleorderdata = JSON.stringify(data);
			$scope.single_order = JSON.parse(singleorderdata);
			console.log($scope.single_order);
			
				$scope.selectedItem = {
					id: $scope.single_order.order.status
				};
		
			}).error(function (data){	
			
				$rootScope.$broadcast('loading:hide');		
	
						var alertPopup = $ionicPopup.alert({
							title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
							template: 'Your order cannot be edited at the moment for some reason. We are working on it. Please try again later.'
						});
							alertPopup.then(function(res) {
								$state.go('dashboard', { profileID: $localStorage.UserMeta.id });
						});
	
			});
			
		$http.get('/wc-api/v2/customers/' + $localStorage.UserMeta.id + '/orders' + ApiUrl).success(function(data) {	
		
		$scope.hidespinner = true;
		
			orderdata = JSON.stringify(data);
			$scope.myorders = JSON.parse(orderdata);
			console.log($scope.myorders);  
			  
			}).error(function (data){	
	
				$rootScope.$broadcast('loading:hide');		
	
				  var alertPopup = $ionicPopup.alert({
					  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					  template: 'Your order cannot be retrieved at the moment for some reason. We are working on it. Please try again later.'
				  });
					  alertPopup.then(function(res) {
						  $state.go('dashboard', { profileID: $localStorage.UserMeta.id });
				  });
	
			});	
				
		$http.get('/wc-api/v2/orders/' + $rootScope.visit_order_id + '/notes' + ApiUrl).success(function(data) {	
		
			singleordernotes = JSON.stringify(data);
			$scope.single_order_notes = JSON.parse(singleordernotes);
			console.log($scope.single_order_notes);
		
			}).error(function (data){	
			
				$rootScope.$broadcast('loading:hide');		
	
						var alertPopup = $ionicPopup.alert({
							title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
							template: 'Your order cannot be retreived at the moment for some reason. We are working on it. Please try again later.'
						});
							alertPopup.then(function(res) {
								$state.go('dashboard', { profileID: $localStorage.UserMeta.id });
						});
	
			}).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });

	}
	
	$http.get('/wc-api/v2/orders/' + $rootScope.visit_order_id + ApiUrl).success(function(data) {	
	
		singleorderdata = JSON.stringify(data);
		$scope.single_order = JSON.parse(singleorderdata);
		console.log($scope.single_order);
		
			$scope.selectedItem = {
				id: $scope.single_order.order.status
			};
			
			$http.get('/e8oada3z/get_post/?id=' + $scope.single_order.order.line_items[0].product_id + '&post_type=product').success(function(data) {	
			
			
				orderdata = JSON.stringify(data);
				$scope.seller_info = JSON.parse(orderdata);
				console.log($scope.seller_info); 
				
				$scope.hidespinner = true; 
				  
				}).error(function (data){	
		
					$rootScope.$broadcast('loading:hide');		
		
					  var alertPopup = $ionicPopup.alert({
						  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
						  template: 'Your order cannot be retrieved at the moment for some reason. We are working on it. Please try again later.'
					  });
						  alertPopup.then(function(res) {
							  $state.go('dashboard', { profileID: $localStorage.UserMeta.id });
					  });
		
				});					
	
		}).error(function (data){	
		
			$rootScope.$broadcast('loading:hide');		

					var alertPopup = $ionicPopup.alert({
						title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
						template: 'Your order cannot be edited at the moment for some reason. We are working on it. Please try again later.'
					});
						alertPopup.then(function(res) {
							$state.go('dashboard', { profileID: $localStorage.UserMeta.id });
					});

		});
		
	$http.get('/wc-api/v2/orders/' + $rootScope.visit_order_id + '/notes' + ApiUrl).success(function(data) {	
	
		singleordernotes = JSON.stringify(data);
		$scope.single_order_notes = JSON.parse(singleordernotes);
		console.log($scope.single_order_notes);
	
		}).error(function (data){	
		
			$rootScope.$broadcast('loading:hide');		

					var alertPopup = $ionicPopup.alert({
						title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
						template: 'Your order cannot be retreived at the moment for some reason. We are working on it. Please try again later.'
					});
						alertPopup.then(function(res) {
							$state.go('dashboard', { profileID: $localStorage.UserMeta.id });
					});

		});
		
	$scope.cancelorder = function() {	
		
		$scope.json_cancel = {
			"order": {
				"status": "cancelled",
				"payment_details": {
					"paid": false
				}
			}
		}	
			
		$scope.order_json_cancel = JSON.stringify($scope.json_cancel);
				
		var req = {
		 method: 'PUT',
		 url: '/wc-api/v2/orders/' + $stateParams.orderID + ApiUrl,
		 headers: {
		   'Content-Type': undefined
		 },
		 data: $scope.order_json_cancel,
		}
		
		$ionicLoading.show({template: 'Cancelling... <ion-spinner class="spinner-energized"></ion-spinner>'});
		
		$http(req)
			.success(function(data){
				
					callback = JSON.stringify(data);
					$scope.ordercallback = JSON.parse(callback);
					
					$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=cancelorder&userid=' + $localStorage.UserMeta.id + '&metakey=userorders&metavalue=' + parseInt($scope.ordercallback.order.line_items[0].product_id) + '&order_id=' + parseInt($scope.ordercallback.order.order_number) + '&order_total=' + parseFloat($scope.ordercallback.order.total) + '&order_status=cancelled&updated_at=' + encodeURIComponent($scope.ordercallback.order.updated_at) + '&item_name=' + encodeURIComponent($scope.ordercallback.order.line_items[0].name) + '&item_id=' + $scope.ordercallback.order.line_items[0].product_id + '&customer_name=' + encodeURIComponent($scope.ordercallback.order.customer.username) + '&customer_id=' + $scope.ordercallback.order.customer_id + '&delivery_type=' + $scope.ordercallback.order.shipping_lines[0].method_id + '&created_at=' + encodeURIComponent($scope.ordercallback.order.created_at) ).success(function(data) {		
						
						result = JSON.stringify(data);
						$scope.userorders = JSON.parse(result);	
						
						$ionicLoading.hide();
						
						$cordovaToast.showLongBottom('Order successfully updated.');
						
						$state.go($state.current, {}, {reload: true});
			
					}).error(function(){	
					
						callback = JSON.stringify(data);
						
						$ionicLoading.hide();
					
						$rootScope.$broadcast('loading:hide');	
			
						  var alertPopup = $ionicPopup.alert({
							  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
							  template: 'Your order cannot be updated at the moment for some reason. We are working on it. Please try again later.'
						  });
							  alertPopup.then(function(res) {
			
						  });
						  
					});									
		
				})
				.error(function(){
					
					$ionicLoading.hide();
					
					$rootScope.$broadcast('loading:hide');	
							
							var alertPopup = $ionicPopup.alert({
								title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
								template: 'Your order cannot be updated at the moment for some reason. We are working on it. Please try again later.'
							});
								alertPopup.then(function(res) {
									$state.go($state.current, {}, {reload: true});
							});

				});
	}
	
	$scope.cancelmyorder = function() {	
		
		$scope.json_cancel = {
			"order": {
				"status": "cancelled",
				"payment_details": {
					"paid": false
				}
			}
		}	
			
		$scope.order_json_cancel = JSON.stringify($scope.json_cancel);
				
		var req = {
		 method: 'PUT',
		 url: '/wc-api/v2/orders/' + $stateParams.orderID + ApiUrl,
		 headers: {
		   'Content-Type': undefined
		 },
		 data: $scope.order_json_cancel,
		}
		
		$ionicLoading.show({template: 'Cancelling... <ion-spinner class="spinner-energized"></ion-spinner>'});
		
		$http(req)
			.success(function(data){
				
					callback = JSON.stringify(data);
					$scope.ordercallback = JSON.parse(callback);
					
					$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=cancelmyorder&userid=' + $localStorage.UserMeta.id + '&metakey=userorders&metavalue=' + parseInt($scope.ordercallback.order.line_items[0].product_id) + '&order_id=' + parseInt($scope.ordercallback.order.order_number) + '&order_total=' + parseFloat($scope.ordercallback.order.total) + '&order_status=cancelled&updated_at=' + encodeURIComponent($scope.ordercallback.order.updated_at) + '&item_name=' + encodeURIComponent($scope.ordercallback.order.line_items[0].name) + '&item_id=' + $scope.ordercallback.order.line_items[0].product_id + '&customer_name=' + encodeURIComponent($scope.ordercallback.order.customer.username) + '&customer_id=' + $scope.ordercallback.order.customer_id + '&delivery_type=' + $scope.ordercallback.order.shipping_lines[0].method_id + '&created_at=' + encodeURIComponent($scope.ordercallback.order.created_at) ).success(function(data) {		
						
						result = JSON.stringify(data);
						$scope.userorders = JSON.parse(result);	
						
						$ionicLoading.hide();
						
						$cordovaToast.showLongBottom('Order successfully updated.');
						
						$state.go($state.current, {}, {reload: true});
			
					}).error(function(){	
					
						callback = JSON.stringify(data);
						
						$ionicLoading.hide();
					
						$rootScope.$broadcast('loading:hide');	
			
						  var alertPopup = $ionicPopup.alert({
							  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
							  template: 'Your order cannot be updated at the moment for some reason. We are working on it. Please try again later.'
						  });
							  alertPopup.then(function(res) {
			
						  });
						  
					});									
		
				})
				.error(function(){
					
					$ionicLoading.hide();
					
					$rootScope.$broadcast('loading:hide');	
							
							var alertPopup = $ionicPopup.alert({
								title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
								template: 'Your order cannot be updated at the moment for some reason. We are working on it. Please try again later.'
							});
								alertPopup.then(function(res) {
									$state.go($state.current, {}, {reload: true});
							});

				});
	}

	$scope.completeorder = function() {	
		
		$scope.json_complete = {
			"order": {
				"status": "completed",
				"payment_details": {
					"paid": true
				}
			}
		}	
			
		$scope.order_json_complete = JSON.stringify($scope.json_complete);
				
		var req = {
		 method: 'PUT',
		 url: '/wc-api/v2/orders/' + $stateParams.orderID + ApiUrl,
		 headers: {
		   'Content-Type': undefined
		 },
		 data: $scope.order_json_complete,
		}
		
		$ionicLoading.show({template: 'One sec... <ion-spinner class="spinner-energized"></ion-spinner>'});
		
		$http(req)
			.success(function(data){
				
					callback = JSON.stringify(data);
					$scope.ordercallback = JSON.parse(callback);	
					
					$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=completeorder&userid=' + $localStorage.UserMeta.id + '&metakey=userorders&metavalue=' + parseInt($scope.ordercallback.order.line_items[0].product_id) + '&order_id=' + parseInt($scope.ordercallback.order.order_number) + '&order_total=' + parseFloat($scope.ordercallback.order.total) + '&order_status=completed&updated_at=' + encodeURIComponent($scope.ordercallback.order.updated_at) + '&item_name=' + encodeURIComponent($scope.ordercallback.order.line_items[0].name) + '&item_id=' + $scope.ordercallback.order.line_items[0].product_id + '&customer_name=' + encodeURIComponent($scope.ordercallback.order.customer.username) + '&customer_id=' + $scope.ordercallback.order.customer_id + '&delivery_type=' + $scope.ordercallback.order.shipping_lines[0].method_id + '&created_at=' + encodeURIComponent($scope.ordercallback.order.created_at) + '&completed_at=' + encodeURIComponent($scope.ordercallback.order.completed_at) ).success(function(data) {			
						
						result = JSON.stringify(data);
						$scope.userorders = JSON.parse(result);	
						
						$ionicLoading.hide();
						
						$cordovaToast.showLongBottom('Order successfully updated.');	
						
						$state.go($state.current, {}, {reload: true});
			
					}).error(function (data){	
					
						$ionicLoading.hide();
					
						$rootScope.$broadcast('loading:hide');	
			
						  var alertPopup = $ionicPopup.alert({
							  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
							  template: 'Your order cannot be updated at the moment for some reason. We are working on it. Please try again later.'
						  });
							  alertPopup.then(function(res) {
			
						  });
						  
					});					
		
				})
				.error(function(){	
				
					$ionicLoading.hide();	
				
					$rootScope.$broadcast('loading:hide');		

							var alertPopup = $ionicPopup.alert({
								title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
								template: 'Your order cannot be updated at the moment for some reason. We are working on it. Please try again later.'
							});
								alertPopup.then(function(res) {
									$state.go($state.current, {}, {reload: true});
							});
						
				});
	}
	
  $scope.sharemyorder = function() {
	  
	var sharing_image = 'https://inmyunimedia1.s3-eu-west-1.amazonaws.com/media/b148f6cd3c7a.png';
	
	var sharing_message = "Just bought '" + $scope.single_order.order.line_items[0].name + "' for £" + $scope.single_order.order.line_items[0].price + " on the @inmyuni app.";
  
	var sharing_link = "/?p=" + $scope.single_order.order.line_items[0].product_id; 
	
	$rootScope.Share = {message: sharing_message, image: sharing_image, link: sharing_link};
	console.log($rootScope.Share);
	
  };
  
	$scope.message = {value: ""};
  
	$scope.send_seller_message = function() {
		
		if (!$scope.message.value) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a slight problem...',
				template: 'Your message cannot be empty!'
			});
				alertPopup.then(function(res) {
			});			
			
		} else {
			
			$ionicLoading.show({template: 'Sending... <ion-spinner class="spinner-energized"></ion-spinner>'});
		
			$scope.json_message = {
				"order_note": {
					"note": $scope.message.value,
					"customer_note": true
				}
			}
			
			$scope.new_order_note = JSON.stringify($scope.json_message);
					
			var req = {
			 method: 'POST',
			 url: '/wc-api/v2/orders/' + $stateParams.orderID + '/notes' + $scope.posturl,
			 headers: {
			   'Content-Type': undefined
			 },
			 data: $scope.new_order_note,
			}
			
			$http(req)
				.success(function(data){
					
						callback = JSON.stringify(data);
						$scope.ordernote_callback = JSON.parse(callback);
						
						var filtered_date = $filter('date')($scope.ordernote_callback.order_note.created_at, "EEEE dd/MM/yyyy @ h:mma");
						
							$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=new_order_note&userid=' + $localStorage.UserMeta.id + '&metakey=messageseller&metavalue=' + $scope.seller_info.post.author.id + '&created_at=' + encodeURIComponent(filtered_date) + '&order_id=' + $stateParams.orderID + '&message=' + encodeURIComponent($scope.message.value) + '&item_title=' + encodeURIComponent($scope.single_order.order.line_items[0].name)).success(function(data) {
								
								$ionicLoading.hide();
											
									$cordovaToast.showLongBottom('Message sent successfully. ' + $scope.seller_info.post.author.name + ' has been notified by email');
						
									$state.go($state.current, {}, {reload: true});
														
									  $timeout(function() {
										 $ionicScrollDelegate.scrollBottom(true); 
									  }, 3000);	
							
							}).error(function(data){
								
								$ionicLoading.hide();
								
								$rootScope.$broadcast('loading:hide');		
								
									var alertPopup = $ionicPopup.alert({
										title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
										template: 'Your message could not be posted for some reason. We are working on it. Please try again later.'
									});
										alertPopup.then(function(res) {
											$state.go($state.current, {}, {reload: true});
									});			
								
							});	
			
						
			}).error(function (data){	
			
				$ionicLoading.hide();
			
				$rootScope.$broadcast('loading:hide');		
	
						var alertPopup = $ionicPopup.alert({
							title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
							template: 'Your message could not be posted for some reason. We are working on it. Please try again later.'
						});
							alertPopup.then(function(res) {
								$state.go($state.current, {}, {reload: true});
						});
	
			});	
		
		}
		
	};

	$scope.send_buyer_message = function() {
		
		if (!$scope.message.value) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a slight problem...',
				template: 'Your message cannot be empty!'
			});
				alertPopup.then(function(res) {
			});			
			
		} else {
			
			$ionicLoading.show({template: 'Sending... <ion-spinner class="spinner-energized"></ion-spinner>'});
		
			$scope.json_message = {
				"order_note": {
					"note": $scope.message.value,
					"customer_note": false
				}
			}
			
			$scope.new_order_note = JSON.stringify($scope.json_message);
					
			var req = {
			 method: 'POST',
			 url: '/wc-api/v2/orders/' + $stateParams.orderID + '/notes' + $scope.posturl,
			 headers: {
			   'Content-Type': undefined
			 },
			 data: $scope.new_order_note,
			}
			
			$http(req)
				.success(function(data){
					
						callback = JSON.stringify(data);
						$scope.ordernote_callback = JSON.parse(callback);
						
						var filtered_date = $filter('date')($scope.ordernote_callback.order_note.created_at, "EEEE dd/MM/yyyy @ h:mma");
						
							$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=new_order_note&userid=' + $localStorage.UserMeta.id + '&metakey=messagebuyer&metavalue=' + $scope.single_order.order.customer_id + '&created_at=' + encodeURIComponent(filtered_date) + '&order_id=' + $stateParams.orderID + '&message=' + encodeURIComponent($scope.message.value) + '&item_title=' + encodeURIComponent($scope.single_order.order.line_items[0].name)).success(function(data) {
								
									$ionicLoading.hide();
											
									$cordovaToast.showLongBottom('Message sent successfully. ' + $scope.single_order.order.customer.username + ' has been notified by email');
						
									$state.go($state.current, {}, {reload: true});
														
									  $timeout(function() {
										 $ionicScrollDelegate.scrollBottom(true); 
									  }, 3000);	
							
							}).error(function(data){
								
								$ionicLoading.hide();
								
								$rootScope.$broadcast('loading:hide');	
								
									var alertPopup = $ionicPopup.alert({
										title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
										template: 'Your message could not be posted for some reason. We are working on it. Please try again later.'
									});
										alertPopup.then(function(res) {
											$state.go($state.current, {}, {reload: true});
									});			
								
							});	
			
						
			}).error(function (data){
				
				$ionicLoading.hide();	
			
				$rootScope.$broadcast('loading:hide');		
	
						var alertPopup = $ionicPopup.alert({
							title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
							template: 'Your message could not be posted for some reason. We are working on it. Please try again later.'
						});
							alertPopup.then(function(res) {
								$state.go($state.current, {}, {reload: true});
						});
	
			});	
		
		}
		
	};
	
	
});	

app.controller('EditItemCtrl', function($scope, $rootScope, $http, $stateParams, $localStorage, WcApiUrl, Urls, DeleteUrl, $state, $ionicPopup, $cordovaToast, $cordovaCamera, $ionicLoading) {
	
	$rootScope.visit_item_id = $stateParams.itemID;
	ApiUrl = WcApiUrl.GetGeneralUrl();
	$scope.posturl = Urls.GetPostUrl();
	
	$scope.hidespinner = false;

	$http.get('/wc-api/v2/products/' + $rootScope.visit_item_id + ApiUrl).success(function(data) {	
	
		$scope.hidespinner = true;
	
		singleproductdata = JSON.stringify(data);
		$scope.single_product = JSON.parse(singleproductdata);
		console.log($scope.single_product);
		  
		// Strip tags
		stripped = $scope.single_product.product.short_description.replace(/<\/?[^>]+(>|$)/g, "");
		cleaned = he.decode(stripped);
		
		$scope.itemdesc = cleaned;
		
		$scope.current_desc = String($scope.itemdesc);
		
		$scope.updateurl = '/wc-api/v2/products/' + $scope.single_product.product.id + $scope.posturl;
		
		$scope.foo = {testvalue: ""};
	
		}).error(function (data){	
		
			$rootScope.$broadcast('loading:hide');		

					var alertPopup = $ionicPopup.alert({
						title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
						template: 'Your item cannot be edited at the moment for some reason. We are working on it. Please try again later.'
					});
						alertPopup.then(function(res) {
							$state.go($state.current, {}, {reload: true});
					});

		});
	
	$http.get('/e8oada3z/get_post/?id=' + $rootScope.visit_item_id + '&post_type=product&userid=' + $localStorage.UserMeta.id).success(function(data) {
		
		singlepostdata = JSON.stringify(data);
		$scope.single_post = JSON.parse(singlepostdata);
		console.log($scope.single_post);	
		
		}).error(function (data){	
		
			$rootScope.$broadcast('loading:hide');		

					var alertPopup = $ionicPopup.alert({
						title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
						template: 'Your item cannot be edited at the moment for some reason. We are working on it. Please try again later.'
					});
						alertPopup.then(function(res) {
							$state.go($state.current, {}, {reload: true});
					});

		});	
		
	$scope.altered = {
	
		title: false,
		price: false,
		desc: false,
		authors: false,
		publisher: false
		
	};

	$scope.hideitem = function() {
		
		$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=hideitem&userid=' + $localStorage.UserMeta.id + '&metakey=useritems&metavalue=' + $rootScope.visit_item_id).success(function(data) {
			
			$cordovaToast.showLongBottom('Item successfully hidden');
			
			$state.go($state.current, {}, {reload: true});
	
		}).error(function (data){	
		
			$rootScope.$broadcast('loading:hide');		

					var alertPopup = $ionicPopup.alert({
						title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
						template: 'Your item cannot be edited at the moment for some reason. We are working on it. Please try again later.'
					});
						alertPopup.then(function(res) {
							$state.go($state.current, {}, {reload: true});
					});

		});
		
	}
	
	$scope.unhideitem = function() {
		
		$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=unhideitem&userid=' + $localStorage.UserMeta.id + '&metakey=useritems&metavalue=' + $rootScope.visit_item_id).success(function(data) {
			
			$cordovaToast.showLongBottom('Item is currently live');
			
			$state.go($state.current, {}, {reload: true});
	
		}).error(function (data){	
		
			$rootScope.$broadcast('loading:hide');		

					var alertPopup = $ionicPopup.alert({
						title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
						template: 'Your item cannot be edited at the moment for some reason. We are working on it. Please try again later.'
					});
						alertPopup.then(function(res) {
							$state.go($state.current, {}, {reload: true});
					});

		});
		
	}
	
	$scope.deleteurl = DeleteUrl.GetDeleteUrl();
	
	  $scope.delitem = function() {
		  
				 var confirmPopup = $ionicPopup.confirm({
				   title: 'Deleting <strong>' + $scope.single_product.product.title + '</strong>',
				   template: 'Are you sure you want to delete this item?'
				 });
				 confirmPopup.then(function(res) {
				   if(res) {
					   
					   $ionicLoading.show({template: 'Deleting... <ion-spinner class="spinner-energized"></ion-spinner>'});
					   
						var deletereq = '/wc-api/v2/products/' + $rootScope.visit_item_id + $scope.deleteurl;
	
						var req = {
						 method: 'DELETE',
						 url: deletereq,
						 headers: {
						   'Content-Type': undefined
						 },
						}
	
						$http(req).success(function(data){
							
									$ionicLoading.hide();
								
										$cordovaToast.showLongBottom('Item successfully deleted');
										$state.go('myitems');	 
							
									})
									.error(function(data, status){
										
										$ionicLoading.hide();
										
												$rootScope.$broadcast('loading:hide');	
														
														var alertPopup = $ionicPopup.alert({
															title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
															template: 'An error occured deleting this item. Please try again later.'
														});
															alertPopup.then(function(res) {
																$state.go($state.current, {}, {reload: true});
														});
														
										});
					
				   } 
	
				 });
		
	  };


	$scope.takePicture = function() {
		
	  var options = {
		quality : 75,
		destinationType : Camera.DestinationType.DATA_URL,
		sourceType : Camera.PictureSourceType.CAMERA,
		allowEdit : true,
		encodingType: Camera.EncodingType.JPEG,
		targetWidth: 720,
		targetHeight: 720,
		popoverOptions: CameraPopoverOptions,
		saveToPhotoAlbum: false
	  };
	
	  $cordovaCamera.getPicture(options).then(function(imageData) {
		$scope.imgURI = "data:image/jpeg;base64," + imageData;
		$scope.img64 = imageData;
	  }, function(err) {
		alert ("An error occured: " + err);
	  });
  
	};
	
	$scope.selectPicture = function() {
		
		var options = {
			quality : 75,
			destinationType : Camera.DestinationType.DATA_URL,
			sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
			allowEdit : true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 720,
			targetHeight: 720,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false
		};
	
		$cordovaCamera.getPicture(options).then(function(imageData) {
		$scope.imgURI = "data:image/jpeg;base64," + imageData;
		$scope.img64 = imageData;
		
	}, function(err) {
		alert ("An error occured: " + err);
	});

};


	
	$scope.uploadpic = function() {
	
	// Upload the image and attach to product
	
	basedata = $scope.img64;
	
	$ionicLoading.show({template: 'Uploading... <ion-spinner class="spinner-energized"></ion-spinner>'});
	
	$http({
		method: 'POST',
		url: '/iupload.php',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		transformRequest: function(obj) {
			var str = [];
			for(var p in obj)
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			return str.join("&");
		},
		data: {base64File: basedata, newitemid: $scope.single_product.product.id, imageauthor: $localStorage.UserMeta.id}
		
	}).success(function (data){
		
		$ionicLoading.hide();
		
		$cordovaToast.showLongBottom('Image uploaded successfully.');	
	
	//	alert(JSON.stringify(data));
		var attachmentdata = JSON.stringify(data);
		var pattachmentdata = JSON.parse(attachmentdata);
		$scope.attachimageid = pattachmentdata.imageid;
	//		alert($localStorage.attachimageid);
		$scope.attachimageurl = pattachmentdata.imageurl;
	// Set the new attachment as the product's featured image.
	
	var attachurl = '/wc-api/v2/products/' + $scope.single_product.product.id + $scope.posturl;
	
	var attachjson = {
	  "product" : {
		"images" : [
		  {
			"position" : 0,
			"id" : $scope.attachimageid,
			"src" : $scope.attachimageurl
		  }
		 ]
	  }
	}
	
	var req = {
	 method: 'PUT',
	 url: attachurl,
	 headers: {
	   'Content-Type': undefined
	 },
	 data: attachjson,
	}
			
		$http(req)
		.success(function(data){
			
			$state.go($state.current, {}, {reload: true});
	
			})
			
			.error(function(data){
				
					$rootScope.$broadcast('loading:hide');	
							
							var alertPopup = $ionicPopup.alert({
								title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
								template: 'An error occured. Please try again later.'
							});
								alertPopup.then(function(res) {
									$state.go($state.current, {}, {reload: true});
							});
				});
				
				
		}).error(function (data){
			
					$rootScope.$broadcast('loading:hide');	
							
							var alertPopup = $ionicPopup.alert({
								title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
								template: 'An error occured. Please try again later.'
							});
								alertPopup.then(function(res) {
									$state.go($state.current, {}, {reload: true});
							});
		});
		
	} // $scope.uploadpic END	
	

	$scope.runupdate = function() { 
	 
		if ($scope.altered.title == true) {
			
			var updatejson = {
			  "product" : {
				"title" : $scope.single_product.product.title
			  }
			}
			
			var req = {
			 method: 'PUT',
			 url: $scope.updateurl,
			 headers: {
			   'Content-Type': undefined
			 },
			 data: updatejson,
			}
			
			$http(req)
			.success(function(data){
				
			}).error(function (data){
				
				$rootScope.$broadcast('loading:hide');	
						
						var alertPopup = $ionicPopup.alert({
							title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
							template: 'An error occured. Please try again later.'
						});
							alertPopup.then(function(res) {
								$state.go($state.current, {}, {reload: true});
						});
			});		
			
		}
	
		if ($scope.altered.price == true) {
			
			var updatejson = {
			  "product" : {
				"price" : parseInt($scope.single_product.product.price)
			  }
			}
			
			var req = {
			 method: 'PUT',
			 url: $scope.updateurl,
			 headers: {
			   'Content-Type': undefined
			 },
			 data: updatejson,
			}
			
			$http(req)
			.success(function(data){
				
			}).error(function (data){
				
				$rootScope.$broadcast('loading:hide');	
						
						var alertPopup = $ionicPopup.alert({
							title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
							template: 'An error occured. Please try again later.'
						});
							alertPopup.then(function(res) {
								$state.go($state.current, {}, {reload: true});
						});
			});		
			
		}
		
		if ($scope.altered.desc == true) {		
			
			updated_description = String('<p>' + $scope.foo.testvalue + '</p>');
			
			var updatejson = {
			  "product" : {
				"short_description" : updated_description
			  }
			}
			
			var req = {
			 method: 'PUT',
			 url: $scope.updateurl,
			 headers: {
			   'Content-Type': undefined
			 },
			 data: updatejson,
			}
			
			$http(req)
			.success(function(data){
				
				delete $localStorage.itemdesc;
				
			}).error(function (data){
				
				$rootScope.$broadcast('loading:hide');	
						
						var alertPopup = $ionicPopup.alert({
							title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
							template: 'An error occured. Please try again later.'
						});
							alertPopup.then(function(res) {
								$state.go($state.current, {}, {reload: true});
						});
			});		
			
		}
		
		if ($scope.altered.authors || $scope.altered.publisher == true) {
			
			var updatejson = {
			  "product" : {
				"attributes": [
							{
								"name": "Isbn",
								"slug": "Isbn",
								"position": 0,
								"visible": false,
								"variation": false,
								"options": [
									$scope.single_product.product.attributes[0].options[0]
								]
							},
							{
								"name": "Publisher",
								"slug": "Publisher",
								"position": 1,
								"visible": false,
								"variation": false,
								"options": [
									$scope.single_product.product.attributes[1].options[0]
								]
							},
							{
								"name": "Authors",
								"slug": "Authors",
								"position": 2,
								"visible": false,
								"variation": false,
								"options": [
									$scope.single_product.product.attributes[2].options[0]
								]
							},
							{
								"name": "Condition",
								"slug": "Condition",
								"position": 3,
								"visible": false,
								"variation": false,
								"options": [
									$scope.single_product.product.attributes[3].options[0]
								]
							},
							{
								"name": "Item Type",
								"slug": "Item Type",
								"position": 4,
								"visible": false,
								"variation": false,
								"options": [
									$scope.single_product.product.attributes[4].options[0]
								]
							},
							{
								"name": "Sale Type",
								"slug": "Sale Type",
								"position": 5,
								"visible": false,
								"variation": false,
								"options": [
									$scope.single_product.product.attributes[5].options[0]
								]
							},
							{
								"name": "Other Data",
								"slug": "Other Data",
								"position": 6,
								"visible": false,
								"variation": false,
								"options": [
									$scope.single_product.product.attributes[6].options[0]
								]
							}
						]
			  }
			}
			
			var req = {
			 method: 'PUT',
			 url: $scope.updateurl,
			 headers: {
			   'Content-Type': undefined
			 },
			 data: updatejson,
			}
			
			$http(req)
			.success(function(data){
				
			}).error(function (data){
				
				$rootScope.$broadcast('loading:hide');	
						
						var alertPopup = $ionicPopup.alert({
							title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
							template: 'An error occured. Please try again later.'
						});
							alertPopup.then(function(res) {
								$state.go($state.current, {}, {reload: true});
						});
			});							
			
		}
		
		
		if ($scope.altered.title || $scope.altered.price || $scope.altered.desc || $scope.altered.authors || $scope.altered.publisher == true) {
		
			$state.go($state.current, {}, {reload: true});
			
			$cordovaToast.showLongBottom('Item updated successfully.');	
		
		}
		
	};

});	


