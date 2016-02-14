angular.module('OWMApp', ['ngRoute', 'ngAnimate'])
    .value('ownCities', ['New York', 'Dallas', 'Chicago'])

.controller('HomeCtrl', function ($scope) {
    //empty for now
})

.config(function ($routeProvider) {
    $routeProvider.when('/', {
            templateUrl: './home.html',
            controller: 'HomeCtrl'
        })
        .when('/cities/:city', {
            templateUrl: './city.html',
            controller: 'CityCtrl',
            resolve: {
                city: function (ownCities, $route, $location) {
                    var city = $route.current.params.city;
                    if (ownCities.indexOf(city) == -1) {
                        $location.path('/error');
                        return;
                    }
                    return city;
                }
            }
        })
        .when('/error', {
            template: '<p>Error - Page Not Found</p>'
        });

})

.controller('CityCtrl', function ($scope, city) {
    $scope.city = city;
})

.run(function ($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeError', function () {
        $location.path("/error");
    });
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        $timeout(function () {
            $rootScope.isLoading = false;
        }, 1000);
    })
})
