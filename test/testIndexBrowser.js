import { expect } from "chai";

import SCRedux from "../src/index_browser";

describe("index_browser", function () {
  it('should export expected values', function () {
    expect(SCRedux).to.be.an("object").and.include.all.keys(
      "actionTypes",
      "actions",
      "reducer",
      "DEFAULT_MOUNT_POINT",
      "READY_STATES"
    ).but.not.include.any.keys(
      "SCStoreController",
      "SCLangController",
      "OSCActionListener",
      "SCReduxController"
    );
  });
});
