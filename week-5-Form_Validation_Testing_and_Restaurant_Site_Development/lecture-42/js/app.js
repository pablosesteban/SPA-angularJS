(function() {
    "use strict";

    angular.module("SimpleFormApp", [])

    .controller("RegistrationController", RegistrationController);

    function RegistrationController() {
        this.submit = function () {
            this.completed = true;
        };
    }
})();
