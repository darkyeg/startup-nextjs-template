import { UserStore } from './UserStore';

interface RootStore {
  user: UserStore;
}

const RootStore = {} as RootStore;

RootStore.user = new UserStore(RootStore);

export default RootStore;
