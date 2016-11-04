/// <reference path="../angular.js" />
/// <reference path="../angular-route.js" />

angular.module("mainModule")
    .config([
        "$routeProvider",
        "$locationProvider",
        function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider

                .when("/", {
                    templateUrl: "Views/Channel.html",
                    controller: "ChannelController",
                    caseInsensitiveMatch: true,
                    activeTab: "Channel"
                })

            .when("/Admin", {
                templateUrl: "Views/Admin.html",
                controller: "AdminController",
                caseInsensitiveMatch: true,
                activeTab: "Admin"
            })
            .when("/Channels/New", {
                templateUrl: "Views/Channels/NewChannel.html",
                controller: "AdminController",
                caseInsensitiveMatch: true,
                activeTab: "Admin"
            });

        }
    ]);