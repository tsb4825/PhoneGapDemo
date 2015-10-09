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

            setTimeout(function () {
                app.receivedEvent('deviceready');
                navigator.splashscreen.hide();
                //AzureEngagement.registerForPushNotification();
                //AzureEngagement.startActivity("loaded", {});

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
                $(document).FaceGap(config);

                //beaconService.startScanForBeacons("1234", "Me");

                //Callback Login
                function _onLogin(event) {
                    if (event.status === 1) {
                        $(".received").text("Logged In");

                        beaconService.startScanForBeacons(event.id, event.name);
                    } else {
                        log("Error authenticating with Facebook");
                    }
                }

                log("Scanning Started...");
                
            }, 2000);
        } catch (e) {
            log(e);
        }

        function centerModals($element) {
            var $modals;
            if ($element.length) {
                $modals = $element;
            } else {
                $modals = $('.modal-vcenter:visible');
            }
            $modals.each(function (i) {
                var $clone = $(this).clone().css('display', 'block').appendTo('body');
                var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
                top = top > 0 ? top : 0;
                $clone.remove();
                $(this).find('.modal-content').css("margin-top", top);
            });
        }
        $('.modal-vcenter').on('show.bs.modal', function (e) {
            centerModals($(this));
        });
        $(window).on('resize', centerModals);
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
    //$("#DebugLog").append(text + "<br>");
}