/*angular.module('chatSocket', [])
   .factory('chatSocket', ['socketFactory', function(socketFactory) {
      return socketFactory();
   }]);*/

angular.module('chatSocket', ['btford.socket-io']).factory('chatSocket', function(socketFactory) {
   /*var myIoSocket = io.connect("http://localhost:8080");

   mySocket = socketFactory({
      ioSocket: myIoSocket
   });

   return {
      on : function (e,c){
         console.log("We are ON");
      }
   }*/
   return socketFactory();
});
