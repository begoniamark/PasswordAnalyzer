(function(){
   
	"use strict";
    
    var app = angular.module('app-password', []);
    app.controller('passwordController', function($scope, $http) {
    	
        $scope.strength = '';
    	$scope.strengthFlag = 0;
		$scope.count =0;
        $scope.isDisabled=false;
        $scope.loading = false;
        $scope.seriesChart = '';

        $("#password").keypress(function() {
            $scope.loading = true;
            $scope.string  = true;
        });
   
    	$scope.$watch('password', function(passwordStrength){
        
        $scope.temp=passwordStrength;

            setTimeout(function() {             
            
                duplicatePasswordCount();// call duplicatePassword function to check if password has duplicate
                
                var countUpperCase = $scope.temp.replace(/[^A-Z]/g, "").length;
                var countLowerCase = $scope.temp.replace(/[^a-z]/g, "").length;
                var countNumber = $scope.temp.replace(/[^0-9]/g, "").length;
                var countSymbol = $scope.temp.replace(/[^-!@$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, "").length;

                if($scope.temp.length >= 8 && countUpperCase > 0 && countLowerCase > 0 && countNumber >=1  && countSymbol >=1 && $scope.count ==0) {
                    $scope.strength = 'STRONG';
                    $scope.strengthFlag = 1; 
                } 
                else if ($scope.temp.length >= 8 && countUpperCase > 0 && countLowerCase > 0 && countNumber ==0 && countSymbol ==0 && $scope.count ==0){
                    $scope.strength = 'GOOD. Why not try '+ suggestPassword() + ' instead.';
                    $scope.strengthFlag = 2; 
                }
                else if ($scope.temp.length >= 8 && countNumber ==0 && countSymbol ==0 && $scope.count ==0&& countNumber ==0 && countNumber ==0){
                    $scope.strength = 'ACCEPTABLE. Why not try '+ suggestPassword() + ' instead.';
                    $scope.strengthFlag = 3; 
                }
                else if ($scope.count > 0) {
                    $scope.strength = 'DUPLICATE. Why not try '+ suggestPassword() + ' instead.';
                    $scope.strengthFlag = 4; 
                }
                else {
                    $scope.strength = 'WEAK. Why not try '+ suggestPassword() + ' instead.';
                    $scope.strengthFlag = 5; 
                }               
                $scope.isSubmitDisabled=false;
            }, 2000);
           
            setInterval(function() {        
                $scope.loading = false;
            }, 1000);  

        });

    	$scope.chart=false;
        $scope.reset=false;
        //Will save to db the duplicate and weak passwords, so i can show the average/pecentage too.
    	$scope.savePassword = function () {
    		$scope.strengthFlag;
    		var request = $http({
    			method: "POST",
    			url: window.location.href + "save.php",
    			data: {
    				password: $scope.password,
    				strengthFlag: $scope.strengthFlag
    			}
    		})
            .then(function(){
               $http({
                    method: "GET",
                    url: window.location.href + "getAveragePassword.php",
                })
                .then(function (response) {
                    $scope.seriesChart = response.data.trim();
                    chartShow();        
                 });

               $http({
                    method: "GET",
                    url: window.location.href + "getTotalPassword.php",
                })
                .then(function (response) {
                    $scope.totalPassword = response.data.trim();
                    $scope.totalPassword = $scope.totalPassword.replace(/["]/g, "");
                 });

            })
            $scope.chart=true;
    		$scope.reset=true;
            $scope.isDisabled=true;
            $("#Save").attr("disabled","disabled");
    	}

        $scope.resetPassword = function () {
            $scope.chart=false;
            $scope.password =null;
            $scope.strengthFlag=false;
            $scope.reset=false;
            $scope.isDisabled=false;
        }

    	function duplicatePasswordCount() {
    		$http({
			    url: window.location.href + "getPasswordCount.php", 
			     method: "GET",
			  params: {password: $scope.password}
			 })
		.then(function (response) {
			 	$scope.count = response.data.trim();
			 });
    	}

        function checkDuplicatePassword(duplicateString){
       
            $http({
                url: window.location.href + "checkDuplicate.php", 
                 method: "GET",
              params: {password: duplicateString }
             })
        .then(function (response) {
                   duplicateString = response.data; 
             });
        
            return duplicateString;
        }


        function suggestPassword() {
           
            //random password length. maximum = 30 , minimum = 8
            //var randomLength = Math.floor(Math.random() * (30 - 8)) + 8;
            var randomString = "";
            var duplicated ="";
           // while(randomString!= duplicated) {
                
                var char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                var symbols ="`~!@#$%^&*()_+|[]{};:'\"./\\<>,?";
                var numbers ="0123456789";

                //random letters
                for( var i=0; i < 6; i++ )
                    randomString += char.charAt(Math.floor(Math.random() * char.length));
                //get 1 symbol
                for( var i=0; i < 1; i++ ) {
                    randomString += symbols.charAt(Math.floor(Math.random() * symbols.length)); 
                }
                //get 1 number
                for( var i=0; i < 1; i++ ) {
                    randomString += numbers.charAt(Math.floor(Math.random() * numbers.length)); 
                }
             // duplicated = checkDuplicatePassword(randomString);
                               
              
          //  }

            //if(randomString!=)

            return randomString;
        }

        function chartShow() {
                   
            var removeSymbol = $scope.seriesChart.replace(/["]/g, "");
            var [a, b, c,d,e] = removeSymbol.split(',');
            var strong = parseInt(a);
            var good = parseInt(b);
            var acceptable = parseInt(c);
            var duplicate = parseInt(d);
            var weak = parseInt(e);

            var randomScalingFactor = function() {
                return Math.round(Math.random() * 100);
            };
            var randomColorFactor = function() {
                return Math.round(Math.random() * 255);
            };
            var randomColor = function(opacity) {
                return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
            };


                        var config = {
                          type: 'pie',
                          data: {
                            datasets: [{
                              data: [strong,good,acceptable,duplicate,weak
                              ],
                              backgroundColor: [
                                "#2ecc71",
                                "#3498db",
                                "#95a5a6",
                                "#9b59b6",
                                "#f1c40f"
                              ],
                              label: 'Password'
                            }],
                            labels: [
                        "Strong", "Good", "Acceptable", "Duplicate", "Weak"
                            ]
                          },
                          options: {
                            responsive: true,
                            legend: {
                              position: 'bottom',
                            },
                            title: {
                              display: false,
                              text: 'Chart.js Doughnut Chart'
                            },
                            animation: {
                              animateScale: true,
                              animateRotate: true
                            },
                            tooltips: {
                              callbacks: {
                                label: function(tooltipItem, data) {
                                          
                                  var dataset = data.datasets[tooltipItem.datasetIndex];

                                  var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                                    return previousValue + currentValue;
                                  });
                                  var currentValue = dataset.data[tooltipItem.index];
                                  var precentage = Math.floor(((currentValue/total) * 100)+0.5);    
                                  // console.log(total + "total");
                                  // console.log(currentValue + "currentValue");
                                  // console.log(precentage + "pecentage");     
                                  return precentage + "%";
                                }
                              }
                            }
                          }
                        };

                        var ctx = document.getElementById("myChart").getContext("2d");
                        window.myDoughnut = new Chart(ctx, config); {
                        }

        }

    });


})();