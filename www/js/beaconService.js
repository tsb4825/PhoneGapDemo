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
    startScanForBeacons: function() {
        try {
            window.locationManager = cordova.plugins.locationManager;

            // The delegate object contains iBeacon callback functions.
            var delegate = new cordova.plugins.locationManager.Delegate();

            delegate.didDetermineStateForRegion = function (pluginResult) {
                //console.log('didDetermineStateForRegion: ' + JSON.stringify(pluginResult))
            }

            delegate.didStartMonitoringForRegion = function (pluginResult) {
                //console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult))
            }

            delegate.didRangeBeaconsInRegion = function (pluginResult) {
                //console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult))
                this.didRangeBeaconsInRegion(pluginResult);
            }

            // Set the delegate object to use.
            locationManager.setDelegate(delegate);

            // Start monitoring and ranging our beacons.
            for (var r in this.beaconRegions) {
                var region = this.beaconRegions[r];

                var beaconRegion = new locationManager.BeaconRegion(
                    region.id, region.uuid, region.major, region.minor);

                // Start monitoring.
                locationManager.startMonitoringForRegion(beaconRegion)
                    .fail(console.error)
                    .done();

                // Start ranging.
                locationManager.startRangingBeaconsInRegion(beaconRegion)
                    .fail(console.error)
                    .done();
            }
        } catch (e) {
            logError(e);
        }
    },
    didRangeBeaconsInRegion: function(pluginResult) {
        // There must be a beacon within range.
        if (0 == pluginResult.beacons.length) {
            return;
        }

        // Our regions are defined so that there is one beacon per region.
        // Get the first (and only) beacon in range in the region.
        var beacon = pluginResult.beacons[0];

        //console.log('ranged beacon: ' + pageId + ' ' + beacon.proximity)

        // If the beacon is close and represents a new page, then show the page.
        if ((beacon.proximity == 'ProximityImmediate' || beacon.proximity == 'ProximityNear')) {
            logError("Close to beacon!");
            return;
        }

        // If the beacon represents the current page but is far away,
        // then show the default page.
        if ((beacon.proximity == 'ProximityFar' || beacon.proximity == 'ProximityUnknown')) {
            logError("Far away from beacon!");
            return;
        }
    }
};