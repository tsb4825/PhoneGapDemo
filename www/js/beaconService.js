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
    wasAuthorizationCalled: false,
    startScanForBeacons: function (token, name) {
        try {
            var self = this;
            self.facebookToken = token;
            self.name = name;

            EstimoteBeacons.stopMonitoringForRegion({},
                function () { },
                function (errorMessage) {
                    log('Stop Ranging error: ' + errorMessage);
                });

            //EstimoteBeacons.requestAlwaysAuthorization(requestInUseAuthorization, log);
            EstimoteBeacons.requestAlwaysAuthorization();
            EstimoteBeacons.requestAlwaysAuthorization();

            //if (!self.wasAuthorizationCalled) {
                startScanningForBeacons();
            //}
        } catch (e) {
            log(e);
        }

        function requestInUseAuthorization() {
            self.wasAuthorizationCalled = true;
            EstimoteBeacons.requestAlwaysAuthorization(startScanningForBeacons,log);
        }

        function startScanningForBeacons() {
            //EstimoteBeacons.startSecureMonitoringForRegion(self.beaconRegions,
            //EstimoteBeacons.startMonitoringForRegion(self.beaconRegions,
            //EstimoteBeacons.startRangingBeaconsInRegion(self.beaconRegions,
            EstimoteBeacons.startRangingBeaconsInRegion(self.beaconRegions,
                didRangeBeaconsInRegion, function (errorMessage) { log('Start Ranging error: ' + errorMessage); }, true);
            log("Start Scanning");
        }

        function didRangeBeaconsInRegion(state) {
            var self = this;
            // There must be a beacon within range.
            if (self.hasSentRequest) {
                return;
            }

            cordova.plugins.notification.local.schedule({
                id: 1,
                title: "Your car is here!",
                text: "Tim, we have your white C300 with black leather here!",
                firstAt: new Date().setSeconds(new Date().getSeconds() + 10),
                sound: "file://beep.caf",
                icon: "file://C300.jpg"
            });

            log("Notification sent");

            //apiService.processRequest(self.facebookToken, self.name);

            self.hasSentRequest = true;
        }
    }
};