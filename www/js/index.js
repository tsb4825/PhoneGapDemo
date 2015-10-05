/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        try {
            //navigator.splashscreen.hide();

            setTimeout(function () {
                app.receivedEvent('deviceready');

                //https://github.com/studiosoton/faceGap
                //Config Plugin
                var config = {
                    app_id: '1033825303315504',
                    secret: 'aab41ee7d789b326c56f0a6d16596a4c',
                    scope: 'public_profile,email',
                    host: 'https://dedemo.targetbase.com', //App Domain ( Facebook Developer ).
                    onLogin: _onLogin
                };

                //Login Facebook
                //$(document).FaceGap(config);
                //beaconService.startScanForBeacons();

                //Callback Login
                function _onLogin(event) {
                    if (event.status === 1) {
                        $(".received").text("Logged In");

                        //beaconService.startScanForBeacons();

                    } else {
                        log("Error authenticating with Facebook");
                    }
                }

                log("Scanning Started...");
                EstimoteBeacons.requestAlwaysAuthorization();

                EstimoteBeacons.startEstimoteBeaconsDiscoveryForRegion({
                    id: "1",
                    uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
                    major: 10621,
                    minor: 53047
                },
                            function (beaconInfo) {
                                log(('Number of beacons discovered ' + beaconInfo.beacons.length));
                            }, function (errorMessage) {
                                log('Ranging error: ' + errorMessage);
                            });
            }, 2000);
        } catch (e) {
            log(e);
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function log(text) {
    $("#DebugLog").append(text + "<br>");
}