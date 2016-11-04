angular.module("mainModule")
    .service("chatApi", [
        "$http",
        "$q",
        function ($http, $q) {
            var api = "http://dummyapi.kodalagom.se/api";
            //var api = "http://localhost:64000/api";
            var messages = api + "/messages";
            var channels = api + "/channels";

            this.getMessages = function () {
                var deferred = $q.defer();

                $http.get(messages)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (response) {
                        deferred.resolve([]);
                    });

                return deferred.promise;
            };
            this.getChannels = function () {
                var deferred = $q.defer();

                $http.get(channels)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (response) {
                        deferred.resolve([]);
                    });

                return deferred.promise;
            };

            this.getChannelById = function (id) {
                var deferred = $q.defer();

                $http.get(channels + "/" + id)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (response) {
                        deferred.resolve([]);
                    });

                return deferred.promise;
            };

            this.sendMessage = function (newMessage) {
                var deferred = $q.defer();

                $http.post(messages, newMessage)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (response) {
                        deferred.resolve([]);
                    });

                return deferred.promise;
            };

            this.addChannel = function (newChannel) {
                var deferred = $q.defer();

                $http.post(channels, newChannel)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (response) {
                        deferred.resolve([]);
                    });

                return deferred.promise;
            };


            this.deleteMessage = function (id) {
                var deferred = $q.defer();

                $http.delete(messages + "/" + id)
                    .then(function (response) {
                        deferred.resolve();
                    }, function (response) {
                        deferred.resolve();
                    });

                return deferred.promise;
            };

            this.deleteChannel = function (id) {
                var deferred = $q.defer();

                $http.delete(channels + "/" + id)
                    .then(function (response) {
                        deferred.resolve();
                    }, function (response) {
                        deferred.resolve();
                    });

                return deferred.promise;
            };
        }
    ]);