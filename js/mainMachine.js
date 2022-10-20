// eslint-disable-next-line no-undef
const { createMachine, interpret, assign } = XState;

const mainMachine = createMachine(
  {
    context: {},
    id: 'mainMachine',
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
  },
  {
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
  }
);

const mainService = interpret(mainMachine);
mainService.onTransition(state => console.log(state));
mainService.start();

export { mainMachine, mainService };
