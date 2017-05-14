app.controller('AddCommentCtrl', function($scope, $rootScope, $http, $localStorage, $ionicModal, $ionicScrollDelegate, $stateParams, $state) {
  
  $ionicModal.fromTemplateUrl('templates/modals/item-comment.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  	$rootScope.$on('open-the-modal', function(event) {

	});
  
	$scope.comment = {
		text: ""
	};


$scope.postcomment = function() {
		
		$http.get('/e8oada3z/user/post_comment/?cookie=' + $localStorage.UserMeta.cookie +'&post_id=' + $stateParams.postID +'&name=' + $localStorage.UserMeta.username + '&email=' + encodeURIComponent($localStorage.UserMeta.email) + '&content=' + encodeURIComponent($scope.comment.text) + '&comment_status=1&comment_type=public').success(function(data) {
			
    result = JSON.stringify(data);
    results = JSON.parse(result);

	if (results.status === 'ok') {
		
		$state.go($state.current, {}, {reload: true});	

	}

		}).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'We cannot post your comment at the moment for some reason. Please try again later.'
				});
					alertPopup.then(function(res) {
				});

		});	

};
  
});

app.controller('OrderNoteCtrl', function($scope, $rootScope, $http, $localStorage, $ionicModal, $ionicScrollDelegate, $stateParams, $state) {
  
  $ionicModal.fromTemplateUrl('templates/modals/item-comment.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  	$rootScope.$on('open-the-modal', function(event) {

	});
  
	$scope.comment = {
		text: ""
	};


$scope.postcomment = function() {
		
		$http.get('/e8oada3z/user/post_comment/?cookie=' + $localStorage.UserMeta.cookie +'&post_id=' + $stateParams.postID +'&name=' + $localStorage.UserMeta.username + '&email=' + encodeURIComponent($localStorage.UserMeta.email) + '&content=' + encodeURIComponent($scope.comment.text) + '&comment_status=1&comment_type=public').success(function(data) {
			
    result = JSON.stringify(data);
    results = JSON.parse(result);

	if (results.status === 'ok') {
		
		$state.go($state.current, {}, {reload: true});	

	}

		}).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'We cannot post your comment at the moment for some reason. Please try again later.'
				});
					alertPopup.then(function(res) {
				});

		});	

};
  
});

app.controller('ProfileCommentCtrl', function($scope, $rootScope, $localStorage, $ionicModal, $http, $ionicPopup, $state, $ionicScrollDelegate, $stateParams) {
	
$scope.$on('author-posts-loaded', function(event) {
	
	$ionicModal.fromTemplateUrl('templates/modals/profile-comment.html', {
	scope: $scope
	}).then(function(modal) {
	$scope.modal = modal;
	}); 
	
	$scope.comment = {
		text: ""
	};
	
	$scope.type = {
		typeofcomment: "public"
	};
	
	if ($rootScope.authorposts.count == 0) {
	  $scope.selectedItem = {
		  id: 0000
	  };	
	} else {
	  $scope.selectedItem = {
		  id: $rootScope.authorposts.posts[0].id
	  };
	}
	
	$scope.commenttype = [{
		name: "Show to all users",
		type: "public"
	},{
		name: "Show only to seller",
		type: "private"
	}];
	
});
	
$scope.postcomment = function() {
		
		$http.get('/e8oada3z/user/post_comment/?cookie=' + $localStorage.UserMeta.cookie +'&post_id=' + $scope.selectedItem.id +'&name=' + $localStorage.UserMeta.username + '&email=' + encodeURIComponent($localStorage.UserMeta.email) + '&content=' + encodeURIComponent($scope.comment.text) + '&comment_status=1&comment_type=' + $scope.type.typeofcomment).success(function(data) {
			
    result = JSON.stringify(data);
    results = JSON.parse(result);

	if (results.status === 'ok') {
		
		$state.go('itemsingle', { postID: $scope.selectedItem.id });	

	} else if (results.status === 'error') {
		
				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'We cannot post your comment at the moment for some reason. Please try again later.'
				});
					alertPopup.then(function(res) {
				});
		
	}

		}).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'We cannot post your comment at the moment for some reason. Please try again later.'
				});
					alertPopup.then(function(res) {
				});

		});	

};
  
});

app.controller('ProfileMapModalCtrl', function($scope, $ionicModal) {
  
  $ionicModal.fromTemplateUrl('templates/modals/profile-map.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
});


app.controller('TermsCtrl', function($scope, $ionicModal) {
  
  $ionicModal.fromTemplateUrl('templates/modals/terms.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
});

app.controller('PrivacyCtrl', function($scope, $ionicModal) {
  
  $ionicModal.fromTemplateUrl('templates/modals/privacy.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
});

app.controller('ItemViewMoreCtrl', function($scope, $rootScope, $ionicModal, $http, $localStorage, $stateParams, ImageDataGeneral) {
	
$scope.likebuttons = {
	
	like: false,
	liked: false	
	
};
	
$scope.getindex = function ($index) {
	
	$scope.defaultindex = $index;
  
	  $scope.photos = $rootScope.photos;
	  
		  if ($scope.photos[$scope.defaultindex].likes.liked === 'yes') {
			  
			  $scope.likebuttons = {
				  
				  likebutton: false,
				  likedbutton: true	
				  
			  };		
			  
		  } else if ($scope.photos[$scope.defaultindex].likes.liked === 'no') {
			  
			  $scope.likebuttons = {
				  
				  likebutton: true,
				  likedbutton: false
				  
			  };			
			  
		  }

		
};

$scope.like = function() {	
	
	$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=like&post_author=' + $scope.photos[$scope.defaultindex].author.id + '&userid=' + $localStorage.UserMeta.id + '&metakey=post_likes&metavalue=' + $scope.photos[$scope.defaultindex].id).success(function(data) {
	  
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

$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=unlike&userid=' + $localStorage.UserMeta.id + '&metakey=post_likes&metavalue=' + $scope.photos[$scope.defaultindex].id).success(function(data) {
  
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

$ionicModal.fromTemplateUrl('templates/modals/item-view-more.html', {
  scope: $scope,
  animation: 'slide-in-up'
}).then(function(modal) {
  $scope.modal = modal;
});

  
});

app.controller('ItemViewMoreProfileCtrl', function($scope, $rootScope, $ionicModal, $http, $localStorage, $stateParams) {
	
$scope.likebuttons = {
	
	like: false,
	liked: false	
	
};
	
$scope.getindex = function ($index) {
	
	$scope.defaultindex = $index;
	$rootScope.profileviewmoreindex = $index;
			

			$scope.photos = $rootScope.authorposts;
			
			if ($scope.photos.posts[$scope.defaultindex].likes.liked === 'yes') {
				
				$scope.likebuttons = {
					
					likebutton: false,
					likedbutton: true	
					
				};		
				
			} else if ($scope.photos.posts[$scope.defaultindex].likes.liked === 'no') {
				
				$scope.likebuttons = {
					
					likebutton: true,
					likedbutton: false
					
				};			
				
			}
			

		
};

$scope.like = function() {	
	
	$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=like&post_author=' + $scope.photos.posts[$scope.defaultindex].author.id + '&userid=' + $localStorage.UserMeta.id + '&metakey=post_likes&metavalue=' + $scope.photos.posts[$scope.defaultindex].id).success(function(data) {
	  
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

$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=unlike&userid=' + $localStorage.UserMeta.id + '&metakey=post_likes&metavalue=' + $scope.photos.posts[$scope.defaultindex].id).success(function(data) {
  
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

$ionicModal.fromTemplateUrl('templates/modals/item-view-more-profile.html', {
  scope: $scope,
  animation: 'slide-in-up'
}).then(function(modal) {
  $scope.modal = modal;
});

$scope.openmodal = function() {

	$rootScope.$emit('open-the-modal');
	
};

  
});

app.controller('ItemViewMoreSearchCtrl', function($scope, $ionicModal, $http, $localStorage) {
	
$scope.likebuttons = {
	
	like: false,
	liked: false	
	
};
	
$scope.getnewindex = function ($index) {
	
	$scope.searchindex = $index;
  
    $http.get('/e8oada3z/get_search_results/?search=' + encodeURIComponent($scope.searchterm.keyword) + '&post_type=product&count=-1')
     .success(function(data){
			$scope.photos = data;
			
			console.log($scope.likebuttons);
			
			if ($scope.photos.posts[$scope.searchindex].likes.liked == 'yes') {
				
				$scope.likebuttons = {
					
					likebutton: false,
					likedbutton: true	
					
				};		
				
			} else if ($scope.photos.posts[$scope.searchindex].likes.liked == 'no') {
				
				$scope.likebuttons = {
					
					likebutton: true,
					likedbutton: false
					
				};			
				
			}
			
		});
		
};
	
$scope.like = function() {	
	
	$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=like&post_author=' + $scope.photos.posts[$scope.searchindex].author.id + '&userid=' + $localStorage.UserMeta.id + '&metakey=post_likes&metavalue=' + $scope.photos.posts[$scope.searchindex].id).success(function(data) {
	  
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

$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=unlike&userid=' + $localStorage.UserMeta.id + '&metakey=post_likes&metavalue=' + $scope.photos.posts[$scope.searchindex].id).success(function(data) {
  
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

  
  $ionicModal.fromTemplateUrl('templates/modals/item-view-more-search.html', {
    scope: $scope,
	animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  

  
});	

app.controller('ItemViewFullCtrl', function($scope, $ionicModal, ImageDataGeneral) {
	
ImageDataGeneral.success(function(data){
	$scope.photos = data;
	
	$scope.getindex = function ($index) {
		
	$scope.defaultindex = $index;
	
	}

  
  $ionicModal.fromTemplateUrl('templates/modals/item-view-full.html', {
    scope: $scope,
	animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
});	
  
});
  

app.controller('PopCardSettingsCtrl', function($scope, $ionicPopover, $cordovaEmailComposer, $ionicPopup, $cordovaSocialSharing) {
	
 $ionicPopover.fromTemplateUrl('templates/popovers/cardsettings.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
  
$scope.report_item = function() {
  
	$cordovaEmailComposer.isAvailable().then(function() {
	   // is available
	 }, function () {
	   				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'We could not find an email client app on your phone. Please install one (e.g. Gmail, Outlook, Yahoo Mail etc...) and try again.'
				});
					alertPopup.then(function(res) {
				});
	 });
	
		  var email = {
			to: 'contact@/',
/*			cc: 'erika@mustermann.de',
			bcc: ['john@doe.com', 'jane@doe.com'],
			attachments: [
			  'file://img/logo.png',
			  'res://icon.png',
			  'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
			  'file://README.pdf'
			], */
			subject: 'I want to report this item (add item name):',
			body: '<h2>Hi there,</h2><br> I just saw a...',
			isHtml: true
		  };
	
	 $cordovaEmailComposer.open(email).then(null, function () {
	   // user cancelled email
	 });
 
};

    $scope.shareAnywhere = function() {
        $cordovaSocialSharing.share("This is your message", "This is your subject", "www/imagefile.png", "https:///");
    }
 
    $scope.shareViaTwitter = function(message, image, link) {
        $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
            $cordovaSocialSharing.shareViaTwitter(message, image, link);
        }, function(error) {
            alert("Cannot share on Twitter");
        });
    }
	
});	

app.controller('PopCardSearchCtrl', function($scope, $ionicPopover, $rootScope, $state, $http, $ionicPopup, $timeout, $cordovaToast, $ionicLoading) {
	
	
 $rootScope.searchterm = { keyword: "" 
				 		  };
	
 $ionicPopover.fromTemplateUrl('templates/popovers/search.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
  
$scope.searchitem = function() {
	
	$state.go('search');
	$scope.popover.hide();
	
};

 $scope.ifsearchstate = function($event) {
	$scope.$state = $state;
		  
	 if ($state.current.name === 'search') {
		 
		 $ionicLoading.show({template: '<ion-spinner class="spinner-energized"></ion-spinner> Searching Inmyuni...'})
		 
			$http.get('/e8oada3z/get_search_results/?search=' + encodeURIComponent($rootScope.searchterm.keyword) + '&post_type=product&count=-1').
				success(function(data) {
					
				$ionicLoading.hide();
					
				$rootScope.results = data;
				
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
						   }, 10000);	
							
					} else {
						
	//					$scope.showresults = true;
					
						if ($rootScope.results.count_total == 1) {
							
							$scope.itemnoun = "item"
							
						} else {
							
							$scope.itemnoun = "items"
							
						}	
						
						 $cordovaToast.showLongBottom($rootScope.results.count_total + " " + $scope.itemnoun + " found for '" + $rootScope.searchterm.keyword + "'");
			}
			
		  }).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'We cannot search at the moment. Please try again later.'
				});
					alertPopup.then(function(res) {
				});

		});	
		 
	 } else {
		return false; 
	 }
	 
 };
	
});	

app.controller('FullscreenImageCtrl', ['$scope', '$ionicModal',
  function ($scope, $ionicModal) {

    $ionicModal.fromTemplateUrl('templates/modals/avatar-full.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    $scope.imageSrc = '';

    $scope.showImage = function($photo) {
	
	profilepic = $photo;
		
 /*     switch(index) {
        case 1:
          $scope.imageSrc = 'http://ionicframework.com/img/ionic-logo-blog.png';
          break;
        case 2:
          $scope.imageSrc  = 'http://ionicframework.com/img/ionic_logo.svg';
          break;
        case 3:
          $scope.imageSrc  = 'http://ionicframework.com/img/homepage/phones-weather-demo@2x.png';
          break;
      }  */
	  
	 $scope.imageSrc = profilepic;
      $scope.openModal();
    }
  }
]);

app.controller('PopCardExploreCtrl', function($scope, $ionicPopover, $ionicSideMenuDelegate) {
	
 $ionicPopover.fromTemplateUrl('templates/popovers/exploresettings.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
	
    $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });

  $scope.toggleRightMenu = function() {
    $ionicSideMenuDelegate.toggleRight();
  };
  
  });
	
});	

app.controller('ItemCommentCtrl', function($scope, $rootScope, $localStorage, $ionicModal, $http, $ionicPopup, $state, $ionicScrollDelegate, $stateParams) {
	
	$scope.comment = {
		text: ""
	};
  
  $ionicModal.fromTemplateUrl('templates/modals/item-comment.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


$scope.postcomment = function() {
		
		$http.get('/e8oada3z/user/post_comment/?cookie=' + $localStorage.UserMeta.cookie +'&post_id=' + $stateParams.postID +'&name=' + $localStorage.UserMeta.username + '&email=' + encodeURIComponent($localStorage.UserMeta.email) + '&content=' + encodeURIComponent($scope.comment.text) + '&comment_status=1&comment_type=public').success(function(data) {
			
    result = JSON.stringify(data);
    results = JSON.parse(result);

	if (results.status === 'ok') {
		
		$state.go($state.current, {}, {reload: true});	
		 $ionicScrollDelegate.scrollBottom();

	}

		}).error(function (data){

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'We cannot post your comment at the moment for some reason. Please try again later.'
				});
					alertPopup.then(function(res) {
				});

		});	

};
  
});

app.controller('ItemFullCtrl',  function($scope, $rootScope, $ionicModal, $http, $ionicPopup, $state, $ionicScrollDelegate) {
  
  $ionicModal.fromTemplateUrl('templates/modals/item-view-full.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  
});

app.controller('FullPostCtrl', function($scope, $rootScope) {
	
	$scope.$on('post-loaded', function(event) {
	
	  // Strip tags
	  stripped = $rootScope.post.excerpt.replace(/<\/?[^>]+(>|$)/g, "");
	  cleaned = he.decode(stripped);
	  
	  $scope.desc = cleaned;
	  
	  $scope.postcomments = $rootScope.post.comments;
	  $scope.totalcomments = $scope.postcomments.length;	
	  
	  $scope.saletype = {
		  local: false,
		  national: false	
	  }

	})
	
	$scope.$on('post-wc-loaded', function(event) {
	
		if ($rootScope.post_wc.attributes[5].options.length == 2) {
			
			$scope.saletype = {
				local: true,
				national: true	
			}
					
		} else if ($rootScope.post_wc.attributes[5].options.length == 1 && $rootScope.post_wc.attributes[5].options[0] == "Local") {
			
			$scope.saletype = {
				local: true,
				national: false	
			}	
			
		} else if ($rootScope.post_wc.attributes[5].options.length == 1 && $rootScope.post_wc.attributes[5].options[0] == "National") {
			
			$scope.saletype = {
				local: false,
				national: true
			}	
		}
		
	})
	
});

app.controller('BuyLocalModalCtrl', function($scope, $rootScope, $ionicModal, $ionicPopup, $http, $localStorage, WcApiUrl, $stateParams, $cordovaToast, $state) {

ApiUrl = WcApiUrl.GetGeneralUrl();

$scope.createorder = function () {
	
	if ($localStorage.UserMeta.id == $rootScope.post.author.id) {
		
	  var alertPopup = $ionicPopup.alert({
		  title: 'Woops!',
		  template: 'You cannot buy your own item.'
	  });
		  alertPopup.then(function(res) {

	  });
		
	} else {
		
			$scope.order_json = {
		  "order": {
			"payment_details": {
			  "method_id": "cod",
			  "method_title": "Cash On Delivery",
			  "paid": false
			},
			"status": "on-hold",
			"billing_address": {
			  "first_name":  $localStorage.UserMeta.first_name,
			  "last_name": $localStorage.UserMeta.last_name,
			  "email": $localStorage.UserMeta.email,
			},
			"customer_id": $localStorage.UserMeta.id,
			"line_items": [
			  {
				"product_id": $stateParams.postID,
				"quantity": 1
			  }
			],
			"shipping_lines": [
			  {
				"method_id": "local_pickup",
				"method_title": "Local Pickup"
			  }
			]
		  }
		};
	
	$scope.orderinfo = JSON.stringify($scope.order_json);
			
	var req = {
	 method: 'POST',
	 url: '/wc-api/v2/orders' + ApiUrl,
	 headers: {
	   'Content-Type': undefined
	 },
	 data: $scope.orderinfo,
	}
	
	$http(req)
		.success(function(data){	
		
			orderdata = JSON.stringify(data);
			$scope.neworder = JSON.parse(orderdata);	
			console.log($scope.neworder);
			
			$cordovaToast.showLongBottom('Successfully purchased. Enjoy your item!');
			
				$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=insertorder&userid=' + $localStorage.UserMeta.id + '&metakey=userorders&metavalue=' + parseInt($scope.neworder.order.line_items[0].product_id) + '&order_id=' + parseInt($scope.neworder.order.order_number) + '&order_total=' + parseFloat($scope.neworder.order.total) + '&order_status=' + $scope.neworder.order.status + '&updated_at=' + encodeURIComponent($scope.neworder.order.updated_at) + '&item_name=' + encodeURIComponent($scope.neworder.order.line_items[0].name) + '&item_id=' + $scope.neworder.order.line_items[0].product_id + '&customer_name=' + encodeURIComponent($scope.neworder.order.customer.username) + '&customer_id=' + $scope.neworder.order.customer_id + '&delivery_type=' + encodeURIComponent($scope.neworder.order.shipping_lines[0].method_id) + '&created_at=' + encodeURIComponent($scope.neworder.order.created_at) ).success(function(data) {		
					
					result = JSON.stringify(data);
					$scope.userorders = JSON.parse(result);	
			
					console.log($scope.userorders);	
					
					$state.go('dashboard', { profileID: $localStorage.UserMeta.id });
		
				}).error(function (data){	
				
					errordata = JSON.stringify(data);
					alert(errordata);
				
					$rootScope.$broadcast('loading:hide');	
		
					  var alertPopup = $ionicPopup.alert({
						  title: 'Hmm... There is a problem <i class="icon ion-alert popuplink"></i>',
						  template: 'Your orders cannot be retrieved at the moment for some reason. We are working on it. Please try again later.'
					  });
						  alertPopup.then(function(res) {
		
					  });
					  
				});	
				
		}).error(function (data){
		  
		console.log(data);
		
			  var alertPopup = $ionicPopup.alert({
				  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				  template: 'Cannot purchase this item for some reason. Please try again later.'
			  });
				  alertPopup.then(function(res) {
			  });
		  
		});
	}
}


$ionicModal.fromTemplateUrl('templates/modals/buy-local.html', {
  scope: $scope,
  animation: 'slide-in-up'
}).then(function(modal) {
  $scope.modal = modal;
});

  
});

app.controller('BuyNationalModalCtrl', function($scope, $rootScope, $ionicModal, $ionicPopup, $http, $localStorage, WcApiUrl, $stateParams, $cordovaToast, $state, $timeout) {

ApiUrl = WcApiUrl.GetGeneralUrl();

$scope.createorder = function () {
	
	if ($localStorage.UserMeta.id == $rootScope.post.author.id) {
		
	  var alertPopup = $ionicPopup.alert({
		  title: 'Woops!',
		  template: 'You cannot buy your own item.'
	  });
		  alertPopup.then(function(res) {

	  });
	   $timeout(function() {
		alertPopup.close(); 
	 }, 1500);	
		
	} else {
		
			$scope.order_json = {
		  "order": {
			"payment_details": {
			  "method_id": "cod",
			  "method_title": "Cash On Delivery",
			  "paid": false
			},
			"status": "on-hold",
			"billing_address": {
			  "first_name":  $localStorage.UserMeta.first_name,
			  "last_name": $localStorage.UserMeta.last_name,
			  "email": $localStorage.UserMeta.email,
			},
			"customer_id": $localStorage.UserMeta.id,
			"line_items": [
			  {
				"product_id": $stateParams.postID,
				"quantity": 1
			  }
			],
			"shipping_lines": [
			  {
				"method_id": "local_pickup",
				"method_title": "Local Pickup"
			  }
			]
		  }
		};
	
	$scope.orderinfo = JSON.stringify($scope.order_json);
			
	var req = {
	 method: 'POST',
	 url: '/wc-api/v2/orders' + ApiUrl,
	 headers: {
	   'Content-Type': undefined
	 },
	 data: $scope.orderinfo,
	}
	
	$http(req)
		.success(function(data){	
		
			orderdata = JSON.stringify(data);
			$scope.neworder = JSON.parse(orderdata);	
			console.log($scope.neworder);
			
			$cordovaToast.showLongBottom('Successfully purchased. Enjoy your item!');
			
				$http.get('/e8oada3z/user/updateuser/?cookie=' + $localStorage.UserMeta.cookie + '&action=insertorder&userid=' + $localStorage.UserMeta.id + '&metakey=userorders&metavalue=' + parseInt($scope.neworder.order.line_items[0].product_id) + '&order_id=' + parseInt($scope.neworder.order.order_number) + '&order_total=' + parseFloat($scope.neworder.order.total) + '&order_status=' + $scope.neworder.order.status + '&updated_at=' + encodeURIComponent($scope.neworder.order.updated_at) + '&item_name=' + encodeURIComponent($scope.neworder.order.line_items[0].name) + '&item_id=' + $scope.neworder.order.line_items[0].product_id + '&customer_name=' + encodeURIComponent($scope.neworder.order.customer.username) + '&customer_id=' + $scope.neworder.order.customer_id + '&delivery_type=' + encodeURIComponent($scope.neworder.order.shipping_lines[0].method_id) + '&created_at=' + encodeURIComponent($scope.neworder.order.created_at) ).success(function(data) {		
					
					result = JSON.stringify(data);
					$scope.userorders = JSON.parse(result);	
			
					console.log($scope.userorders);	
					
					$state.go('dashboard', { profileID: $localStorage.UserMeta.id });
		
				}).error(function (data){	
				
					errordata = JSON.stringify(data);
					alert(errordata);
				
					$rootScope.$broadcast('loading:hide');	
		
					  var alertPopup = $ionicPopup.alert({
						  title: 'Hmm... There is a problem <i class="icon ion-alert popuplink"></i>',
						  template: 'Your orders cannot be retrieved at the moment for some reason. We are working on it. Please try again later.'
					  });
						  alertPopup.then(function(res) {
		
					  });
					  
				});	
				
		}).error(function (data){
		  
		console.log(data);
		
			  var alertPopup = $ionicPopup.alert({
				  title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				  template: 'Cannot purchase this item for some reason. Please try again later.'
			  });
				  alertPopup.then(function(res) {
			  });
		  
		});
	}
}


$ionicModal.fromTemplateUrl('templates/modals/buy-national.html', {
  scope: $scope,
  animation: 'slide-in-up'
}).then(function(modal) {
  $scope.modal = modal;
});

  
});