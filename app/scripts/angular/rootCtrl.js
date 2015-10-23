/**
 * Created by wpguo on 10/23/2015.
 */
'use strict';

ctrls.controller('RootCtrl', ['$scope', '$location', function($scope, $location){
    $scope.open = function(url){
        console.log(url);
        $location.url(url);
    }
}]);