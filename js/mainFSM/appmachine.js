const appmachine = {
  context: {},
  id: 'appMachine',
  initial: 'home',
  states: {
    home: {
      entry: ['selecthome'],
      on: {
        HOME: { target: 'home' },
        TERM: { target: 'term' },
      },
    },
    term: {
      entry: ['selectterm'],
      on: {
        HOME: { target: 'home' },
        TERM: { target: 'term' },
      },
    },
  },
};

export { appmachine };
