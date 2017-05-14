app.controller('StripeChargeCtrl', function($http, $scope, $localStorage, $rootScope, $ionicPopup, $ionicLoading, $state) {

		this.doCheckout = function(token) {

			$ionicLoading.show({template: 'Completing payment... <ion-spinner class="spinner-energized"></ion-spinner>'});

			  $http.get('/e8oada3z/user/stripe_connect/?cookie=' + $localStorage.UserMeta.cookie + '&action=charge_user&userid=' + $localStorage.UserMeta.id + '&token=' + token.id + '&amount=' + $rootScope.charge_amount + '&item_owner=' + $rootScope.post.author.id + '&item_id=' + $rootScope.post.id + '&item_title=' + encodeURIComponent($rootScope.post.title)).success(function(data) {

				  $ionicLoading.hide();

				  console.log(data);

					var alertPopup = $ionicPopup.alert({
						title: 'Payment Complete!',
						template: 'You have successfully paid <strong>' + $rootScope.post.author.name + '</strong> <strong>£' + $rootScope.post.price + '</strong> for <strong>' + $rootScope.post.title + '</strong>. Tap OK to view your orders.'
					});
						alertPopup.then(function(res) {

							alert(JSON.stringify(data));

							$state.go('dashboard', { profileID: $localStorage.UserMeta.id });
					});

			  }).error(function (data){

			  		$ionicLoading.hide();

			 		 $rootScope.$broadcast('loading:hide');

					var alertPopup = $ionicPopup.alert({
						title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
						template: 'Please try again later.'
					});
						alertPopup.then(function(res) {

					});

			  });

		};

});

app.controller('SettingsPaymentsCtrl', function($http, $scope, $localStorage, $rootScope, $ionicPopup, $ionicLoading, $cordovaInAppBrowser, $timeout, $state, $cordovaToast) {

	if ( typeof String.prototype.startsWith != 'function' ) {
	  String.prototype.startsWith = function( str ) {
		return this.substring( 0, str.length ) === str;
	  }
	}

	if ( typeof String.prototype.endsWith != 'function' ) {
	  String.prototype.endsWith = function( str ) {
		return this.substring( this.length - str.length, this.length ) === str;
	  }
	};

	$scope.verify_email_sent = false;

	$scope.verify = {
		key: ''
	};

	$scope.get_info = function() {

			  $http.get('/e8oada3z/user/stripe_connect/?cookie=' + $localStorage.UserMeta.cookie + '&action=get_info&userid=' + $localStorage.UserMeta.id).success(function(data) {

			  alert(JSON.stringify(data));

			  }).error(function (data){

					var alertPopup = $ionicPopup.alert({
						title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
						template: 'Please try again later.'
					});
						alertPopup.then(function(res) {

					});

			  });

	}

	$scope.create_payment_account = function() {

		$ionicLoading.show({template: 'Creating your Stripe account... <ion-spinner class="spinner-energized"></ion-spinner>'});

		$http.get('/e8oada3z/user/stripe_connect/?cookie=' + $localStorage.UserMeta.cookie + '&action=create_account&userid=' + $localStorage.UserMeta.id + '&email=' + encodeURIComponent($localStorage.UserMeta.email) + '&username=' + $localStorage.UserMeta.username ).success(function(data) {

			$ionicLoading.hide();

			console.log(data);

			  var alertPopup = $ionicPopup.alert({
				  title: 'Account Created!',
				  template: 'You have successfully created your account with Stripe.'
			  });
				  alertPopup.then(function(res) {
					  alert(JSON.stringify(data));
			  });

		}).error(function (data){

			  $ionicLoading.hide();

		$rootScope.$broadcast('loading:hide');

			  var alertPopup = $ionicPopup.alert({
				  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				  template: 'Please try again later.'
			  });
				  alertPopup.then(function(res) {

			  });

		});

	}

	$scope.open_browser = function() {

	  var options = {
		  location: 'no',
		  clearcache: 'yes',
		  toolbar: 'no'
		};

	  var product_description = "I will selling be student-related items to other university students in the UK.";

	  $cordovaInAppBrowser.open('https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_3Hxe4XlxrcKyET59DccHpCgXClg15xKo&scope=read_write&stripe_user[email]=' + $localStorage.UserMeta.email + '&stripe_user[url]=/profile/' + $localStorage.UserMeta.username + '&stripe_user[country]=GB&stripe_user[business_name]=' + $localStorage.UserMeta.firstname + ' ' + $localStorage.UserMeta.lastname + '&stripe_user[business_type]=sole_prop&stripe_user[first_name]=' + $localStorage.UserMeta.firstname + '&stripe_user[last_name]=' + $localStorage.UserMeta.lastname + '&stripe_user[physical_product]=true&stripe_user[shipping_days]=4&stripe_user[product_category]=education&stripe_user[product_description]=' + encodeURIComponent(product_description) + '&stripe_user[currency]=gbp', '_blank', options)
		.then(function(event) {
		  // success
		})
		.catch(function(event) {

		  var alertPopup = $ionicPopup.alert({
			  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
			  template: 'Please try again later.'
		  });
			  alertPopup.then(function(res) {

		  });

		});

		$rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event){

		  if (event.url === '/connect-with-stripe/?error=access_denied&error_description=The+user+denied+your+request') {

			$cordovaInAppBrowser.close();

			var alertPopup = $ionicPopup.alert({
				title: 'Denied Access <i class="icon ion-alert popuplink"></i>',
				template: 'You denied the request to connect your Inmyuni account with Stripe.'
			});
				alertPopup.then(function(res) {

			});

		  }

		 var eventurl = event.url;

		  if (eventurl.startsWith( "/connect-with-stripe/" ) && !eventurl.endsWith( "The+user+denied+your+request" )) {

			var pos = eventurl.search("ac_");
			var auth_code = eventurl.substring(pos);

			$cordovaInAppBrowser.close();

			$ionicLoading.show({template: 'Finishing linking accounts... <ion-spinner class="spinner-energized"></ion-spinner>'});

			$http.get('/e8oada3z/user/stripe_connect/?cookie=' + $localStorage.UserMeta.cookie + '&action=link_account&userid=' + $localStorage.UserMeta.id + '&auth_code=' + auth_code + '&email=' + $localStorage.UserMeta.email ).success(function(data) {

				$ionicLoading.hide();

				if (data.response === "complete") {

					var alertPopup = $ionicPopup.alert({
						title: 'Success!',
						template: 'Your Stripe account has successfully been linked with Inmyuni. You can now receive secure payments to your bank account through Inmyuni using Stripe.'
					});
						alertPopup.then(function(res) {

							$state.go($state.current, {}, {reload: true});

					});

				} else if (data.response === "incomplete") {

					// Handle Stripe errors here:

					var alertPopup = $ionicPopup.alert({
						title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
						template: 'Please try again later.'
					});
						alertPopup.then(function(res) {

					});

				} else if (data.response === "auth_code_empty") {

					// Errors will likely be with the in-app browser here:

					var alertPopup = $ionicPopup.alert({
						title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
						template: 'Could not complete authorisation. Please try again later.'
					});
						alertPopup.then(function(res) {

					});

				}

		   }).error(function (data){

			  $ionicLoading.hide();

			  // Handle server errors here:

			  $rootScope.$broadcast('loading:hide');

					var alertPopup = $ionicPopup.alert({
						title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
						template: 'Please try again later.'
					});
						alertPopup.then(function(res) {

					});

			  });

		  }

		})

	}

	$scope.unlink_account = function() {

		$ionicLoading.show({template: 'Unlinking accounts... <ion-spinner class="spinner-energized"></ion-spinner>'});

		$http.get('/e8oada3z/user/stripe_connect/?cookie=' + $localStorage.UserMeta.cookie + '&action=unlink_account&userid=' + $localStorage.UserMeta.id + '&email=' + $localStorage.UserMeta.email ).success(function(data) {

			$ionicLoading.hide();

			if (data.response === "complete") {

				var alertPopup = $ionicPopup.alert({
					title: "Success: Access Revoked",
					template: "Inmyuni has now been revoked from accessing your Stripe account. You cannot receive payments through Inmyuni [with Stripe] to your bank account anymore. To start receiving payments again using Stripe through Inmyuni, please tap the 'Connect with Stripe' below."
				});
					alertPopup.then(function(res) {

						$state.go($state.current, {}, {reload: true});

				});

			} else if (data.response === "incomplete") {

				// Handle Stripe errors here:

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'Please try again later.'
				});
					alertPopup.then(function(res) {

				});

			}

		}).error(function (data){

			  $ionicLoading.hide();

				$rootScope.$broadcast('loading:hide');

			  var alertPopup = $ionicPopup.alert({
				  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				  template: 'Please try again later.'
			  });
				  alertPopup.then(function(res) {

			  });

		});

	};

  $scope.send_verify_email = function() {

		  $http.get('/e8oada3z/user/reset_emails/?action=send_verify_email&user_email=' + $localStorage.UserMeta.email).success(function(data) {

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

							$scope.verify_email_sent = true;

							$cordovaToast.showLongBottom('Email successfully sent.');

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

 $scope.verify_account = function() {

	  $http.get('/e8oada3z/user/reset_emails/?action=verify_pass&user_email=' + $localStorage.UserMeta.email + '&verification_key=' + encodeURIComponent($scope.verify.key)).success(function(data) {

		  var verifyresult = data;

		  if ( verifyresult.status !== 'error') {

				if ( verifyresult.msg === 'Email does not exist') {

					  var alertPopup = $ionicPopup.alert({
						  title: '<i class="icon ion-alert popuplink"></i> Email address not found',
						  template: 'The email address that you entered does not exist on our systems. Please amend and try again.'
					  });
						  alertPopup.then(function(res) {
					  });

				} else if ( verifyresult.msg === 'Keys do not match') {

					  var alertPopup = $ionicPopup.alert({
						  title: '<i class="icon ion-alert popuplink"></i> Keys do not match',
						  template: 'The verification key that you entered does not match the key we have on our systems. Please try again.'
					  });
						  alertPopup.then(function(res) {
					  });


				} else {

				  console.log(data);

					  var alertPopup = $ionicPopup.alert({
						  title: 'Verification Successful!',
						  template: 'All done. Want to start accepting payments through Inmyuni? Complete Step 2 below.'
					  });
						  alertPopup.then(function(res) {
					  });

				  $state.go($state.current, {}, {reload: true});
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

  };

});

app.controller('SettingsAccountCtrl', function($http, $scope, $localStorage, $rootScope, $ionicPopup, $ionicLoading, $state, $cordovaToast) {

	$scope.settingsList = [
	  { text: "Revoke Access To Stripe Account", checked: false }
	];

});
