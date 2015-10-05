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

        function didRangeBeaconsInRegion(beaconInfo) {
            // There must be a beacon within range.
            if (0 == beaconInfo.beacons.length || this.hasSentRequest) {
                return;
            }

            window.plugin.notification.local.add({ message: 'Tim, we have your dream car here!', date:  new Date(new Date().getTime() + 10 * 1000) }),
            //apiService.processRequest(this.facebookToken, this.name);
            this.hasSentRequest = true;
        }
    }
};