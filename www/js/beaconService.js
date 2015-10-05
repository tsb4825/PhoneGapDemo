// JavaScript source code
var beaconService = {
    beaconRegions:
    [
        {
            id: "1",
            uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
            major: 10621,
            minor: 53047
        }
    ],
    startScanForBeacons: function () {
        try {
            EstimoteBeacons.requestAlwaysAuthorization();

            EstimoteBeacons.startEstimoteBeaconsDiscoveryForRegion({
                    id: "1",
                    uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
                    major: 10621,
                    minor: 53047
                },
                didRangeBeaconsInRegion,
                function (errorMessage) {
                    log('Ranging error: ' + errorMessage);
                });
        } catch (e) {
            log(e);
        }

        function didRangeBeaconsInRegion(beaconInfo) {
            // There must be a beacon within range.
            if (0 == beaconInfo.beacons.length) {
                return;
            }

            // Our regions are defined so that there is one beacon per region.
            // Get the first (and only) beacon in range in the region.
            var beacon = beaconInfo.beacons[0];

            //console.log('ranged beacon: ' + pageId + ' ' + beacon.proximity)

            // If the beacon is close and represents a new page, then show the page.
            if ((beacon.proximity == 'ProximityImmediate' || beacon.proximity == 'ProximityNear')) {
                log("Close to beacon!");
                return;
            }

            // If the beacon represents the current page but is far away,
            // then show the default page.
            if ((beacon.proximity == 'ProximityFar' || beacon.proximity == 'ProximityUnknown')) {
                log("Far away from beacon!");
                return;
            }
        }
    }
};