// controller.js

angular
.module('app')
.controller('dashboardCtrl', [ '$scope', '$http', function($scope, $http) {

    $scope.portfolio = {};

    $http
        .get('/api/portfolio')
        .then(response => {
            $scope.portfolio =response.data;
        })
}])

.controller('newsCtrl', [ '$scope', '$http', function($scope, $http) {
    $scope.portfolio = {};

    $http
        .get('/api/news')
        .then(response => {
            $scope.news = response.data;
        })
}])
