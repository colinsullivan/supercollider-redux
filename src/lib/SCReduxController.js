import SCStoreController from './SCStoreController';
import SCLangController from './SCLangController';

class SCReduxController {
  constructor(store, props) {
    this.sclangController = new SCLangController(store, props);
    this.scStoreController = new SCStoreController(store, props);
  }
  boot () {
    return new Promise((res, rej) => {
      this.sclangController.boot().then(() => {
        this.scStoreController.init().then(res).catch(rej);
      }).catch(rej);
    });
  }
  getSCLang () {
    return this.sclangController.getSCLang();
  }
  quit () {
    return new Promise((res, rej) => {
      this.scStoreController.quit();
      this.sclangController.quit().then(res).catch(rej);
    })
  }
}

export default SCReduxController;
