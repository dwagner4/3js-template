import { appfunctions } from './appmachine.js';

// eslint-disable-next-line no-undef
const { createMachine, interpret } = XState;

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

/** add appmachine child fsm to the authenticated state of login */
const loginmachine = {
  context: {},
  id: 'mainMachine',
  initial: 'unauthenticated',
  states: {
    unauthenticated: {
      on: {
        LOGIN: {
          target: 'loading',
        },
      },
    },
    loading: {
      on: {
        CANCEL: {
          target: 'unauthenticated',
        },
        ERROR: {
          target: 'error',
        },
        SUCCESS: {
          target: 'authenticated',
        },
      },
    },
    error: {
      on: {
        LOGIN: {
          target: 'loading',
        },
        CANCEL: {
          target: 'unauthenticated',
        },
      },
    },
    authenticated: {
      on: {
        EDITPROFILE: {
          target: 'editprofile',
        },
        LOGOUT: {
          target: 'unauthenticated',
        },
      },
      ...appmachine,
    },
    editprofile: {
      on: {
        ERROR: {
          target: 'editprofile',
          internal: false,
        },
        SUCCESS: {
          target: 'authenticated',
        },
      },
    },
  },
};

// eslint-disable-next-line prefer-const
let mainfunctions = appfunctions;

const mainMachine = createMachine(loginmachine, mainfunctions);

const mainService = interpret(mainMachine);
mainService.onTransition(state => console.log(state.value));
mainService.start();

export { mainMachine, mainService };
