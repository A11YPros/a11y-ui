import { registerSwitch } from './components/switch/a11y-switch.js';
import { registerButton } from './components/button/a11y-button.js';
import { registerAccordion } from './components/accordion/a11y-accordion.js';
import { registerModal } from './components/modal/a11y-modal.js';

export * from './components/switch/a11y-switch.js';
export * from './components/button/a11y-button.js';
export * from './components/accordion/a11y-accordion.js';
export * from './components/modal/a11y-modal.js';

/**
 * Register all A11YPros Custom Elements
 */
export function registerAllElements(): void {
  registerSwitch();
  registerButton();
  registerAccordion();
  registerModal();
}
