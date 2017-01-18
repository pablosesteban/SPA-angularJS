(function() {
  "use strict";

  /*
  Why did we split it up into common module?
    There will be things that are going to be needed only for the public portion of our website, but also going to be needed for the admin portion of our website as well

    So it sounds like we're going to need something that's going to contain them so both modules, our future administrator module and the public module, will reuse

    What we need is a separate module that both of our modules public and the future administrative module can depend on and then share

    Usually it is called "common"
  */
  angular.module("common", []);
})();
