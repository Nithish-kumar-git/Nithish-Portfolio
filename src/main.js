import './style.css'
import { initNav } from './js/nav.js'
import { initAnimations } from './js/animations.js'
import { initCounters } from './js/counter.js'
import { initHeroSequence } from './js/hero.js'
import { initFwmsDiagram } from './js/fwms-diagram.js'

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initAnimations();
  initCounters();
  initHeroSequence();
  initFwmsDiagram();
});
