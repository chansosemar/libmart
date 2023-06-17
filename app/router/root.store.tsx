import React, {createContext, useContext, useState} from 'react';
import {configure} from 'mobx';

import {MainStore} from '@modules/Main/Main.store';

configure({
  enforceActions: 'never',
});

export class RootStore {
  mainStore = new MainStore();

  constructor() {
    this.mainStore = new MainStore();
  }
}
export const RootsStoreContext = createContext(new RootStore());

export const useStores = () => useContext(RootsStoreContext);

export const StoreProvider = ({children}: {children: any}) => {
  const [store] = useState(() => new RootStore());
  return (
    <RootsStoreContext.Provider value={store}>
      {children}
    </RootsStoreContext.Provider>
  );
};
