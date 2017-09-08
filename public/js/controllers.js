// controller.js

angular
.module('app')
.controller('dashboardCtrl', [ '$scope', '$http', function($scope, $http) {

    $scope.portfolio = {
        positions: []
    };

    $http
        .get('/api/portfolio')
        .then(response => {
            $scope.portfolio = response.data;
        })
}])

.controller('assetCtrl', [ '$scope', '$state', '$http', '$stateParams', function($scope, $state, $http, $stateParams) {
        $scope.asset = {};
        $scope.ticker = $stateParams.ticker;

        $http
            .get('/api/price-ticker/' + $stateParams.ticker)
            .then(response => {
                $scope.asset = response.data;
            });

        $scope.updateAsset = function() {
            $http
            .put('/api/price-ticker/' + $stateParams.ticker, $scope.asset)
            .then(response => {
                $state.go('app.main');
            });
        };
    }])

.controller('assetsCtrl', [ '$scope', '$state', '$http', '$stateParams', function($scope, $state, $http, $stateParams) {
        $scope.priceTickers = localStorage.getItem('assets') || [];

        $http
            .get('/api/price-tickers')
            .then(response => {
                localStorage.setItem('priceTickers', JSON.stringify(response.data));
                
                console.log(response.data)

                $scope.priceTickers = response.data;
            });

    }])

.controller('newsCtrl', [ '$scope', '$http', function($scope, $http) {
    $scope.portfolio = {};

    $http
        .get('/api/news')
        .then(response => {
            $scope.news = response.data;
        })
}])
