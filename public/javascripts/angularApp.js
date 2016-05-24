/**
 * Created by Yohan on 23/05/2016.
 */
var app = angular.module("proCard",['ui.router']);

app.factory('proCardFactory', ['$http', function($http){
    var o = {
        proCards: [],
        proCard:{}
    };

    o.getAll = function(){
        return $http.get('/proCards').success(function(data){
            angular.copy(data, o.proCards);
        });
    };

    o.createOne = function(proCard){
        return $http.post('/proCards', proCard).success(function(data){
            o.proCards.push(data);
        });
    };

    o.get = function(id) {
        console.log("in get function to retrieve one document " + id);
        return $http.get('/proCards/' + id).then(function(res){
            return res.data;
        });
    };

    return o;
}]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl',
                resolve: {
                    postPromise: ['proCardFactory', function(proCardFactory){
                        return proCardFactory.getAll();
                    }]
                }
            })
            .state('proCards', {
                url: '/proCards/{id}',
                templateUrl: '/proCards.html',
                controller: 'ProCardsCtrl',
                resolve: {
                    proCard: ['$stateParams', 'proCardFactory', function($stateParams, proCardFactory){
                        console.log("Resolve ongoing in state:"+ $stateParams.id);
                        return proCardFactory.get($stateParams.id);

                    }]
                }
            });

        $urlRouterProvider.otherwise('home');
    }]);

app.controller('MainCtrl', [
    '$scope',
    'proCardFactory',
    function($scope, proCardFactory){
        $scope.proCards =proCardFactory.proCards;

        $scope.createCard = function(){
            proCardFactory.createOne({
                lastName: $scope.lastName,
                firstName: $scope.firstName,
                number: $scope.proCardNumber,
                birthday :$scope.birthday
            });

            /*$scope.proCards.push({lastName: $scope.lastName,
                                  firstName: $scope.firstName,
                                  number: $scope.proCardNumber,
                                  birthday :$scope.birthday});*/

            $scope.lastName =''; $scope.firstName =''; $scope.proCardNumber=""; $scope.birthday='';
        };

    }]);

app.controller('ProCardsCtrl', [
    '$scope',
    'proCard',
        function($scope,proCard){
        $scope.proCard = proCard;
    }]);

