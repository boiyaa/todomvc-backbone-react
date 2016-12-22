class Dispatcher {
  constructor() {
    this.stores = [];
  }

  register(store) {
    this.stores.push(store);
  }

  dispatch(action) {
    this.stores.forEach((store) => store.trigger(action.type, action));
  }
}

export const dispatcher = new Dispatcher();
