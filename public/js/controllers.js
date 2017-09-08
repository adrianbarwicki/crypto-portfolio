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

.controller('assetCtrl', [ '$scope', '$state', '$http', '$stateParams', function($scope, $state, $http, $stateParams) {
        $scope.asset = {};
        $scope.ticker = $stateParams.ticker;

        $http
            .get('/api/asset/' + $stateParams.ticker)
            .then(response => {
                $scope.asset = response.data;
            });

        $scope.updateAsset = function() {
            $http
            .put('/api/asset/' + $stateParams.ticker, $scope.asset)
            .then(response => {
                $state.go('app.main');
            });
        };
    }])

.controller('newsCtrl', [ '$scope', '$http', function($scope, $http) {
    $scope.portfolio = {};

    $http
        .get('/api/news')
        .then(response => {
            $scope.news = response.data;
        })
}])
