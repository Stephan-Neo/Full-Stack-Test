import { action, makeObservable, observable } from 'mobx';

class AppStore {
  @observable
  isDark: boolean = true;

  @observable
  isLoaded: boolean = false;

  @action
  setTheme = (isDark: boolean) => {
    this.isDark = isDark;
  };

  @action
  setLoaded = (isLoaded: boolean) => {
    this.isLoaded = isLoaded;
  };

  constructor() {
    makeObservable(this);
  }
}

const appStore = new AppStore();
export default appStore;
