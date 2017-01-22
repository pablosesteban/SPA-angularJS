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
      var favDish;

      MenuService.getCategoryItem(signupCtrl.user.favDish).then(function(response) {
        favDish = response;

        if (!favDish.error) {
          signupCtrl.user.favDishSuccess = true;

          signupCtrl.user.favDishError = false;

          MenuService.user.firstName = signupCtrl.user.firstName;
          MenuService.user.lastName = signupCtrl.user.lastName;
          MenuService.user.email = signupCtrl.user.email;
          MenuService.user.phone = signupCtrl.user.phone;
          MenuService.user.favDish = favDish;
        }else {
          signupCtrl.user.favDishError = true;

          signupCtrl.user.favDishSuccess = false;
        }
      });
    }
  }
})();
