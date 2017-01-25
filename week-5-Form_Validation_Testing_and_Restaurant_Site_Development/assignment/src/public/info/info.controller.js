(function() {
  "use strict";

  angular.module("public")
  .controller("InfoController", InfoController);

  InfoController.$inject = ["MenuService"];
  function InfoController(MenuService) {
    var infoCtrl = this;

    infoCtrl.logged = false;

    if (MenuService.user) {
      infoCtrl.favDish = MenuService.user.favDish;
      infoCtrl.firstName = MenuService.user.firstName;
      infoCtrl.lastName = MenuService.user.lastName;
      infoCtrl.email = MenuService.user.email;
      infoCtrl.phone = MenuService.user.phone;

      if (infoCtrl.favDish) {
        infoCtrl.logged = true;
      }
    }
  }
})();
