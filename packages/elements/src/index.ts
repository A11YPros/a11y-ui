import { registerSwitch } from './components/switch/a11y-switch.js';
import { registerButton } from './components/button/a11y-button.js';

export * from './components/switch/a11y-switch.js';
export * from './components/button/a11y-button.js';

/**
 * Register all A11YPros Custom Elements
 */
export function registerAllElements(): void {
  registerSwitch();
  registerButton();
}
