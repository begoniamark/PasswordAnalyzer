<?php 
    include_once('includes/connection.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Password Analyzer</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/font-awesome.min.css" rel="stylesheet">
    
    <script src="js/chart.js"></script>

</head>

<body>
<div class="container">
    <div class="row">
        <div ng-app="app-password" ng-controller="passwordController">
            <div class="row" style="padding-top: 50px;">
                <div class="panel panel-primary">
                <div class="panel-heading">Password Analyzer</div>
                <div class="panel-body">
                    <div class="col-lg-5">
                        <form novalidate name="passwordForm">
                            <div class="form-group">
                                <label for="password">Enter Password: </label>
                                <input type="text" class="form-control" name="password" id="password" ng-trim="false" ng-disabled="isDisabled" ng-model="password" required ng-maxlength=30>
                                <span ng-show="passwordForm.password.$error.required" class="text-warning">Password is required.</span>
                                <span ng-show="passwordForm.password.$error.maxlength" class="text-warning">Maximum Length is 30 characters.</span>
                            </div>
                            <input type="submit" class="btn btn-primary" id="Save" value="Save" ng-click="savePassword()" ng-disabled="passwordForm.$invalid"/>
                            <input type="submit" ng-if="reset" class="btn btn-primary" value="Reset" ng-click="resetPassword()" />
                        </form>
                    </div>
                    <div class="col-lg-5" style="padding-top: 30px">
                      <span ng-show="loading" >
                            <i class="fa fa-circle-o-notch fa-spin" style="font-size:24px;"></i>
                        </span>  
                        <div class="text-info pull-right" ng-if="password">
                            <span ng-if="string">This password is: </span> {{strength}} 
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <div class="row" ng-if="chart" style="padding-top: 50px;">
                <div class="panel panel-primary">
                <div class="panel-heading">Password Analysis</div>
                <div class="panel-body">

                <div class="col-lg-5">       
                     <h5>Out of the {{totalPassword}} passwords people gave so far are:  </h5>  
                </div>
                <div class="col-lg-7">
                     <canvas id="myChart"></canvas>
                </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</div>

</body>

<!-- jQuery -->
<script src="js/jquery.js"></script>

<!-- Bootstrap Core JavaScript -->
<script src="js/bootstrap.min.js"></script>
<script src="js/angular.min.js"></script>
<script src=js/passwordController.js></script>

</html>    
