const defaultState = {
  appName: 'Conduit',
  appLoaded: false,
  token: null,
  viewChangeCounter: 0
};

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
