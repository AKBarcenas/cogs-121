/*angular.module('chatSocket', [])
   .factory('chatSocket', ['socketFactory', function(socketFactory) {
      return socketFactory();
   }]);*/
sampleApp.factory('chatSocket', ['socketFactory', function(socketFactory) {
   return socketFactory();
}]);
