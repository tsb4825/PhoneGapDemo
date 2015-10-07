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
            EstimoteBeacons.requestAlwaysAuthorization();
            EstimoteBeacons.requestWhenInUseAuthorization();

            EstimoteBeacons.stopMonitoringForRegion({},
                function (){},
                function (errorMessage) {
                    log('Stop Ranging error: ' + errorMessage);
            });

            //EstimoteBeacons.startMonitoringForRegion(self.beaconRegions,
            EstimoteBeacons.startRangingBeaconsInRegion(self.beaconRegions, 
                didRangeBeaconsInRegion,
                function (errorMessage) {
                    log('Start Ranging error: ' + errorMessage);
                },
                true);
        } catch (e) {
            log(e);
        }

        function didRangeBeaconsInRegion(state) {
            var self = this;
            // There must be a beacon within range.
            if (self.hasSentRequest) {
                return;
            }

            //window.plugins.localNotification.add({
            //    fireDate: Math.round(new Date().getTime() / 1000 + 5),
            //    alertBody: "Tim, we have your white C300 with black leather here!",
            //    action: "View",
            //    badge: 1,
            //    notificationId: 123,
            //    foreground: function (notificationId) {
            //        alert("Tim, we have your white C300 with black leather here!");
            //    }
            //});

            cordova.plugins.notification.local.schedule({
                id: 1,
                title: "Your car is here!",
                text: "Tim, we have your white C300 with black leather here!",
                firstAt: new Date().setSeconds(new Date().getSeconds() + 10),
                sound: "file://beep.caf",
                icon: "file://C300.jpg"
            });

            //apiService.processRequest(self.facebookToken, self.name);

            self.hasSentRequest = true;
        }
    }
};