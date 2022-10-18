/* eslint-disable new-cap */
// eslint-disable-next-line import/no-unresolved
// import { gsap } from 'gsap';

/** import the Finite State Machine */
import { mainService } from './mainMachine.js';
import TermScene2 from './scenes/TermScene2.js';

const stage = new TermScene2('scene-container');
stage.init();
stage.start();


/**
 * connect to backend
 *
 * For Firebase
 * import { getMyConfig } from '../config.js';
 *   Import the functions you need from the SDKs you need
 *   eslint-disable-next-line import/order
 * import { initializeApp } from 'firebase/app';
 *   TODO: Add SDKs for Firebase products that you want to use
 *   https://firebase.google.com/docs/web/setup#available-libraries
 * const firebaseConfig = getMyConfig();
 *   Initialize Firebase
 *   eslint-disable-next-line no-unused-vars
 * const app = initializeApp(firebaseConfig);
 */

/**
 * identify html elements and attach listeners
 *
 * const homebtn = document.querySelector('#homebtn')
 * homebtn.onclick = () => {mainService.send({type: 'HOME'})}
 * ...
 * homebtn.onmouseover = homeover
 * homebtn.onmouseout = msgout
 */
const homebtn = document.querySelector('#homebtn');

const termbtn = document.querySelector('#termbtn');

homebtn.onclick = () => {
  mainService.send({ type: 'HOME' });
};
termbtn.onclick = () => {
  mainService.send({ type: 'TERM' });
};
/**
 * subscribe to ui state
 * change html element state
 *
 */
mainService.subscribe(state => {
  homebtn.style.display = state.context.homebtn;
  termbtn.style.display = state.context.termbtn;
});

