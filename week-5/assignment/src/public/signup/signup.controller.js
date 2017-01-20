(function() {
  "use strict";

  angular.module("public")
  .controller("SignUpController", SignUpController);

  // SignUpController.$inject = ["menuCategories"];
  SignUpController.$inject = ["MenuService"];
  function SignUpController(MenuService) {
    var signupCtrl = this;

    // signupCtrl.menuCategoriesShortNames = [];
    //
    // menuCategories.forEach(function(menuCategory, index, array) {
    //   signupCtrl.menuCategoriesShortNames.push(menuCategory.short_name);
    // });

    signupCtrl.submit = function() {
      var favMenuItems;

      //devulve todo si no se le especifica un menu!
      MenuService.getCategoryItems(signupCtrl.user.favMenu).then(function(response) {
        favMenuItems = response.menu_items;

        //devulve todo si no se le especifica un menu!
        if (favMenuItems.length > 0) {
          signupCtrl.user.favMenuSuccess = true;

          signupCtrl.user.favMenuError = false;

          MenuService.user.firstName = signupCtrl.user.firstName;
          MenuService.user.lastName = signupCtrl.user.lastName;
          MenuService.user.email = signupCtrl.user.email;
          MenuService.user.phone = signupCtrl.user.phone;
          MenuService.user.favMenuItems = favMenuItems;
        }else {
          signupCtrl.user.favMenuError = true;

          signupCtrl.user.favMenuSuccess = false;

          MenuService.user = null;
        }
      });
    }
  }
})();
