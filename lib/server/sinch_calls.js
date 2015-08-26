Sinch.Calls = {
    manageCall: function(callId, svaml) {
        //manage ongoing calls with SVAML actions and instructions
        var data;

        var options = {
            method: "PATCH",
            host: "callingapi.sinch.com",
            port: 443,
            path: "/v1/call/id/" + callId,
            data: JSON.stringify(svaml)
        };

        return Sinch.callRestAPI(options);
    },

    callOut: function(type) {
        //initiate new call from server
        //currently there are two types of new calls that can be made from server
        //1) text-to-speach callouts or 2) conference callouts

        if (!type || type !== "tts" || type !== "conference" ) throw new Meteor.Error(500, "Callout type must be either tts or conference");
        else {
            var data;

            if (type === "tts") {
                //TESTDATA

                data = {
                    "method" : "ttsCallout",
                    "ttsCallout" :
                    {
                        "cli" : "46000000000",
                        "destination" : { "type" : "number", "endpoint" : "46000000001" },
                        "domain" : "pstn",
                        "custom" : "customData",
                        "locale" : "en-US",
                        "text" : "Hello, this is a synthesized message."
                    }
                }
            }

            else if (type === "conference") {
                //TESTDATA
                data = {
                    "method" : "conferenceCallout",
                    "conferenceCallout" :
                    {
                        "cli" : "46000000000",
                        "destination" : { "type" : "number", "endpoint" : "46000000001" },
                        "domain" : "pstn",
                        "custom" : "customData",
                        "locale" : "en-US",
                        "greeting" : "Welcome to my conference",
                        "conferenceId" : "my_conference_room_id",
                        "enableDice" : false
                    }
                }
            }

            var options = {
                method: "POST",
                host: "callingapi.sinch.com",
                port: 443,
                path: "/v1/callouts",
                data: JSON.stringify(data)
            };

            return Sinch.callRestAPI(options);
        }
    },

    getCallData: function(callId) {
        //Gets information about a specific call.
        var options = {
            method: "GET",
            host: "callingapi.sinch.com",
            port: 443,
            path: "/v1/calls/id/" + callId
        };

        return Sinch.callRestAPI(options);
    }
};