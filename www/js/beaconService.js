// JavaScript source code
var beaconService = {
    beaconRegions: {
        uuid: "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
        major: 10621,
        minor: 53047
    },
    facebookToken: "",
    hasSentRequest: false,
    name: "",
    startScanForBeacons: function (token, name) {
        try {
            var self = this;
            self.facebookToken = token;
            self.name = name;
            EstimoteBeacons.requestAlwaysAuthorization(
                requestAuthInUse,
                function () {
                    log("Error asking for always authorization");
                });

            function requestAuthInUse() {
                EstimoteBeacons.requestWhenInUseAuthorization(
                    stopMonitoring,
                    function () {
                        log("Error asking for when in use authorization");
                    });
            }

            function stopMonitoring() {
                EstimoteBeacons.stopMonitoringForRegion(self.beaconRegions,
                    startMonitoring,
                    function (errorMessage) {
                        log('Stop Ranging error: ' + errorMessage);
                });
            }

            function startMonitoring() {
                EstimoteBeacons.startMonitoringForRegion(self.beaconRegions,
                    didRangeBeaconsInRegion,
                    function (errorMessage) {
                        log('Start Ranging error: ' + errorMessage);
                    });
            }
        } catch (e) {
            log(e);
        }

        function didRangeBeaconsInRegion(state) {
            var self = this;
            // There must be a beacon within range.
            if (self.hasSentRequest) {
                return;
            }

            window.plugins.localNotification.add({
                fireDate: Math.round(new Date().getTime() / 1000 + 5),
                alertBody: "Tim, we have your dream car on location!",
                action: "View",
                badge: 1,
                notificationId: 123
            });

            //apiService.processRequest(self.facebookToken, self.name);

            self.hasSentRequest = true;
        }
    }
};