/*
 * Controller where we get the data on movies
 */
(function () {
    'use strict';
    
    // the 'movie' part comes from the name of the app we created in movie.module.js
    var myApp = angular.module("movie");
    
    // 'dataControl' is used in the html file when defning the ng-controller attribute
    myApp.controller("dataControl", function($scope, $http, $window) {
        
        // define data for the app
        // in the html code we will refer to data.movies. The data part comes from $scope.data, the movies part comes from the JSON object below
        
        $http.get('getmovie.php')
            .then(function(response) {
                // response.data.value has value come from the getmovies.php file $response['value']['movies'] = $movies;
                $scope.data = response.data.value;
            }
                   );
        /*
        $scope.data = {
            "movies":[
                {"name":"Lionel Messi", "country":"Argentina", "club":"FC Barcelona", "video":"<iframe src='https://www.youtube.com/embed/E2MBCa_OFsY' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>", "videoid":"E2MBCa_OFsY"},
                {"name":"Neymar Jr.", "country":"Brazil", "club":"Paris Saint Germain", "video":"<iframe src='https://www.youtube.com/embed/E2MBCa_OFsY' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>", "videoid":"E2MBCa_OFsY"},
                {"name":"Gianluigi Buffon", "country":"Italy", "club":"Juventus", "video":"<iframe src='https://www.youtube.com/embed/U0XSU0wNiNw' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>", "videoid":"U0XSU0wNiNw"},
                {"name":"Diego Godin", "country":"Uruguay", "club":"Atletico Madrid", "video":"<iframe src='https://www.youtube.com/embed/E2MBCa_OFsY' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>", "videoid":"E2MBCa_OFsY"}
            ]
        };
        */
        
        
        /*
         *    Code for search bar
         *    With queryBy you can say which attribute you want to search under. For example if it is "name" it will only search under names. If you want to search under everything, then use "$"
         *    We are assuming there is an input element with an ng-model="query[queryBy]"
         *    We are also assuming that you are filtering through this query when you get data under ng-repeat
         */
        $scope.query = {};
        $scope.queryBy = "$";
            
        // this variable will hold the page number that should be highlighted in the menu bar
        // 0 is for index.html
        // 1 is for newmovie.html
        $scope.menuHighlight = 0;
        
        
        // function to send new movie information to web api to add it to the database
        $scope.newMovie = function(movieDetails) {
          var movieupload = angular.copy(movieDetails);
          
          $http.post("newmovie.php", movieupload)
            .then(function (response) {
               if (response.status == 200) {
                    if (response.data.status == 'error') {
                        alert('error: ' + response.data.message);
                    } else {
                        // successful
                        // send user back to home page
                        $window.location.href = "index.html";
                    }
               } else {
                    alert('unexpected error');
               }
            });
        };
        
        
        // function to delete a movie. it receives the movie's name and id and call a php web api to complete deletion from the database
        $scope.deleteMovie = function(name, id) {
            if (confirm("Are you sure you want to delete " + name + "?")) {
          
                $http.post("deletemovie.php", {"id" : id})
                  .then(function (response) {
                     if (response.status == 200) {
                          if (response.data.status == 'error') {
                              alert('error: ' + response.data.message);
                          } else {
                              // successful
                              // send user back to home page
                              $window.location.href = "index.html";
                          }
                     } else {
                          alert('unexpected error');
                     }
                  }
                );
            }
        };
        
        // function to edit movie data and send it to web api to edit the movie in the database
        $scope.editMovie = function(movieDetails) {
          var movieupload = angular.copy(movieDetails);
          
          $http.post("editmovie.php", movieupload)
            .then(function (response) {
               if (response.status == 200) {
                    if (response.data.status == 'error') {
                        alert('error: ' + response.data.message);
                    } else {
                        // successful
                        // send user back to home page
                        $window.location.href = "index.html";
                    }
               } else {
                    alert('unexpected error');
               }
            });
        };
        

        /*
         * Set edit mode of a particular movie
         * on is true if we are setting edit mode to be on, false otherwise
         * movie corresponds to the movie for which we are setting an edit mode
         */
        $scope.setEditMode = function(on, movie) {
            if (on) {
                // if movie had a birth, for example, you'd include the line below
                // movie.birthyear = parseInt(movie.birthyear);
                // editmovie matches the ng-model used in the form we use to edit movie information
                $scope.editmovie = angular.copy(movie);
                movie.editMode = true;
            } else {
                // if editmovie is null we assume no movie is currently being edited
                $scope.editmovie = null;
                movie.editMode = false;
            }
        };
        
        /*
         * Gets the edit mode for a particular movie
         */
        $scope.getEditMode = function(movie) {
            return movie.editMode;
        };
        
        
        // function to send new account information to web api to add it to the database
        $scope.newAccount = function(accountDetails) {
          var accountupload = angular.copy(accountDetails);
          
          $http.post("newaccount.php", accountupload)
            .then(function (response) {
               if (response.status == 200) {
                    if (response.data.status == 'error') {
                        alert('error: ' + response.data.message);
                    } else {
                        // successful
                        // send user back to home page
                        $window.location.href = "index.html";
                    }
               } else {
                    alert('unexpected error');
               }
            });                        
        };        
        
        // function to send new account information to web api to add it to the database
        $scope.login = function(accountDetails) {
          var accountupload = angular.copy(accountDetails);
          
          $http.post("login.php", accountupload)
            .then(function (response) {
               if (response.status == 200) {
                    if (response.data.status == 'error') {
                        alert('error: ' + response.data.message);
                    } else {
                        // successful
                        // send user back to home page
                        $window.location.href = "index.html";
                    }
               } else {
                    alert('unexpected error');
               }
            });                        
        };
        
        
        // function to log the user out
        $scope.logout = function() {
          $http.post("logout.php")
            .then(function (response) {
               if (response.status == 200) {
                    if (response.data.status == 'error') {
                        alert('error: ' + response.data.message);
                    } else {
                        // successful
                        // send user back to home page
                        $window.location.href = "index.html";
                    }
               } else {
                    alert('unexpected error');
               }
            });                        
        };             
        
        // function to check if user is logged in
        $scope.checkifloggedin = function() {
          $http.post("isloggedin.php")
            .then(function (response) {
               if (response.status == 200) {
                    if (response.data.status == 'error') {
                        alert('error: ' + response.data.message);
                    } else {
                        // successful
                        // set $scope.isloggedin based on whether the user is logged in or not
                        $scope.isloggedin = response.data.loggedin;
                    }
               } else {
                    alert('unexpected error');
               }
            });                        
        };       

        
    });
    
    
} )();
