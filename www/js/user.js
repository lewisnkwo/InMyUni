app.controller("SignupCtrl", function ($scope, $http, $rootScope, $localStorage, $ionicPopup, $state, $cordovaToast, Categories, Courses, $ionicSideMenuDelegate, $ionicLoading) {

$scope.unilist = Categories.GetUnis();

$scope.courselist = Courses.GetCourses();

$rootScope.register = {
	username: '',
	email: '',
	pass: '',
	name: '',
	label: '',
	uni: $scope.unilist.product_categories[0].id,
	course: $scope.courselist.course_list[0].id
};

// Check if something starts with a 'value'

/* if ( typeof String.prototype.startsWith != 'function' ) {
  String.prototype.startsWith = function( str ) {
    return this.substring( 0, str.length ) === str;
  }
};
alert( "hello world".startsWith( "hello" ) ); */

	// Check if something end with a 'value'

	if ( typeof String.prototype.endsWith != 'function' ) {
	  String.prototype.endsWith = function( str ) {
		return this.substring( this.length - str.length, this.length ) === str;
	  }
	};

$scope.signmeup = function() {

if ($localStorage.UserMeta) {
  delete  $localStorage.UserMeta;
}

if (!$rootScope.register.email.endsWith( ".ac.uk" )) {

var alertPopup = $ionicPopup.alert({
	   title: 'There is a slight problem...',
	   template: 'You need an active UK university email address to sign up with Inmyuni.'
	 });
	 alertPopup.then(function(res) {
	 });

} else {

// Get Nonce

$http.get('/e8oada3z/get_nonce/?controller=user&method=register').
success(function(data) {

	response = JSON.stringify(data);
	gotnonce = JSON.parse(response);

	$ionicLoading.show({template: '<ion-spinner class="spinner-energized"></ion-spinner> One Sec...'})

		$http.get("/e8oada3z/user/register/?username=" + encodeURIComponent($rootScope.register.username) + "&email=" + encodeURIComponent($rootScope.register.email) + "&nonce=" + gotnonce.nonce + "&display_name=" + $rootScope.register.name + "&first_name=" + $rootScope.register.name + "&user_pass=" + encodeURIComponent($rootScope.register.pass)).
		success(function(data) {

		  console.log(JSON.stringify(data));

		  resp = JSON.stringify(data);
		  gotcookie = JSON.parse(resp);

		  if (gotcookie.error === "Username already exists.") {

			$ionicLoading.hide()

			  var alertPopup = $ionicPopup.alert({
				  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				  template: 'This username already exists. Please try another one.'
			  });
				  alertPopup.then(function(res) {
			  });

		  } else if (gotcookie.error === "Username is invalid.") {

			$ionicLoading.hide()

			  var alertPopup = $ionicPopup.alert({
				  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				  template: 'This username is invalid. Please only use lowercase/uppercase characters, numbers &amp; underscores.'
			  });
				  alertPopup.then(function(res) {
			  });

		  } else if (gotcookie.error === "E-mail address is invalid.") {

			$ionicLoading.hide()

			  var alertPopup = $ionicPopup.alert({
				  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				  template: 'This email address is invalid. Please enter a vaild university email address.'
			  });
				  alertPopup.then(function(res) {
			  });

		  } else if (gotcookie.error === "E-mail address is already in use.") {

			$ionicLoading.hide()

			  var alertPopup = $ionicPopup.alert({
				  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				  template: 'This email address is already in use. Please enter another email address.'
			  });
				  alertPopup.then(function(res) {
			  });

		  } else {

			  $localStorage.gotcookie = gotcookie.cookie;
			  $localStorage.userid = gotcookie.user_id;

				  // Update Uni, Cource

					  $http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.gotcookie + '&userid=' + $localStorage.userid + '&metakey=update_new_user&metavalue=' + $localStorage.userid + '&uni=' + $rootScope.register.uni + '&course=' + $rootScope.register.course ).success(function(data) {

						$scope.$broadcast('updated-user-meta');
						console.log(data);
					  }).
						error(function(data) {
							$ionicLoading.hide()
						  console.log(data);
						});

						$scope.$on('updated-user-meta', function(event) {
						// Get user info, add to $localStorage

							$http.get('/e8oada3z/user/get_userinfo/?user_id=' + $localStorage.userid).
							success(function(data) {
							console.log(JSON.stringify(data));

							var gotuserdata = data;

								  if (gotuserdata.status !== "error") {

									  $localStorage.UserMeta = {
										  cookie: $localStorage.gotcookie,
										  avatar: 'img/default_avatar_male.jpg',
										  capabilities: gotuserdata.capabilities,
										  bio: gotuserdata.description,
										  displayname: gotuserdata.displayname,
										  email: gotuserdata.email,
										  firstname: gotuserdata.firstname,
										  lastname: gotuserdata.lastname,
										  id: gotuserdata.id,
										  handle: gotuserdata.nicename, // Shop name or @handle
										  url: gotuserdata.url,
										  username: gotuserdata.username,
										  registered: gotuserdata.registered,
										  uni: gotuserdata.uni,
										  course: gotuserdata.course,
										  facebook: gotuserdata.facebook,
										  google_plus: gotuserdata.googleplus,
										  twitter: gotuserdata.twitter,
										  rating_avg: 0,
										  rating_total: 0,
										  followers: 0,
										  following: 0,
										  ck: gotuserdata.ck,
										  cs: gotuserdata.cs,
										  verify_account_1: gotuserdata.verify_account_1,
										  verify_account_2: gotuserdata.verify_account_2
									  };

									  $rootScope.currentusermeta = {

										  id: $localStorage.UserMeta.id,
										  firstname: $localStorage.UserMeta.firstname,
										  lastname: $localStorage.UserMeta.lastname,
										  avatar: $localStorage.UserMeta.avatar,
										  registered: $localStorage.UserMeta.registered,
										  username: $localStorage.UserMeta.username,
										  bio: $localStorage.UserMeta.bio,
										  displayname: $localStorage.UserMeta.displayname,
										  email: $localStorage.UserMeta.email,
										  handle: $localStorage.UserMeta.handle,
										  url: $localStorage.UserMeta.url,
										  uni: $localStorage.UserMeta.uni,
										  course: $localStorage.UserMeta.course,
										  facebook: $localStorage.UserMeta.facebook,
										  google_plus: $localStorage.UserMeta.google_plus,
										  twitter: $localStorage.UserMeta.twitter,
										  rating_avg: 0,
										  rating_total: 0,
										  followers: 0,
										  following: 0,
										  ck: $localStorage.UserMeta.ck,
										  cs: $localStorage.UserMeta.cs,
										  verify_account_1: $localStorage.UserMeta.verify_account_1,
										  verify_account_2: $localStorage.UserMeta.verify_account_2

									  };

									  $rootScope.role = "seller";

									 $ionicLoading.hide()

								    $cordovaToast.showLongTop('Welcome, ' + $localStorage.UserMeta.firstname + '!');

									$state.go('explore');

								  } else {

									  $ionicLoading.hide()

									  var alertPopup = $ionicPopup.alert({
											 title: 'There is a problem <i class="icon ion-sad popuplink"></i>',
											 template: 'We cannot currently register you for some reason. Please try again later.'
										   });
										   alertPopup.then(function(res) {
										   });

								  }

						  }).

							error(function(data) {
								$ionicLoading.hide()
							  console.log(JSON.stringify(data));
							});
						}); // END $scope.$on 'updated-user-meta'

		  } // END gotcookie.error === "Username already exists."

		}).
		error(function(data) {
			$ionicLoading.hide()
		  console.log(JSON.stringify(data));
		});

	  }).
	  error(function(data) {
		  $ionicLoading.hide()
		console.log(JSON.stringify(data));
	  });

	} // if endsWith

  };


  $scope.change = {
	new_pass: '',
	confirm_pass: '',
	secret_key: ''
};

  $scope.resetpass = function() {

		  $http.get('/e8oada3z/user/reset_emails/?action=sendreset&user_email=' + $scope.resetemail).success(function(data) {

			  console.log(data);

			  var resetresult = data;

					if (resetresult.status !== 'error') {

						if (resetresult.msg === 'Email does not exist') {

							var alertPopup = $ionicPopup.alert({
								title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
								template: 'The email address that you entered does not exist on our systems. Please amend and try again.'
							});
								alertPopup.then(function(res) {
								  $state.go($state.current, {}, {reload: true});
							});

						} else {

						  $rootScope.reset_asked = true;

						  $state.go('changepassword');

						  $rootScope.resetpw_email = $scope.resetemail;

						}

					} else {

						var alertPopup = $ionicPopup.alert({
							title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
							template: 'Cannot complete this request, please try again later.'
						});
							alertPopup.then(function(res) {
							  $state.go($state.current, {}, {reload: true});
						});

					}

		  }).error(function (data){

			  console.log(data);

				  var alertPopup = $ionicPopup.alert({
					  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					  template: 'Cannot complete this request, please try again later.'
				  });
					  alertPopup.then(function(res) {
				  });

		  });

  };

  $scope.changepass = function() {

  	if ( $rootScope.reset_asked === true ) {

			if ($scope.change.secret_key === undefined) {

				var alertPopup = $ionicPopup.alert({
					title: '<i class="icon ion-key popuplink"></i> No Key?',
					template: 'No key found. Please enter it and submit again.'
				});
					alertPopup.then(function(res) {
				});

			}

			if ($scope.change.new_pass === $scope.change.confirm_pass) {

				  $http.get('/e8oada3z/user/reset_emails/?action=changepass&user_email=' + $rootScope.resetpw_email + '&newpw=' + encodeURIComponent($scope.change.confirm_pass) + '&secret_key=' + encodeURIComponent($scope.change.secret_key)).success(function(data) {

					  var passwordresult = data;

					  if (passwordresult.status !== 'error') {

							if (passwordresult.msg === 'Email does not exist') {

								  var alertPopup = $ionicPopup.alert({
									  title: '<i class="icon ion-alert popuplink"></i> Email address not found',
									  template: 'The email address that you entered does not exist on our systems. Please amend and try again.'
								  });
									  alertPopup.then(function(res) {
								  });

							} else if (passwordresult.msg === 'Keys do not match') {

								  var alertPopup = $ionicPopup.alert({
									  title: '<i class="icon ion-alert popuplink"></i> Keys do not match',
									  template: 'The secret key that you entered does not match the key we have on our systems. Please try again, or re-submit another password reset request.'
								  });
									  alertPopup.then(function(res) {
								  });


							} else {

							  console.log(data);

								  var alertPopup = $ionicPopup.alert({
									  title: 'Change Successful!',
									  template: 'Now you can login with your new password.'
								  });
									  alertPopup.then(function(res) {
								  });

							  $rootScope.resetpw_email = '';

							  $state.go('login');
							}

					  } else {

							  var alertPopup = $ionicPopup.alert({
								  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
								  template: 'Cannot complete this request, please try again later.'
							  });
								  alertPopup.then(function(res) {
									$state.go($state.current, {}, {reload: true});
							  });

					  }

				  }).error(function (data){

					  console.log(data);

						  var alertPopup = $ionicPopup.alert({
							  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
							  template: 'Cannot complete this request, please try again later.'
						  });
							  alertPopup.then(function(res) {
								$state.go($state.current, {}, {reload: true});
						  });

				  });

		  } else {

			var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'Both passwords do not match. Please enter them again. (Note: The Secret Key field cannot be left empty.)'
					});
				alertPopup.then(function(res) {
					});

		  }

	} else {

		$state.go('login');

	}

  };

});

app.controller('AuthCtrl', function ($scope, $rootScope, $http, $state, $ionicPopup, $localStorage, $cordovaToast, $cordovaOauth, $ionicSideMenuDelegate, ImageDataGeneral, $ionicLoading, cssInjector) {

if (ionic.Platform.isAndroid() == true) {

	cssInjector.add("css/style-android.css");

} else {

	cssInjector.add("css/style-ios.css");

}

ImageDataGeneral.success(function(data){

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

});

  $scope.credentials = {
    username: '',
    password: ''
  };

  $rootScope.role = "anon";

// Login the User

$scope.authuser = function() {

if ($scope.credentials !== undefined || $scope.credentials.username !== " " || $scope.credentials.password !== " ") {

	$ionicLoading.show({template: '<ion-spinner class="spinner-energized"></ion-spinner> Logging in...'})

 var logininfo = $scope.credentials;

	$http.get('/e8oada3z/get_nonce/?controller=auth&method=generate_auth_cookie').
	  success(function(data) {
		var response = JSON.stringify(data);
		var getnonce = JSON.parse(response);

	  $http.get('/e8oada3z/auth/generate_auth_cookie/?nonce=' + getnonce.nonce + '&username=' + logininfo.username + '&password=' + encodeURIComponent(logininfo.password)).
	   success(function(data) {
	  console.log(JSON.stringify(data));
	 var  gotuserdata = data;

	  // Store the logged in user's data and cookie
		  if (gotuserdata.status !== "error") {

			  $localStorage.UserMeta = {
				  cookie: gotuserdata.cookie,
				  avatar: gotuserdata.user.avatar[0],
				  capabilities: gotuserdata.user.capabilities,
				  bio: gotuserdata.user.description,
				  displayname: gotuserdata.user.displayname,
				  email: gotuserdata.user.email,
				  firstname: gotuserdata.user.firstname,
				  lastname: gotuserdata.user.lastname,
				  id: gotuserdata.user.id,
				  handle: gotuserdata.user.nicename, // Shop name or @handle
				  url: gotuserdata.user.url,
				  username: gotuserdata.user.username,
				  registered: gotuserdata.user.registered,
				  uni: gotuserdata.user.uni,
				  course: gotuserdata.user.course,
				  facebook: gotuserdata.user.facebook,
				  google_plus: gotuserdata.user.googleplus,
				  twitter: gotuserdata.user.twitter,
				  rating_avg: 0,
				  rating_total: 0,
				  followers: 0,
				  following: 0,
				  ck: gotuserdata.user.ck,
				  cs: gotuserdata.user.cs,
				  verify_account_1: gotuserdata.user.verify_account_1,
				  verify_account_2: gotuserdata.user.verify_account_2
			  };

			  $rootScope.currentusermeta = {

				  id: $localStorage.UserMeta.id,
				  firstname: $localStorage.UserMeta.firstname,
				  lastname: $localStorage.UserMeta.lastname,
				  avatar: $localStorage.UserMeta.avatar,
				  registered: $localStorage.UserMeta.registered,
				  username: $localStorage.UserMeta.username,
				  bio: $localStorage.UserMeta.bio,
				  displayname: $localStorage.UserMeta.displayname,
				  email: $localStorage.UserMeta.email,
				  handle: $localStorage.UserMeta.handle,
				  url: $localStorage.UserMeta.url,
				  uni: $localStorage.UserMeta.uni,
				  course: $localStorage.UserMeta.course,
				  facebook: $localStorage.UserMeta.facebook,
				  google_plus: $localStorage.UserMeta.google_plus,
				  twitter: $localStorage.UserMeta.twitter,
				  rating_avg: 0,
				  rating_total: 0,
				  followers: 0,
				  following: 0,
				  ck: $localStorage.UserMeta.ck,
				  cs: $localStorage.UserMeta.cs,
				  verify_account_1: $localStorage.UserMeta.verify_account_1,
				  verify_account_2: $localStorage.UserMeta.verify_account_2

			  };

			  $rootScope.role = "seller";

			  $ionicLoading.hide();

			  console.log($localStorage.UserMeta);

			  $cordovaToast.showLongTop('Hi again, ' + $localStorage.UserMeta.firstname + '!');
			  $state.go('explore');

		  } else {

			  $ionicLoading.hide();

			  var alertPopup = $ionicPopup.alert({
					 title: 'There is a problem <i class="icon ion-sad popuplink"></i>',
					 template: '<h4>Username or password is incorrect. Please retry!</h4>'
				   });
				   alertPopup.then(function(res) {
				   });

		  }

		}).
		error(function(data) {
			$ionicLoading.hide();
		  console.log(JSON.stringify(data));
		});

	  }).
	  error(function(data) {
		  $ionicLoading.hide();
		console.log(JSON.stringify(data));
	  });

  } else {

	  $ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
		    title: 'There is a problem <i class="icon ion-sad popuplink"></i>',
            template: '<h4>Username or password is empty. At least enter something!</h4>'
        	 });
        	 alertPopup.then(function(res) {
			 });
  }

  };

$scope.loggingout = function() {

 // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
	 template: 'Are you sure you want to log out?',
     title: 'Enjoyed your session?',
     scope: $scope,
     buttons: [
       { text: 'Continue',
	   	 onTap: function(e) {
		 }
	   },
       {
         text: 'Logout',
         type: 'button-assertive',
         onTap: function(e) {
			$scope.logout();
         }
       }
     ]
   });

};

// Logout the User

  $scope.logout = function() {

  $ionicLoading.show({template: 'Logging out... <ion-spinner class="spinner-energized"></ion-spinner>'});

 var logininfo = $scope.credentials;

var	usercookie = $localStorage.UserMeta.cookie  === 'undefined' ? $localStorage.gotcookie : $localStorage.UserMeta.cookie;

	$http.get('/e8oada3z/auth/validate_auth_cookie/?cookie=' + usercookie).
	  success(function(data) {
//		console.log(JSON.stringify(data));
	var	validatecookie = data;

		if (validatecookie.status === "ok") {

			$http.get('/e8oada3z/auth/clear_auth_cookie/?cookie=' + usercookie).
	 		 success(function(data) {
//				console.log(JSON.stringify(data));
			var	clearcookie = data;

					if (clearcookie.status === "ok") {

					delete $localStorage.UserMeta;

					if ($localStorage.userid !== undefined) {

						delete $localStorage.userid;

					}

					if ($localStorage.gotcookie !== undefined) {

						delete $localStorage.gotcookie;

					}

						if ($localStorage.UserMeta === undefined) {

							$ionicLoading.hide();

							$rootScope.role = "anon";

			    			$cordovaToast.showLongBottom('Logged out successfully.');
							$state.go('login');

						} else {

					    // Log event

						}

					// 'if (clearcookie.valid == true)' statement can be used somewhere.

					} else {

					// Log event

					}

			  }).
			  error(function(data) {
				$ionicLoading.hide()
				console.log(JSON.stringify(data));
			  });

		} else {

			delete $localStorage.UserMeta;
			delete $localStorage.userid;

			$ionicLoading.hide()

			$state.go('login');
			$rootScope.role = "anon";
//            $cordovaToast.showLongBottom('Authentication error! Logging you out...');

			// Still clear the cookie and user meta, but I could add a logging system by sending data to the server for this event here...

		}

	  }).
	  error(function(data) {

		 $ionicLoading.hide()
		console.log(JSON.stringify(data));
	  });

  };

$scope.uiRouterState = $state;

// Login with Facebook

    $scope.loginfb = function() {

			$cordovaOauth.facebook("316371201897256", ["email"]).then(function(result) {
				$localStorage.accessToken = result.access_token;
			var	accesstokenurl = "/e8oada3z/user/fb_connect/?access_token=" + $localStorage.accessToken;

					  $http.get(accesstokenurl).
				  success(function(data) {
//					  console.log(JSON.stringify(data));

					var  gotuserdata = data;

					if (gotuserdata.status !== "error") {

							$localStorage.UserMeta = {
								cookie: gotuserdata.cookie,
								avatar: $rootScope.profileData.picture.data.url, // For now, use avatar retreived from Facebook. Later, use the actual server avatar.
								id: gotuserdata.wp_user_id,
								url: '/profile/' + gotuserdata.user_login,
								username: gotuserdata.user_login
							};

							$rootScope.visit_profile_id = $localStorage.UserMeta.id;

							$rootScope.currentusermeta = {

								id: $localStorage.UserMeta.id,
								firstname: $rootScope.profileData.name, // For now, use First Name retreived from Facebook. Later, use the actual server first name.
								avatar: $rootScope.profileData.picture.data.url

							};

														$rootScope.role = "seller";
														$rootScope.usingfacebook = true;

										//			    $cordovaToast.showLongTop('Welcome, ' + $localStorage.UserMeta.firstname + '!');
														$state.go('sell');
														$ionicSideMenuDelegate.toggleLeft();

					} else {

							var alertPopup = $ionicPopup.alert({
								   title: 'There is a problem <i class="icon ion-sad popuplink"></i>',
								   template: '<h4>We cannot register you at the moment for some reason. Please try again later.</h4>'
								 });
								 alertPopup.then(function(res) {
								 });

					}


					}).
				  error(function(data) {

						var alertPopup = $ionicPopup.alert({
							   title: 'There is a problem <i class="icon ion-sad popuplink"></i>',
							   template: '<h4>Cannot currently sign you in with Facebook. We are looking into it.</h4>'
							 });
							 alertPopup.then(function(res) {
							 });

					console.log(JSON.stringify(data));
					});

			}, function(error) {

						var alertPopup = $ionicPopup.alert({
							   title: 'There is a problem <i class="icon ion-sad popuplink"></i>',
							   template: '<h4>There was a problem signing you in! Error: "' + error + '"</h4>'
							 });
							 alertPopup.then(function(res) {
							 });
			});

			if($localStorage.hasOwnProperty("accessToken") === true) {
				$http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,picture", format: "json" }}).then(function(result) {
					$rootScope.profileData = result.data;
				}, function(error) {

						var alertPopup = $ionicPopup.alert({
							   title: 'There is a problem <i class="icon ion-sad popuplink"></i>',
							   template: '<h4>There was a problem retrieving your details. Error: "' + error + '"</h4>'
							 });
							 alertPopup.then(function(res) {
							 });
				});
			} else {
			alert('You are currently not signed into Facebook. Please go the login page and try again.');

			}
    }; // END $scope.loginfb

// Login with Google

 $scope.logingoogle = function() {

	$cordovaOauth.google("938398793918-tnl80s00hndvadakl1b7q7enhhdl5tbv.apps.googleusercontent.com", ["https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
//		alert("Response Object -> " + JSON.stringify(result));
		var googleresp = result;
		// googleresp.access_token is the Google access token
		// Access token lasts for 1 hour (3600 secs)

								  $http.get('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + googleresp.access_token).
								  success(function(data) {
//								  alert(JSON.stringify(data));
								var  googlereq = data;

									if (googlereq.user_id !== undefined) {

										$rootScope.google_tokenurl = 'https://www.googleapis.com/plus/v1/people/' + googlereq.user_id + '?access_token=' + googleresp.access_token;

										  $http.get($rootScope.google_tokenurl).
										  success(function(data) {
//										  alert(JSON.stringify(data));

										  $rootScope.googleprofile = data;

											var	accesstokenurl = "/e8oada3z/user/google_connect/?access_token=" + googleresp.access_token;

														  $http.get(accesstokenurl).
													  success(function(data) {
//														  console.log(JSON.stringify(data));

													var	 gotuserdata = data;

														if (gotuserdata.status !== "error") {

																$localStorage.UserMeta = {
																	cookie: gotuserdata.cookie,
																	avatar: $rootScope.googleprofile.image.url, // For now, use avatar retreived from Facebook. Later, use the actual server avatar.
																	id: gotuserdata.wp_user_id,
																	url: '/profile/' + gotuserdata.user_login,
																	username: gotuserdata.user_login
																};

																$rootScope.visit_profile_id = $localStorage.UserMeta.id;

																$rootScope.currentusermeta = {
																	id: $localStorage.UserMeta.id,
																	firstname: $rootScope.googleprofile.name.givenName, // For now, use First Name retreived from Facebook. Later, use the actual server first name.
																	avatar: $rootScope.googleprofile.image.url
																};

														$rootScope.role = "seller";
														$rootScope.usinggoogle = true;

										//			    $cordovaToast.showLongTop('Welcome, ' + $localStorage.UserMeta.firstname + '!');
														$state.go('sell');
														$ionicSideMenuDelegate.toggleLeft();

														} else {

																var alertPopup = $ionicPopup.alert({
																	   title: 'There is a problem <i class="icon ion-sad popuplink"></i>',
																	   template: '<h4>We cannot register you at the moment for some reason. Please try again later.</h4>'
																	 });
																	 alertPopup.then(function(res) {
																	 });

														}


														}).
													  error(function(data) {

														var  error = JSON.parse(data);

															var alertPopup = $ionicPopup.alert({
																   title: 'There is a problem <i class="icon ion-sad popuplink"></i>',
																   template: '<h4>Cannot currently sign you in with Google. We are looking into it.</h4>'
																 });
																 alertPopup.then(function(res) {
																 });

//														console.log(JSON.stringify(data));
														});


											}).
											  error(function(data) {
											//	console.log(JSON.stringify(data));
											  });

									} else {

										var alertPopup = $ionicPopup.alert({
											   title: 'There is a problem <i class="icon ion-sad popuplink"></i>',
											   template: '<h4>There was a problem signing you in! Error: "' + googlereq.error + '"</h4>'
											 });
											 alertPopup.then(function(res) {
											 });

									}


								}).
								  error(function(data) {
								//	console.log(JSON.stringify(data));
								  });

	}, function(error) {
						var alertPopup = $ionicPopup.alert({
							   title: 'There is a problem <i class="icon ion-sad popuplink"></i>',
							   template: '<h4>There was a problem signing you in! Error: "' + error + '"</h4>'
							 });
							 alertPopup.then(function(res) {
							 });
	});

 }; // END $scope.logingoogle

 $scope.logintwitter = function() {

  $scope.data = {};

 // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
	 template: '<input type="email" ng-model="data.email">',
     title: 'Please enter your email address:',
     subTitle: 'Your student email is required',
     scope: $scope,
     buttons: [
       { text: 'Cancel',
	   	 onTap: function(e) {
		 }
	   },
       {
         text: '<b>Go</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!$scope.data.email) {
             //don't allow the user to close unless they enter their email
             e.preventDefault();
           } else {
			       return {
       					 run: $scope.functiongo(),
 				       email: $scope.data.email
    				};
           }
         }
       }
     ]
   });

	$scope.functiongo = function() {

        $cordovaOauth.twitter("bunaPUkZobgpdsYg2f9btDzIa", "zii6ysKTH6gQh42C1Bv2Uo0FQqjXkBMlkSPp297LoCXa8ZPhWM").then(function(result) {
         var  twitter_resp = result;
			// Returns: twitter_resp.ouath_token, twitter_resp.oauth_token_secret, twitter_resp.user_id, twitter_resp.screen_name

				var accesstokenurl = "https://api.twitter.com/1.1/users/show.json?oauth_token=" + twitter_resp.oauth_token + "&screen_name=" + twitter_resp.screen_name;
				alert(accesstokenurl);

					  $http.get(accesstokenurl).
				  success(function(data) {

					  $rootScope.twitterprofile = data;

											var	twitterurl = "/e8oada3z/user/twitter_connect/?access_token=" + twitter_resp.oauth_token + "&screen_name=" + twitter_resp.screen_name + "&user_email=" + encodeURIComponent($scope.data.email);
												alert(twitterurl);
														  $http.get(twitterurl).
													  success(function(data) {

													  console.log(JSON.stringify(data));

														var  gotuserdata = data;

														if (gotuserdata.status !== "error") {

																$localStorage.UserMeta = {
																	cookie: gotuserdata.cookie,
																	avatar: $rootScope.twitterprofile.profile_image_url_https, // For now, use avatar retreived from Facebook. Later, use the actual server avatar.
																	id: gotuserdata.wp_user_id,
																	url: '/profile/' + gotuserdata.user_login,
																	username: gotuserdata.user_login
																};

																$rootScope.visit_profile_id = $localStorage.UserMeta.id;

																$rootScope.currentusermeta = {
																	id: $localStorage.UserMeta.id,
																	firstname: $rootScope.twitterprofile.name, // For now, use First Name retreived from Facebook. Later, use the actual server first name.
																	avatar: $rootScope.twitterprofile.profile_image_url_https
																};

														$rootScope.role = "seller";
														$rootScope.usingtwitter = true;

										//			    $cordovaToast.showLongTop('Welcome, ' + $localStorage.UserMeta.firstname + '!');
														$state.go('sell');
														$ionicSideMenuDelegate.toggleLeft();

														} else {

																var alertPopup = $ionicPopup.alert({
																	   title: 'There is a problem <i class="icon ion-sad popuplink"></i>',
																	   template: '<h4>We cannot register you at the moment for some reason. Please try again later.</h4>'
																	 });
																	 alertPopup.then(function(res) {
																	 });

														}


														}).
													  error(function(data) {

														 alert(JSON.stringify(data));

															var alertPopup = $ionicPopup.alert({
																   title: 'There is a problem <i class="icon ion-sad popuplink"></i>',
																   template: '<h4>Cannot currently sign you in with Twitter. We are looking into it.</h4>'
																 });
																 alertPopup.then(function(res) {
																 });

//														console.log(JSON.stringify(data));
														});


								}).
								  error(function(data) {
														 alert(JSON.stringify(data));
								  });

        }, function(error) {
						var alertPopup = $ionicPopup.alert({
							   title: 'There is a problem <i class="icon ion-sad popuplink"></i>',
							   template: '<h4>There was a problem signing you in! Error: "' + error + '"</h4>'
							 });
							 alertPopup.then(function(res) {
							 });
        });

 }; // END functiongo

 }; // END $scope.logintwitter

$scope.showownprofile = function() {

	$localStorage.ownprofile = '';
	$localStorage.ownprofile = true;
	console.log($localStorage.ownprofile);

};

});


app.controller("EditProfileCtrl", function ($scope, $http, $rootScope, $localStorage, $ionicPopup, $state, $cordovaToast, $cordovaCamera, $ionicScrollDelegate, $cordovaClipboard, Categories, Courses, $ionicLoading) {

$scope.altered = {

	email: false,
	password_current: false,
	password_new: false,
	password_confirm: false,
	first_name: false,
	last_name: false,
	gender: false,
	uni: false,
	course: false,
	bio: false,
	interest_partyer: false,
	facebook: false,
	twitter: false,
	google: false

};


$scope.unilist = Categories.GetUnis();

$scope.courselist = Courses.GetCourses();


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
	$localStorage.img64 = imageData;
  }, function(err) {
    alert ("An error occured: " + err);
  });

	};

$scope.uploadpic = function() {

	// Upload the image and attach to user profile

	basedata = $localStorage.img64;

	$ionicLoading.show({template: 'Uploading avatar... <ion-spinner class="spinner-energized"></ion-spinner>'});

		$http({
			method: 'POST',
			url: '/aupload.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			},
			data: {base64File: basedata, imageauthor: $localStorage.UserMeta.id}
		}).success(function (data){

			$ionicLoading.hide();

			$cordovaToast.showLongBottom('Image uploaded successfully.');
			$scope.imageuploaded = true; // Use to upload avatar placeholder
			$ionicScrollDelegate.scrollTop(true);

			var attachmentdata = JSON.stringify(data);
			var pattachmentdata = JSON.parse(attachmentdata);

			if (pattachmentdata.status === 'success') {
				$rootScope.currentusermeta.avatar = pattachmentdata.avatarurl;
				$state.go($state.current, {}, {reload: true});
			} else {
				alert("Something went wrong. We're currently looking into it.");
			}

			}).error(function (data){
				alert ("Opps! An error occured: " + data);
			});

}; // $scope.uploadpic END


 $scope.edit_avatar_fb = function() {

largerpictureurl = "https://graph.facebook.com/v2.2/me/picture?redirect=0&height=500&type=normal&width=500&access_token=" + $localStorage.accessToken;

$http.get(largerpictureurl).
success(function(data) {

var picture = JSON.stringify(data);
var largepicture = JSON.parse(picture);

$rootScope.largepicture = largepicture.data.url;

if (largepicture.data.is_silhouette === 'true') {

	var alertPopup = $ionicPopup.alert({
  		title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
  		template: '<h4>You have not added a photo to your Facebook profile yet. Please login seperately and add one there first. Or you can just take a pic/upload a photo in meantime?</h4>'
 	});
 		alertPopup.then(function(res) {
 	});

} else {

		$http({
			method: 'POST',
			url: '/assignavatar_fb.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			},
			data: {avatarurl: $rootScope.largepicture, avatarid: $localStorage.UserMeta.id}
		}).success(function (data){

				$ionicScrollDelegate.scrollTop(true);

				var photodata = JSON.stringify(data);
				var photoresp = JSON.parse(photodata);

				if (photoresp.status === 'success') {
					$cordovaToast.showLongBottom('Successfully using your Facebook photo.');
					$rootScope.currentusermeta.avatar = $rootScope.largepicture;
					$state.go($state.current, {}, {reload: true});
				} else {
					alert("Something went wrong. We're currently looking into it.");
				}

			}).error(function (data){
				alert ("Opps! An error occured: " + data);
			});

}

	}).error(function (data){
		alert ("Opps! An error occured: " + data);
	});

 };

 $scope.edit_avatar_google = function() {

$http.get($rootScope.google_tokenurl).
success(function(data) {

var picture = JSON.stringify(data);
var largepicture = JSON.parse(picture);

var str = largepicture.image.url;
str = str.substring(0, str.length - 6);

$rootScope.largepicture = str + '?sz=500';

	if ($rootScope.largepicture === 'null' || $rootScope.largepicture === 'undefined') {

		var alertPopup = $ionicPopup.alert({
			title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
			template: '<h4>You may not have added a photo to your Google profile yet. Please login seperately and add one there first. Or you can just take a pic/upload a photo in meantime?</h4>'
		});
			alertPopup.then(function(res) {
		});

	} else {

			$http({
				method: 'POST',
				url: '/assignavatar_google.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function(obj) {
					var str = [];
					for(var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
				},
				data: {avatarurl: $rootScope.largepicture, avatarid: $localStorage.UserMeta.id}
			}).success(function (data){

				$ionicScrollDelegate.scrollTop(true);

				var photodata = JSON.stringify(data);
				var photoresp = JSON.parse(photodata);

						if (photoresp.status === 'success') {
							$cordovaToast.showLongBottom('Successfully using your Google+ photo.');
							$rootScope.currentusermeta.avatar = $rootScope.largepicture;
							$state.go($state.current, {}, {reload: true});
						} else {
							alert("Something went wrong. We're currently looking into it.");
						}

				}).error(function (data){
					alert ("Opps! An error occured: " + data);
				});

	}

		}).error(function (data){
			alert ("Opps! An error occured: " + data);
		});

 };

 $scope.viewrating = function() {

			$http.get('/e8oada3z/user/get_user_meta/?cookie=' + $localStorage.UserMeta.cookie + '&meta_key=avg_rating_app').success(function(data) {

		}).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'An error occured. We are looking in to it'
				});
					alertPopup.then(function(res) {
				});

		});

 };

$scope.whyinterest = function() {

 // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
	 template: 'Humans are all different; we have different tastes &amp; different cultures. <br /><br /> But as a student, (apart from having different times of waking up for a 9AM lecture) you gracefully share similar traits with other fellow students. By asking for your interests, we may recommenend you the lasest deals, stuff for uni and even discounts on a night-out to your email inbox for free (of course); in the near future. Click Opt-out if you are not interested in this option.',
     title: 'Why does Inmyuni ask for interests?',
     subTitle: 'We were once students!',
     scope: $scope,
     buttons: [
       { text: 'Cancel',
	   	 onTap: function(e) {
			 $scope.optout = "optedout";
		 }
	   },
       {
         text: '<b>Opt me in.</b>',
         type: 'button-positive',
         onTap: function(e) {
         }
       }
     ]
   });

};

 $scope.edit_googleplus = function() {

			$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&userid=' + $localStorage.UserMeta.id + '&metakey=userpro_google_id&metavalue=' + encodeURIComponent($scope.currentusermeta.googleplus)).success(function(data) {

		}).error(function (data){

			$scope.runalert = function() {

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'Cannot update your Google Plus URL for some reason. Please try again later.'
				});
					alertPopup.then(function(res) {
				});

			};

		});

 };



 $scope.copyweblink = function() {

	 $cordovaClipboard.copy("/profile/" + $localStorage.UserMeta.username).then(function() {

				var alertPopup = $ionicPopup.alert({
					title: 'Successfully Copied',
					template: 'Successfully copied your web profile URL (/profile/' + $localStorage.UserMeta.username + ') to the clipboard.'
				});
					alertPopup.then(function(res) {
				});

	}, function() {
			alert("There is an error copying this link. We are looking into it.");
	});

 };


$scope.runupdate = function() {

	if ($scope.altered.email === true) {

		$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&userid=' + $localStorage.UserMeta.id + '&metakey=user_email&metavalue=' + encodeURIComponent($scope.currentusermeta.email)).success(function(data) {

				}).error(function (data){

					$scope.runalert = function() {
						var alertPopup = $ionicPopup.alert({
							title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
							template: 'Cannot update your Email Address for some reason. Please try again later.'
						});
							alertPopup.then(function(res) {
						});
					};
				});

	}

	if ($scope.altered.password_current && $scope.altered.password_new && $scope.altered.password_confirm === true) {

		if ($scope.currentusermeta.newpass === $scope.currentusermeta.oldpass)	{

			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'Your new password is the same as your current password. Please amend your new password to change it.'
			});
				alertPopup.then(function(res) {
			});

		} else {

			$http.get('/e8oada3z/user/get_currentuserinfo_pass/?cookie=' + $localStorage.UserMeta.cookie + '&currentpass=' + encodeURIComponent($scope.currentusermeta.oldpass)).success(function(data) {

			var info = JSON.stringify(data);
			var respinfo = JSON.parse(info);

				if (respinfo.user.passw === "okay") {

						if ($scope.currentusermeta.newpass === $scope.currentusermeta.newpass_confirm) {

								$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&userid=' + $localStorage.UserMeta.id + '&metakey=user_pass&metavalue=' + encodeURIComponent($scope.currentusermeta.newpass)).success(function(data) {

								$scope.currentusermeta.newpass = '';
								$scope.currentusermeta.oldpass = '';
								$scope.currentusermeta.newpass_confirm ='';


							//	$cordovaToast.showShortTop('Updated password successfully.');
								$state.go($state.current, {}, {reload: true});

							}).error(function (data){

									var alertPopup = $ionicPopup.alert({
										title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
										template: 'Cannot update your password for some reason. Please try again later.'
									});
										alertPopup.then(function(res) {
									});

							});

						} else {

						var alertPopup = $ionicPopup.alert({
								title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
								template: 'Both passwords do not match. Please enter them again.'
								});
							alertPopup.then(function(res) {
								});
						}

				} else {

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'Your current password is incorrect. Please enter it again.'
				});
				alertPopup.then(function(res) {
				});

				}

			}).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'Cannot update your password for some reason. Please try again later.'
				});
				alertPopup.then(function(res) {
				});

			});

		}

	}

	if ($scope.altered.first_name === true) {

		$http.get('/e8oada3z/user/update_profile/?cookie=' + $localStorage.UserMeta.cookie + '&userid=' + $localStorage.UserMeta.id + '&metakey=first_name&metavalue=' + encodeURIComponent($scope.currentusermeta.firstname)).success(function(data) {

				}).error(function (data){

					var alertPopup = $ionicPopup.alert({
						title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
						template: 'Cannot update your First Name for some reason. Please try again later.'
					});
						alertPopup.then(function(res) {
					});


				});

	}

	if ($scope.altered.last_name === true) {

		$http.get('/e8oada3z/user/update_profile/?cookie=' + $localStorage.UserMeta.cookie + '&userid=' + $localStorage.UserMeta.id + '&metakey=last_name&metavalue=' + encodeURIComponent($scope.currentusermeta.lastname)).success(function(data) {

		}).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'Cannot update your Last Name for some reason. Please try again later.'
				});
					alertPopup.then(function(res) {
				});

		});

	}

	if ($scope.altered.gender == true) {

		if ($rootScope.currentusermeta.gender === 0) {

			 $scope.usergender = 'Male';

		 } else if ($rootScope.currentusermeta.gender === 2) {

			 $scope.usergender = 'Female';

		 }

		 if ($rootScope.currentusermeta.gender === 'img/default_avatar_male.jpg' && $rootScope.currentusermeta.gender === 2) {

			 $rootScope.currentusermeta.gender = 'img/default_avatar_female.jpg';

		 }

		  $http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&userid=' + $localStorage.UserMeta.id + '&metakey=gender&metavalue=' + $scope.usergender).success(function(data) {

		  }).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'Cannot update for some reason. Please try again later.'
				});
					alertPopup.then(function(res) {
				});

		  });

	}

	if ($scope.altered.uni === true) {

		$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&userid=' + $localStorage.UserMeta.id + '&metakey=uni&metavalue=' + encodeURIComponent($scope.currentusermeta.uni)).success(function(data) {

	}).error(function (data){

			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'Cannot update your University for some reason. Please try again later.'
			});
				alertPopup.then(function(res) {
			});


	});

	}

	if ($scope.altered.course === true) {

		  $http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&userid=' + $localStorage.UserMeta.id + '&metakey=course&metavalue=' + encodeURIComponent($scope.currentusermeta.course)).success(function(data) {

	  }).error(function (data){


			  var alertPopup = $ionicPopup.alert({
				  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				  template: 'Cannot update your Course for some reason. Please try again later.'
			  });
				  alertPopup.then(function(res) {
			  });

		});

	}

	if ($scope.altered.bio === true) {

		$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&userid=' + $localStorage.UserMeta.id + '&metakey=description&metavalue=' + encodeURIComponent($scope.currentusermeta.bio)).success(function(data) {

		}).error(function (data) {


				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'Cannot update your Bio for some reason. Please try again later.'
				});
					alertPopup.then(function(res) {
				});


		});

	}

	if ($scope.altered.interest_partyer === true) {

		 if ($rootScope.currentusermeta.interest_partyer > 0 || $rootScope.currentusermeta.interest_partyer < 49) {

			 $scope.interest = 'Partyer';

		 } else if ($rootScope.currentusermeta.interest_partyer > 50 || $rootScope.currentusermeta.interest_partyer < 101 ) {

			 $scope.interest = 'Snuggler';

		 }

		$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&userid=' + $localStorage.UserMeta.id + '&metakey=interest_partyer&metavalue=' + $scope.interest).success(function(data) {

			}).error(function (data){

					var alertPopup = $ionicPopup.alert({
						title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
						template: 'Cannot update your Interest for some reason. Please try again later.'
					});
						alertPopup.then(function(res) {
					});

			});


	}

	if ($scope.altered.facebook === true) {

		  $http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&userid=' + $localStorage.UserMeta.id + '&metakey=userpro_facebook_id&metavalue=' + encodeURIComponent($scope.currentusermeta.facebook)).success(function(data) {

	  }).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'Cannot update your Twitter Handle (@) for some reason. Please try again later.'
				});
					alertPopup.then(function(res) {
				});

	  });

	}

	if ($scope.altered.twitter === true) {

		$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&userid=' + $localStorage.UserMeta.id + '&metakey=userpro_twitter_id&metavalue=' + encodeURIComponent($scope.currentusermeta.twitter)).success(function(data) {

		}).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'Cannot update your Twitter Handle (@) for some reason. Please try again later.'
				});
					alertPopup.then(function(res) {
				});

		});

	}

	if ($scope.altered.google === true) {

		$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&userid=' + $localStorage.UserMeta.id + '&metakey=userpro_twitter_id&metavalue=' + encodeURIComponent($scope.currentusermeta.twitter)).success(function(data) {

		}).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'Cannot update your Twitter Handle (@) for some reason. Please try again later.'
				});
					alertPopup.then(function(res) {
				});

		});

	}

	$cordovaToast.showLongBottom('Updated profile successfully.');
	$ionicScrollDelegate.scrollTop(true);

};

// Deleting a User

$scope.promptdelete = function() {

 // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
	 template: $rootScope.currentusermeta.firstname + ',<br />It is a shame to see you leave the Inmyuni community, but of course; you have every single right to leave. <br /><br /><strong>Important:</strong> If you delete your account, all your items and user information will be <strong>permanently</strong> deleted (your order information will be securely archived). <br /><br /> Are you sure you want to delete your Inmyuni account?',
	 title: '"Delete my account, please."',
     subTitle: 'We hope that you have enjoyed your experience with Inmyuni.',
     scope: $scope,
     buttons: [
       { text: 'Keep It',
	   	 onTap: function(e) {
		 }
	   },
       {
         text: 'Delete It',
         type: 'button-assertive',
         onTap: function(e) {
			$scope.deleteuser();
         }
       }
     ]
   });

};

 $scope.deleteuser = function() {

 	$ionicLoading.show({template: 'One sec... <ion-spinner class="spinner-energized"></ion-spinner>'});

	$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&userid=' + $localStorage.UserMeta.id + '&metakey=deleteauser&metavalue=1&action=delete').success(function(data) {

		resp = JSON.stringify(data);
		response = JSON.parse(resp);
		console.log(resp);

		if (response.status === 'ok') {
		$scope.clearuser();
		} else if (response.error === 'Invalid cookie. Use the `generate_auth_cookie` method.') {

			$ionicLoading.hide();

			var alertPopup = $ionicPopup.alert({
				title: 'Authentication problem <i class="icon ion-alert popuplink"></i>',
				template: 'Please try again later.'
			});
				alertPopup.then(function(res) {
			});

		} else if (response.msg === 'deleted') {
		$scope.clearuser();
		} else {

			$ionicLoading.hide();

			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'Your account cannot be deleted at the moment for some reason. Please try again later.'
			});
				alertPopup.then(function(res) {
			});

		}

		}).error(function (data){

				$ionicLoading.hide();

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'Your account cannot be deleted at the moment for some reason. Please try again later.'
				});
					alertPopup.then(function(res) {
				});

		});

 };


  $scope.clearuser = function() {

			delete $localStorage.UserMeta;
			delete $localStorage.userid;
			delete $localStorage.gotcookie;

						if ($localStorage.UserMeta === undefined) {

							$rootScope.role = "anon";

							$ionicLoading.hide();

			    			$cordovaToast.showLongBottom('Account deleted successfully.');
							$state.go('login');

						} else {

					    // Log event

						}

  };

});
