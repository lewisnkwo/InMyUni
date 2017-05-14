app.controller('ItemViewMoreCtrl', function($scope, $ionicModal, $http, $localStorage, $stateParams, ImageDataGeneral) {
	
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