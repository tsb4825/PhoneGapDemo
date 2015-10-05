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
            this.facebookToken = token;
            this.name = name;
            EstimoteBeacons.requestAlwaysAuthorization();

            EstimoteBeacons.startMonitoringForRegion(this.beaconRegions,
                didRangeBeaconsInRegion,
                function (errorMessage) {
                    log('Ranging error: ' + errorMessage);
                });
        } catch (e) {
            log(e);
        }

        function didRangeBeaconsInRegion(state) {
            // There must be a beacon within range.
            if (this.hasSentRequest) {
                return;
            }

            cordova.plugins.notification.local.schedule({
                id: 1,
                title: "Welcome!",
                text: "Tim, we have your dream car on location!",
                firstAt: new Date(new Date().getTime() + 10 * 1000)
            });
            //apiService.processRequest(this.facebookToken, this.name);
            this.hasSentRequest = true;
        }
    }
};