angular.module("mainModule")
    .controller("AdminController", [
        "$scope",
        "$routeParams",
        "chatApi",
        function ($scope, $routeParams, chatApi) {
            $scope.channel = {};
            $scope.newChannel = {};
           
            $scope.$watch("models.channels", function (channels) {
                $scope.channel = channels.filter(function (channel) {
                    return channel.id == $routeParams.id;
                })[0];
            });

            $scope.addChannel = function () {
                chatApi.addChannel($scope.newChannel)
                    .then(function (channel) {
                        $scope.models.channels.push(channel);
                        $scope.go("/Admin");
                    });
            }
                $scope.deleteChannel = function (id) {
                    chatApi.deleteChannel(id)
                        .then(function () {
                            var index = $scope.models.channels.map(function (channel) {
                                return channel.id;
                            }).indexOf(id);

                            $scope.models.channels.splice(index, 1);
                        });
                }
                $scope.addFavorite = function (id) {
                    chatApi.getChannelById(id)
                    .then(function (selectedChannel) {
                        $scope.models.favoriteChannels.push(selectedChannel);
                        
                    });

                }


        }
    ]);