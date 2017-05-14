app.controller('ShareDataCtrl', function($scope, $rootScope, $localStorage) {
	
	if ($rootScope.dataforcards !== undefined) {
	
		var sharing_image = $rootScope.dataforcards.posts[$localStorage.newCard.cardindex].imagefull === 'img/noimage.png' ? 'https://inmyunimedia1.s3-eu-west-1.amazonaws.com/media/b148f6cd3c7a.png' : $rootScope.dataforcards.posts[$localStorage.newCard.cardindex].imagefull;
		
		var sharing_message = "Just saw '" + $rootScope.dataforcards.posts[$localStorage.newCard.cardindex].title + "' on the @inmyuni university app. Have a look:";
	
		var sharing_link = $rootScope.dataforcards.posts[$localStorage.newCard.cardindex].url.slice(0, - 1); 
		
		$scope.Share = {message: sharing_message, image: sharing_image, link: sharing_link};
	
	}
	
});

app.controller('ShareGeneralCtrl', function($scope, $ionicPopover, $cordovaEmailComposer, $ionicPopup, $cordovaSocialSharing, $state, $rootScope) {
	
 $ionicPopover.fromTemplateUrl('templates/popovers/cardshare.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

/*$scope.share_email = function() {
  
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
			to: "",
			cc: 'erika@mustermann.de',
			bcc: ['john@doe.com', 'jane@doe.com'],
			attachments: [
			  'file://img/logo.png',
			  'res://icon.png',
			  'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
			  'file://README.pdf'
			],
			subject: "Just Browsing...",
			body: "<h2>How are you?</h2><br> I just saw" + $rootScope.dataforcards.posts[$localStorage.newCard.cardindex].title + "this item on the Inmyuni app. I really recommend it. Grab it here: https:///",
			isHtml: true
		  };
	
	 $cordovaEmailComposer.open(email).then(null, function () {
		 
			var alertPopup = $ionicPopup.alert({
				title: 'Notice',
				template: 'Email has been cancelled.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});
	 });
 
};*/
	
    $scope.shareViaTwitter = function(message, image, link) {
		
		console.log($scope.Share);
		
        $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaTwitter(message, image, link);
        
		}, function(error) {
			
			alert(error);
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment.  Please install Twitter and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };
	
    $scope.shareViaFacebook = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("facebook", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaFacebook(message, image, link);
        
		}, function(error) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install Facebook and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    }
	
    $scope.shareViaWhatsApp = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("whatsapp", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaWhatsApp(message, image, link);
        
		}, function(error) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install WhatsApp and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    }

    $scope.shareViaEmail = function(message, image, link) {
		
		var content = message;
			
		var message = content + " " + link;
		
        $cordovaSocialSharing.canShareViaEmail(message, image, link).then(function(result) {
			
		var subject = "I found something interesting on Inmyuni";
			
		  $cordovaSocialSharing.shareViaEmail(message, subject).then(function(result) {
				
			  // Success!
			}, function(err) {

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'This item cannot be shared at the moment. Please try again later. Error:' + err
				});
					alertPopup.then(function(res) {
						$state.go($state.current, {}, {reload: true});
				});

			});
        
		}, function(err) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install an Email client and try again. Error:' + err
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    }
	
	$scope.shareViaAny = function(message, image, link) {
	
	  $cordovaSocialSharing
    .share(message, link) // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    })
	
	}
	
});

app.controller('ShareMyItemsCtrl', function($scope, $ionicPopover, $cordovaEmailComposer, $ionicPopup, $cordovaSocialSharing, $state, $rootScope) {
	
 $ionicPopover.fromTemplateUrl('templates/popovers/cardshare_myitems.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

    $scope.shareViaTwitter = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaTwitter(message, image, link);
        
		}, function(error) {
			
			alert(error);
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment.  Please install Twitter and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };
	
    $scope.shareViaFacebook = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("facebook", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaFacebook(message, image, link);
        
		}, function(error) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install Facebook and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    }
	
    $scope.shareViaWhatsApp = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("whatsapp", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaWhatsApp(message, image, link);
        
		}, function(error) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install WhatsApp and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };
	
    $scope.shareViaEmail = function(message, image, link) {
		
		var content = message;
			
		var message = content + " " + link;
		
        $cordovaSocialSharing.canShareViaEmail(message, image, link).then(function(result) {
			
		var subject = "I found something interesting on Inmyuni";
			
		  $cordovaSocialSharing.shareViaEmail(message, subject).then(function(result) {
				
			  // Success!
			}, function(err) {

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'This item cannot be shared at the moment. Please try again later. Error:' + err
				});
					alertPopup.then(function(res) {
						$state.go($state.current, {}, {reload: true});
				});

			});
        
		}, function(err) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install an Email client and try again. Error:' + err
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };
	
	$scope.shareViaAny = function(message, image, link) {
	
	  $cordovaSocialSharing
    .share(message, link) // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    })
	
	}
	
});

app.controller('ShareProfileCtrl', function($scope, $ionicPopover, $cordovaEmailComposer, $ionicPopup, $cordovaSocialSharing, $state, $rootScope) {
	
 $ionicPopover.fromTemplateUrl('templates/popovers/cardshare_profile.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

    $scope.shareViaTwitter = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaTwitter(message, image, link);
        
		}, function(error) {
			
			alert(error);
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment.  Please install Twitter and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };
	
    $scope.shareViaFacebook = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("facebook", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaFacebook(message, image, link);
        
		}, function(error) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install Facebook and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    }
	
    $scope.shareViaWhatsApp = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("whatsapp", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaWhatsApp(message, image, link);
        
		}, function(error) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install WhatsApp and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };
	
    $scope.shareViaEmail = function(message, image, link) {
		
		var content = message;
			
		var message = content + " " + link;
		
        $cordovaSocialSharing.canShareViaEmail(message, image, link).then(function(result) {
			
		var subject = "I found something interesting on Inmyuni";
			
		  $cordovaSocialSharing.shareViaEmail(message, subject).then(function(result) {
				
			  // Success!
			}, function(err) {

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'This item cannot be shared at the moment. Please try again later. Error:' + err
				});
					alertPopup.then(function(res) {
						$state.go($state.current, {}, {reload: true});
				});

			});
        
		}, function(err) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install an Email client and try again. Error:' + err
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };	
	
	$scope.shareViaAny = function(message, image, link) {
	
	  $cordovaSocialSharing
    .share(message, link) // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    })
	
	}
	
});

app.controller('ShareProfileLinkCtrl', function($scope, $ionicPopover, $cordovaEmailComposer, $ionicPopup, $cordovaSocialSharing, $state, $rootScope) {
	
 $ionicPopover.fromTemplateUrl('templates/popovers/cardshare_profilelink.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

    $scope.shareViaTwitter = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaTwitter(message, image, link);
        
		}, function(error) {
			
			alert(error);
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment.  Please install Twitter and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };
	
    $scope.shareViaFacebook = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("facebook", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaFacebook(message, image, link);
        
		}, function(error) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install Facebook and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    }
	
    $scope.shareViaWhatsApp = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("whatsapp", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaWhatsApp(message, image, link);
        
		}, function(error) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install WhatsApp and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };
	
    $scope.shareViaEmail = function(message, image, link) {
		
		var content = message;
			
		var message = content + " " + link;
		
        $cordovaSocialSharing.canShareViaEmail(message, image, link).then(function(result) {
			
		var subject = "I found something interesting on Inmyuni";
			
		  $cordovaSocialSharing.shareViaEmail(message, subject).then(function(result) {
				
			  // Success!
			}, function(err) {

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'This item cannot be shared at the moment. Please try again later. Error:' + err
				});
					alertPopup.then(function(res) {
						$state.go($state.current, {}, {reload: true});
				});

			});
        
		}, function(err) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install an Email client and try again. Error:' + err
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };
	
	$scope.shareViaAny = function(message, image, link) {
	
	  $cordovaSocialSharing
    .share(message, link) // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    })
	
	}
	
});

app.controller('ShareDataViewMoreProfileCtrl', function($scope, $ionicPopover, $cordovaEmailComposer, $ionicPopup, $cordovaSocialSharing, $state, $rootScope) {
	
 $ionicPopover.fromTemplateUrl('templates/popovers/cardshare_profileviewmore.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

    $scope.shareViaTwitter = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaTwitter(message, image, link);
        
		}, function(error) {
			
			alert(error);
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment.  Please install Twitter and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };
	
    $scope.shareViaFacebook = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("facebook", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaFacebook(message, image, link);
        
		}, function(error) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install Facebook and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    }
	
    $scope.shareViaWhatsApp = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("whatsapp", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaWhatsApp(message, image, link);
        
		}, function(error) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install WhatsApp and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };
	
    $scope.shareViaEmail = function(message, image, link) {
		
		var content = message;
			
		var message = content + " " + link;
		
        $cordovaSocialSharing.canShareViaEmail(message, image, link).then(function(result) {
			
		var subject = "I found something interesting on Inmyuni";
			
		  $cordovaSocialSharing.shareViaEmail(message, subject).then(function(result) {
				
			  // Success!
			}, function(err) {

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'This item cannot be shared at the moment. Please try again later. Error:' + err
				});
					alertPopup.then(function(res) {
						$state.go($state.current, {}, {reload: true});
				});

			});
        
		}, function(err) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install an Email client and try again. Error:' + err
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };
	
	$scope.shareViaAny = function(message, image, link) {
	
	  $cordovaSocialSharing
    .share(message, link) // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    })
	
	}
	
  $scope.resetshare = function() {
	  
	// Since the popover card is only called once on pageload, I need to reinitiate each share when the share button is clicked
  
	var sharing_image = $rootScope.authorposts.posts[$rootScope.profileviewmoreindex].imagefull === 'img/noimage.png' ? 'https://inmyunimedia1.s3-eu-west-1.amazonaws.com/media/b148f6cd3c7a.png' : $rootScope.authorposts.posts[$rootScope.profileviewmoreindex].imagefull;
	
	var sharing_message = "Just saw '" + $rootScope.authorposts.posts[$rootScope.profileviewmoreindex].title + "' on the @inmyuni university app. Have a look:";
  
	var sharing_link = $rootScope.authorposts.posts[$rootScope.profileviewmoreindex].url.slice(0, - 1); 
	
	$rootScope.Share = {message: sharing_message, image: sharing_image, link: sharing_link};
	console.log($rootScope.Share);
	
  };
	
});

app.controller('ShareExploreGridCtrl', function($scope, $ionicPopover, $cordovaEmailComposer, $ionicPopup, $cordovaSocialSharing, $state, $rootScope) {
	
 $ionicPopover.fromTemplateUrl('templates/popovers/cardshare_exploregrid.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

    $scope.shareViaTwitter = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaTwitter(message, image, link);
        
		}, function(error) {
			
			alert(error);
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment.  Please install Twitter and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };
	
    $scope.shareViaFacebook = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("facebook", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaFacebook(message, image, link);
        
		}, function(error) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install Facebook and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    }
	
    $scope.shareViaWhatsApp = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("whatsapp", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaWhatsApp(message, image, link);
        
		}, function(error) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install WhatsApp and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };

    $scope.shareViaEmail = function(message, image, link) {
		
		var content = message;
			
		var message = content + " " + link;
		
        $cordovaSocialSharing.canShareViaEmail(message, image, link).then(function(result) {
			
		var subject = "I found something interesting on Inmyuni";
			
		  $cordovaSocialSharing.shareViaEmail(message, subject).then(function(result) {
				
			  // Success!
			}, function(err) {

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'This item cannot be shared at the moment. Please try again later. Error:' + err
				});
					alertPopup.then(function(res) {
						$state.go($state.current, {}, {reload: true});
				});

			});
        
		}, function(err) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install an Email client and try again. Error:' + err
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };
	
	$scope.shareViaAny = function(message, image, link) {
	
	  $cordovaSocialSharing
    .share(message, link) // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    })
	
	}
	
});

app.controller('ShareItemSingleCtrl', function($scope, $ionicPopover, $cordovaEmailComposer, $ionicPopup, $cordovaSocialSharing, $state, $rootScope) {
	
 $ionicPopover.fromTemplateUrl('templates/popovers/cardshare_itemsingle.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

    $scope.shareViaTwitter = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaTwitter(message, image, link);
        
		}, function(error) {
			
			alert(error);
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment.  Please install Twitter and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };
	
    $scope.shareViaFacebook = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("facebook", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaFacebook(message, image, link);
        
		}, function(error) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install Facebook and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    }
	
    $scope.shareViaWhatsApp = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("whatsapp", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaWhatsApp(message, image, link);
        
		}, function(error) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install WhatsApp and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };
	
    $scope.shareViaEmail = function(message, image, link) {
		
		var content = message;
			
		var message = content + " " + link;
		
        $cordovaSocialSharing.canShareViaEmail(message, image, link).then(function(result) {
			
		var subject = "I found something interesting on Inmyuni";
			
		  $cordovaSocialSharing.shareViaEmail(message, subject).then(function(result) {
				
			  // Success!
			}, function(err) {

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'This item cannot be shared at the moment. Please try again later. Error:' + err
				});
					alertPopup.then(function(res) {
						$state.go($state.current, {}, {reload: true});
				});

			});
        
		}, function(err) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install an Email client and try again. Error:' + err
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };
	
	$scope.shareViaAny = function(message, image, link) {
	
	  $cordovaSocialSharing
    .share(message, link) // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    })
	
	}
	
});

app.controller('ShareMyOrderCtrl', function($scope, $ionicPopover, $cordovaEmailComposer, $ionicPopup, $cordovaSocialSharing, $state, $rootScope) {
	
 $ionicPopover.fromTemplateUrl('templates/popovers/cardshare_myorder.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

    $scope.shareViaTwitter = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaTwitter(message, image, link);
        
		}, function(error) {
			
			alert(error);
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment.  Please install Twitter and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };
	
    $scope.shareViaFacebook = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("facebook", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaFacebook(message, image, link);
        
		}, function(error) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install Facebook and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    }
	
    $scope.shareViaWhatsApp = function(message, image, link) {
		
        $cordovaSocialSharing.canShareVia("whatsapp", message, image, link).then(function(result) {
			
            $cordovaSocialSharing.shareViaWhatsApp(message, image, link);
        
		}, function(error) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install WhatsApp and try again.'
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };

    $scope.shareViaEmail = function(message, image, link) {
		
		var content = message;
			
		message = content + " " + link;
		
        $cordovaSocialSharing.canShareViaEmail(message, image, link).then(function(result) {
			
		var subject = "I found something interesting on Inmyuni";
			
		  $cordovaSocialSharing.shareViaEmail(message, subject).then(function(result) {
				
			  // Success!
			}, function(err) {

				var alertPopup = $ionicPopup.alert({
					title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
					template: 'This item cannot be shared at the moment. Please try again later. Error:' + err
				});
					alertPopup.then(function(res) {
						$state.go($state.current, {}, {reload: true});
				});

			});
        
		}, function(err) {
			
			var alertPopup = $ionicPopup.alert({
				title: 'There is a problem <i class="icon ion-alert popuplink"></i>',
				template: 'This item cannot be shared at the moment. Please install an Email client and try again. Error:' + err
			});
				alertPopup.then(function(res) {
					$state.go($state.current, {}, {reload: true});
			});

        });
    };
	
	$scope.shareViaAny = function(message, image, link) {
	
	  $cordovaSocialSharing
    .share(message, link) // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    })
	
	}
	
});