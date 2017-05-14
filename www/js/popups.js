

app.controller('NewItemFormCtrl', function($scope,$ionicPopup, $timeout) {
	
    $scope.itemtitle;
    $scope.itemprice;
	$scope.itemdesc;
    $scope.itemcat;

$scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Earning Money using Inmyuni',
       template: 'You can sell anything from <strong>academic books</strong> to <strong>kitchen appliances</strong> – basically anything [sensible] that a student may need!'
     });
     alertPopup.then(function(res) {
     });
	 $timeout(function() {
      alertPopup.close(); 
   }, 7000);
   };
  
});

app.controller('MyItemsPopupCtrl', function($scope, $ionicPopup, $timeout) {

$scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'How do I edit an item?',
       template: 'Just simply swipe to the left on an item, then press the <i class="icon ion-edit"></i> button.<br /><br /><strong>Refreshing your items</strong><br />You can also pull down to refresh your items if anything seems not updated.<br /><br /><strong>Quick Tip: </strong><br />Tap the top bar to quickly scroll back up in the app.<br /><br /><strong>Hiding an item:</strong><br />Tap the <i class="icon ion-eye-disabled"></i> button, after swiping to the left on an item to disable the visibility of it (only inside the app).'
     });
     alertPopup.then(function(res) {
     });
	 $timeout(function() {
      alertPopup.close(); 
   }, 7000);
   };

});

app.controller('RateThisUserCtrl', function($scope, $ionicPopup, $timeout) {

$scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Liked the experience?',
       template: "Tap the 'Rate' button to rate this user."
     });
     alertPopup.then(function(res) {
     });
	 $timeout(function() {
      alertPopup.close(); 
   }, 10000);
   };

});

app.controller('WhyAPhotoCtrl', function($scope, $ionicPopup, $timeout) {

$scope.whyaphoto = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Why do I need to add a photo? Why not just use this cover?',
       template: 'There are two reasons:<br /><br /> <strong>1.</strong> To prove that the item you are selling is yours; <strong>2.</strong> To use a better quality/resolution image for this item.'
     });
     alertPopup.then(function(res) {
     });
	 $timeout(function() {
      alertPopup.close(); 
   }, 15000);
   };  

});

app.controller('UploadPhotosCtrl', function($scope, $ionicPopup, $timeout) {

$scope.morephotos = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Can I upload more than one photo?',
       template: 'The ability to upload multiple photos for an item will be added in the next major update.'
     });
     alertPopup.then(function(res) {
     });
	 $timeout(function() {
      alertPopup.close(); 
   }, 15000);
   };  

});

app.controller('ItemSearchCtrl', function($scope, $ionicPopup, $timeout) {

$scope.searchhelp = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'See something you like? Tap it.',
       template: 'By tapping quickly over the item, a pop-up menu will appear giving you options to buy, share or do other actions with the item.<strong><br /><br />How do I refresh for new/updated items?</strong><br />You can refresh the results by pulling down the page from the top.<strong><br /><br />List View</strong><br />Swipe to the left on an item to view action buttons.<br /><br /><strong>Quick Tip: </strong><br />Tap the top bar to quickly scroll back up in the app.'
     });
     alertPopup.then(function(res) {
     });
	 $timeout(function() {
      alertPopup.close(); 
   }, 15000);
   };  

});

app.controller('ItemSearchProfileCtrl', function($scope, $ionicPopup, $timeout) {

$scope.searchhelp = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'See something you like? Tap it.',
       template: 'By tapping quickly over the item, a pop-up menu will appear giving you options to buy, share or do other actions with the item.<strong><br /><br />List View</strong><br />Swipe to the left on an item to view action buttons.<br /><br /><strong>Quick Tip: </strong><br />Tap the top bar to quickly scroll back up in the app.'
     });
     alertPopup.then(function(res) {
     });
	 $timeout(function() {
      alertPopup.close(); 
   }, 15000);
   };  

});

app.controller('ItemCardHelpCtrl', function($scope, $ionicPopup, $timeout) {

$scope.showitemcardhelp = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'How do I view the full info of an item?',
       template: 'Click on the <i class="icon ion-eye"></i> icon on the bottom-left hand corner of the image to view the full information of an item.'
     });
     alertPopup.then(function(res) {
     });
	 $timeout(function() {
      alertPopup.close(); 
   }, 15000);
   };  

});

app.controller('ExploreHelpCtrl', function($scope, $ionicPopup, $timeout) {

$scope.showhelp = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Explore Inmyuni - Filters',
       template: 'Toggle each setting based on your own preferences. <br /><br /><i class="icon ion-university" style="padding-right: 5px;"></i><strong>Show Only My Uni</strong><br />Show items from sellers in only your university. <br /><br /><i class="icon ion-university" style="padding-right: 5px;"></i><strong>Show From All Unis</strong><br />Show items from sellers in all universities in the UK.<br /><br /><i class="icon ion-person-stalker" style="padding-right: 5px;"></i><strong>Show Only Following</strong><br />Show items only from sellers who you are following.<br /><br /><i class="icon ion-star"></i> <strong>Show Only Featured</strong><br />Show items only that are currently featured on Inmyuni.',
	   okType: 'button-calm'
     });
     alertPopup.then(function(res) {
     });
	 $timeout(function() {
      alertPopup.close(); 
   }, 20000);
   };  

});