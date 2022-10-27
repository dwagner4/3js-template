import { appmachine } from './appmachine.js';

// eslint-disable-next-line no-undef
const { createMachine, interpret, assign } = XState;

// const secondMachine = {
//   id: 'secondMachine',
//   initial: 'a',
//   states: {
//     a: {},
//     b: {},
//   }
// }

// const appmachine = {
//   context: {},
//   id: 'appMachine',
//   initial: 'home',
//   states: {
//     home: {
//       entry: ['selecthome'],
//       on: {
//         HOME: { target: 'home' },
//         TERM: { target: 'term' },
//       },
//     },
//     term: {
//       entry: ['selectterm'],
//       on: {
//         HOME: { target: 'home' },
//         TERM: { target: 'term' },
//       },
//     },
//   },
// };

const logonmachine = {
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

const logonfunctions = {
  actions: {
    selecthome: assign({
      homebtn: 'none',
      termbtn: 'block',
      caption: 'This is the Home Scene',
    }),
    selectterm: assign({
      homebtn: 'block',
      termbtn: 'none',
      caption: 'Terminal Scene',
    }),
  },
};

const mainMachine = createMachine(logonmachine, logonfunctions);

const mainService = interpret(mainMachine);
mainService.onTransition(state => console.log(state));
mainService.start();

export { mainMachine, mainService };
