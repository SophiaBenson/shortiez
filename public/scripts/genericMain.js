angular.module('myApp')
.controller('genericMainController',['$scope', '$http', '$uibModal', '$rootScope', 'userData',
function($scope, $http, $uibModal, $rootScope, userData){

  userData.getUsers();

  $scope.nameInput = '';

  $scope.addUser = function(){
    console.log('in addTempUser');
    var userInfo = {
      name: $scope.nameInput
    }; // end object
    $http({
      method: 'POST',
      url: '/addTempUser',
      data: userInfo
    }); // end POST
    $scope.nameInput = '';
    userData.getUsers();
  }; // end addUser function

  $scope.deleteUser = function(index){
    console.log('in deleteTempUser');
    var userId = {
      id: $rootScope.usersArray[index]._id
    }; // end userId
    $http({
      method: 'POST',
      url: '/removeTempUser',
      data: userId
    }); // end http
    $rootScope.usersArray.splice(index, 1);
  }; // end deleteUser

  $scope.openUpdate = function(index){
    console.log('in openUpdate');
    $uibModal.open({
      templateUrl: 'views/pages/updateUser.html',
      controller: 'modalController',
      size: 'sm',
      resolve: {
         userId: function(){
           return index;
         } // end userId
       } // end resolve
    }); // end $modal.open
  }; // end openUpdate

  $scope.updateUser = function(id){
    console.log('in updateUser');
    var updateInfo = {
      id: $rootScope.usersArray[id]._id,
      name: $scope.nameUpdate
    }; // end updateInfo
      $http({
        method: 'POST',
        url: '/updateTempUser',
        data: updateInfo
      }).then(function(response){
        userData.getUsers();
        } // end then
      ); // end http
  }; // end updateUser

}]); // end controller 'playersController'

//-----------------------------------------  modalController -----------------------------------------

angular.module('myApp').controller('modalController',
function ($scope, $uibModalInstance, $rootScope, userId) {

  $rootScope.id = userId;
  $scope.nameUpdate = $rootScope.usersArray[userId].name;

  $rootScope.cancel = function(){
    $uibModalInstance.close();
  }; // end cancel
}); // end modalController
