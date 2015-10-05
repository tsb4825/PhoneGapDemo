// JavaScript source code
var beaconService = {
    beaconRegions:
    [
        {
            id: "1",
            uuid: "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
            major: 10621,
            minor: 53047
        }
    ],
    facebookToken: "",
    hasSentRequest: false,
    startScanForBeacons: function (token) {
        try {
            this.facebookToken = token;
            EstimoteBeacons.requestAlwaysAuthorization();

            EstimoteBeacons.startEstimoteBeaconsDiscoveryForRegion(beaconRegions,
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

            apiService.processRequest(facebookToken);
            this.hasSentRequest = true;
        }
    }
};