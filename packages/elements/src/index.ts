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
import { registerLabel } from './components/form/a11y-label.js';

import { registerBanner } from './components/banner/a11y-banner.js';
import { registerLink } from './components/link/a11y-link.js';
import { registerTabs } from './components/tabs/a11y-tabs.js';
import { registerTooltip } from './components/tooltip/a11y-tooltip.js';

import { registerMenu } from './components/menu/a11y-menu.js';
import { registerMenubar } from './components/menubar/a11y-menubar.js';
import { registerDataTable } from './components/table/a11y-data-table.js';

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
export * from './components/form/a11y-label.js';
export * from './components/banner/a11y-banner.js';
export * from './components/link/a11y-link.js';
export * from './components/tabs/a11y-tabs.js';
export * from './components/tooltip/a11y-tooltip.js';
export * from './components/menu/a11y-menu.js';
export * from './components/menubar/a11y-menubar.js';
export * from './components/table/a11y-data-table.js';

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
  registerLabel();
  registerBanner();
  registerLink();
  registerTabs();
  registerTooltip();
  registerMenu();
  registerMenubar();
  registerDataTable();
}
