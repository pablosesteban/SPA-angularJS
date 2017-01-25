(function() {
  "use strict";

  /*
  Why did we split it up into public module?
    Well, the reason we did that is because we're projecting that we're going to have an administrative portion of this website as well

    We really need to have two separate kind of sub-websites or sub things that are really going to be pretty different

    Therefore, it makes sense to have a:
      public module: that would be responsible for the public face of the website that everybody will see

      admin module: that will be responsible for the internal administrator panel, i.e. that the owner of the restaurant will be able to login with username and password into and update the menu
  */
  angular.module("public", ["ui.router", "common"]);
})();
