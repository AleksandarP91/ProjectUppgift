/// <reference path="../angular.js" />
/// <reference path="../jquery-1.9.1.js" />
/// <reference path="../jquery.signalR-2.0.0.js" />
angular.module("mainModule")
    .controller("MainController", [
        "$scope",
        "$location",
        "$route",
        "$filter",
        "chatApi",
        function ($scope, $location, $route, $filter, chatApi) {
            $scope.$route = $route;
            $scope.models = {
                messages: [],
                channels: [],
                favoriteChannels:[]
            };
            $scope.chSelect = {
                selectedChannel: [],
            };
            $scope.msg = {
                author: 'Alex',
                channelId: 0
            };

            chatApi.getMessages()
                .then(function (messages) {
                    $scope.models.messages = messages;
                })
            chatApi.getChannels()
                .then(function (channels) {
                    $scope.models.channels = channels;
                })
            $scope.getChannelMessages = function (id) {
                chatApi.getChannelById(id)
                .then(function (selectedChannel) {
                    $scope.chSelect.selectedChannel = selectedChannel.messages;
                    $scope.msg.channelId = selectedChannel.id;

                })

            }

            function poll() {
                $.get("http://dummyapi.kodalagom.se/api/channels/"+$scope.msg.channelId, function (selectedChannel) {
                    $scope.chSelect.selectedChannel.push = selectedChannel.messages;
                    $("#messages").html('');
                    selectedChannel.messages.forEach(function (message) {
                        message.timeSent = new Date(message.timeSent).toLocaleString('en-us', {year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric'}).
  replace(/(\d+)\/(\d+)\/(\d+)\/(\d+)\/(\d+)/, '$4-$3-$5-$2:$1');
                        newRowContent = ("<tr><td style='font-weight:bold'>" + message.author + ":" + "</td><td class='col-md-10 col-md-offset-1'>" + message.body + "</td><td class='col-md-2 col-md-offset-7'>" + message.timeSent + " </td></tr>");
                        $("#messages").append(newRowContent);

                    })
                    var msgScroll = document.getElementById("msgScroll");
                    msgScroll.scrollTop = msgScroll.scrollHeight;

                    console.log(selectedChannel.messages);
                });
            }

            setInterval(function () { poll(); }, 5000);

            $scope.go = function (url) {
                $location.path(url);
            };
        }
    ]);