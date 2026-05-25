var app = angular.module('Vidzy', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){

    $routeProvider

    .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
    })

    .when('/add-video', {
        templateUrl: 'partials/video-form.html',
        controller: 'AddVideoCtrl'
    })

    .when('/video/:id', {
        templateUrl: 'partials/video-form.html',
        controller: 'EditVideoCtrl'
    })

    .otherwise({
        redirectTo: '/'
    });

}]);


app.controller('HomeCtrl', function($scope, $resource){

    var Videos = $resource('/api/videos');

    Videos.query(function(videos){

        $scope.videos = videos;

    });

});


app.controller('AddVideoCtrl',

function($scope, $resource, $location){

    var Videos = $resource('/api/videos');

    $scope.save = function(){

        Videos.save($scope.video, function(){

            $location.path('/');

        });

    };

});


app.controller('EditVideoCtrl',

function($scope, $resource, $location, $routeParams){

    var Videos = $resource('/api/videos/:id',

        { id: '@_id' },

        {
            update: { method: 'PUT' }
        }

    );

    Videos.get({ id: $routeParams.id }, function(video){

        $scope.video = video;

    });

    $scope.save = function(){

        Videos.update(

            { id: $scope.video._id },
            $scope.video,

            function(){

                $location.path('/');

            }

        );

    };

    $scope.delete = function(){

        Videos.delete(

            { id: $scope.video._id },

            function(){

                $location.path('/');

            }

        );

    };

});