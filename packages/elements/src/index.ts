import { registerSwitch } from './components/switch/a11y-switch.js';
import { registerButton } from './components/button/a11y-button.js';
import { registerAccordion } from './components/accordion/a11y-accordion.js';
import { registerModal } from './components/modal/a11y-modal.js';
import { registerInput } from './components/form/a11y-input.js';
import { registerTextarea } from './components/form/a11y-textarea.js';
import { registerSelect } from './components/form/a11y-select.js';
import { registerCheckbox } from './components/form/a11y-checkbox.js';
import { registerRadio } from './components/form/a11y-radio.js';
import { registerFieldset } from './components/form/a11y-fieldset.js';

export * from './components/switch/a11y-switch.js';
export * from './components/button/a11y-button.js';
export * from './components/accordion/a11y-accordion.js';
export * from './components/modal/a11y-modal.js';
export * from './components/form/a11y-input.js';
export * from './components/form/a11y-textarea.js';
export * from './components/form/a11y-select.js';
export * from './components/form/a11y-checkbox.js';
export * from './components/form/a11y-radio.js';
export * from './components/form/a11y-fieldset.js';

/**
 * Register all A11YPros Custom Elements
 */
export function registerAllElements(): void {
  registerSwitch();
  registerButton();
  registerAccordion();
  registerModal();
  registerInput();
  registerTextarea();
  registerSelect();
  registerCheckbox();
  registerRadio();
  registerFieldset();
}
