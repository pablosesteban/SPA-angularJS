describe("SignUpController", function() {
  var $httpBackend;
  var apiHost;
  var menuService;
  var signUpController;
  var $controller;

  beforeEach(function() {
    angular.mock.module("public");

    angular.mock.inject(function($injector, _$controller_) {
      $httpBackend = $injector.get("$httpBackend");
      apiHost = $injector.get("ApiHost");
      menuService = $injector.get("MenuService");
      $controller = _$controller_;

      signUpController = $controller("SignUpController", {MenuService: menuService});
    });
  });

  it("checkDish should make favDishError to be true", function() {
    signUpController.user = {
      favDish: "A"
    };

    $httpBackend.whenGET(apiHost + "/menu_items/A.json").respond({"status":"500","error":"Internal Server Error"});

    signUpController.checkDish();

    $httpBackend.flush();

    expect(signUpController.user.favDishError).toEqual(true);
  });

  it("checkDish should make favDishError to be false", function() {
    signUpController.user = {
      favDish: "A1"
    };

    $httpBackend.whenGET(apiHost + "/menu_items/A1.json").respond({"id":2,"short_name":"A2","name":"Egg Drop Soup"});

    signUpController.checkDish();

    $httpBackend.flush();

    expect(signUpController.user.favDishError).toEqual(false);
  });
})
