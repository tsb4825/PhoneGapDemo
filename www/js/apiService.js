var apiService = {
    processRequest: function (token) {
        $.ajax({
            url: "https://targetbaseapi-dev-central.azurewebsites.net/api/query/AGI/processrequest",
            beforeSend: function (xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "80bdfdc041f441cb8916b9cc8d394baa");
            },
            type: "POST",
            // Request body
            data: { customerId: " + token + " }
        }).done(function (data) {
            log("Success calling api process request");
            $("#modalTitle").text("Welcome Tim!");
            $("#modalBody").text("Your Mercedes white C300 with black leather is at this store!");
            $("#btnNotifications").show();
        })
        .fail(function () {
            log("Failure calling api process request");
        });
    }
};