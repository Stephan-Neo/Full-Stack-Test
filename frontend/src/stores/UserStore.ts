import { action, makeObservable, observable } from 'mobx';
import { User } from "../types/user";

class UserStore {
  @observable
  accessToken: string = '';

  @observable
  userId: string = '';

  @observable
  profile: User | undefined;

  @action
  setAccessToken = (isAccessToken: string) => {
    this.accessToken = isAccessToken;
  };

  @action
  setUserId = (userId: string) => {
    this.userId = userId;
  };

  @action
  setProfile = (isProfile: User) => {
    this.profile = isProfile;
  };

  constructor() {
    makeObservable(this);
  }
}

const userStore = new UserStore();
export default userStore;
