/// <reference path="../angular.js" />
/// <reference path="../jquery-1.9.1.js" />
/// <reference path="../jquery.signalR-2.0.0.js" />
angular.module("mainModule")
    .controller("ChannelController", [
        "$scope",
        "chatApi",
        function ($scope, chatApi) {
            $scope.title = "Channel";
            $scope.sort = {
                string: "title",
                descending: false
            };
            
            $scope.message = {};
            $scope.newMessage = {};
            
            
            

            $scope.setSorting = function (string) {
                if ($scope.sort.string == string)
                    $scope.sort.descending = !$scope.sort.descending;
                else {
                    $scope.sort.string = string;
                    $scope.sort.descending = false;
                }

            }

            

            $scope.sendMessage = function () {
                chatApi.sendMessage($scope.newMessage)
                    .then(function (message) {
                        $scope.models.messages.push(message);
                    })
            }


            
        }]);