var apiService = {
    processRequest: function (token) {
        log("Posting to api service, token = " + token);
        //$.ajax({
        //    url: "https://servicesdev.targetbase.com/api/query/AGI/ProcessRequest",
        //    beforeSend: function (xhrObj) {
        //        // Request headers
        //        xhrObj.setRequestHeader("Content-Type", "application/json");
        //    },
        //    type: "POST",
        //    // Request body
        //    data: "{\"token\": " + token + "}"
        //}).done(function (data) {
        //        log("Success calling api process request");
        //    })
        //.fail(function() {
        //        log("Failure calling api process request");
        //    });
    }
};