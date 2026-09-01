'use client';

import Link from 'next/link';
import { Menu, MenuItem, MenuDivider, MenuGroup, Button } from '@a11ypros/a11y-ui-components';
import { DocExample } from '../../_components/DocExample';
import { ApiReference } from '../../_components/ApiReference';
import { menuApi } from '../api-reference-data';

export default function MenuPage() {
  return (
    <article className="doc-page">
      <nav aria-label="Breadcrumb" className="docs-breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/components">Components</Link>
          </li>
          <li>
            <span aria-current="page">Menu</span>
          </li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Menu</h1>
        <p>
          Accessible dropdown action menus following the WAI-ARIA Menu Button pattern, featuring
          roving focus keyboard navigation, shortcut keys, danger states, and focus return.
        </p>
      </header>

      <DocExample
        id="menu-basic-example"
        title="Basic Action Menu"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Menu/Menu.tsx"
        snippets={[
          {
            label: 'React',
            language: 'tsx',
            code: `<Menu trigger={<Button variant="secondary">Actions ▾</Button>}>
  <MenuItem onClick={() => alert('Edit')}>Edit</MenuItem>
  <MenuItem onClick={() => alert('Duplicate')}>Duplicate</MenuItem>
  <MenuItem disabled>Archive (Disabled)</MenuItem>
  <MenuDivider />
  <MenuItem danger onClick={() => alert('Delete')}>
    Delete
  </MenuItem>
</Menu>`,
            preview: (
              <div style={{ padding: '2rem 1rem 8rem 1rem' }}>
                <Menu trigger={<Button variant="secondary">Actions ▾</Button>}>
                  <MenuItem onClick={() => alert('Edit selected')}>Edit</MenuItem>
                  <MenuItem onClick={() => alert('Duplicate selected')}>Duplicate</MenuItem>
                  <MenuItem disabled>Archive (Disabled)</MenuItem>
                  <MenuDivider />
                  <MenuItem danger onClick={() => alert('Delete selected')}>
                    Delete
                  </MenuItem>
                </Menu>
              </div>
            ),
          },
          {
            label: 'Web Component (HTML)',
            language: 'html',
            code: `// Import once in your app or component
import '@a11ypros/a11y-ui-elements/menu';

<a11y-menu label="Actions ▾">
  <a11y-menu-item>Edit</a11y-menu-item>
  <a11y-menu-item>Duplicate</a11y-menu-item>
  <a11y-menu-item disabled>Archive (Disabled)</a11y-menu-item>
  <a11y-menu-divider></a11y-menu-divider>
  <a11y-menu-item danger>Delete</a11y-menu-item>
</a11y-menu>`,
            preview: (
              <div style={{ padding: '2rem 1rem 8rem 1rem' }}>
                <a11y-menu label="Actions ▾">
                  <a11y-menu-item>Edit</a11y-menu-item>
                  <a11y-menu-item>Duplicate</a11y-menu-item>
                  <a11y-menu-item disabled>Archive (Disabled)</a11y-menu-item>
                  <a11y-menu-divider></a11y-menu-divider>
                  <a11y-menu-item danger>Delete</a11y-menu-item>
                </a11y-menu>
              </div>
            ),
          },
        ]}
      />

      <DocExample
        id="menu-icons-example"
        title="With Icons & Shortcuts"
        code={`<Menu trigger={<Button variant="primary">Manage Project ▾</Button>}>
  <MenuItem
    icon={<EditIcon />}
    shortcut="⌘E"
    onClick={() => console.log('Edit')}
  >
    Edit
  </MenuItem>
  <MenuItem
    icon={<CopyIcon />}
    shortcut="⌘D"
    onClick={() => console.log('Duplicate')}
  >
    Duplicate
  </MenuItem>
  <MenuDivider />
  <MenuItem
    danger
    icon={<TrashIcon />}
    shortcut="⌘⌫"
    onClick={() => console.log('Delete')}
  >
    Delete
  </MenuItem>
</Menu>`}
      >
        <div style={{ padding: '2rem 1rem 8rem 1rem' }}>
          <Menu trigger={<Button variant="primary">Manage Project ▾</Button>}>
            <MenuItem
              icon={
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              }
              shortcut="⌘E"
              onClick={() => alert('Edit')}
            >
              Edit Project
            </MenuItem>
            <MenuItem
              icon={
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                  <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                </svg>
              }
              shortcut="⌘D"
              onClick={() => alert('Duplicate')}
            >
              Duplicate
            </MenuItem>
            <MenuDivider />
            <MenuItem
              danger
              icon={
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              shortcut="⌘⌫"
              onClick={() => alert('Delete')}
            >
              Delete Project
            </MenuItem>
          </Menu>
        </div>
      </DocExample>

      <DocExample
        id="menu-groups-example"
        title="Grouped Menu Sections"
        code={`<Menu trigger={<Button variant="secondary">Account Options ▾</Button>}>
  <MenuGroup label="Navigation">
    <MenuItem href="/profile">View Profile</MenuItem>
    <MenuItem href="/settings">Settings</MenuItem>
  </MenuGroup>
  <MenuDivider />
  <MenuGroup label="Session">
    <MenuItem danger onClick={() => alert('Signed out')}>
      Sign Out
    </MenuItem>
  </MenuGroup>
</Menu>`}
      >
        <div style={{ padding: '2rem 1rem 12rem 1rem' }}>
          <Menu trigger={<Button variant="secondary">Account Options ▾</Button>}>
            <MenuGroup label="Navigation">
              <MenuItem href="#profile">View Profile</MenuItem>
              <MenuItem href="#settings">Settings</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup label="Session">
              <MenuItem danger onClick={() => alert('Signed out')}>
                Sign Out
              </MenuItem>
            </MenuGroup>
          </Menu>
        </div>
      </DocExample>

      <ApiReference sections={menuApi} />

      <section aria-labelledby="menu-keyboard-title" className="doc-section">
        <h2 id="menu-keyboard-title">Keyboard Navigation (WAI-ARIA Menu Button)</h2>
        <table className="api-table">
          <thead>
            <tr>
              <th scope="col">Key</th>
              <th scope="col">Focus Target</th>
              <th scope="col">Behavior</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <kbd>Enter</kbd> / <kbd>Space</kbd> / <kbd>↓</kbd>
              </td>
              <td>Trigger Button</td>
              <td>Opens menu and moves focus to the first non-disabled item.</td>
            </tr>
            <tr>
              <td>
                <kbd>↑</kbd>
              </td>
              <td>Trigger Button</td>
              <td>Opens menu and moves focus to the last non-disabled item.</td>
            </tr>
            <tr>
              <td>
                <kbd>↓</kbd>
              </td>
              <td>Menu Item</td>
              <td>Moves focus to the next item, skipping disabled items and wrapping around.</td>
            </tr>
            <tr>
              <td>
                <kbd>↑</kbd>
              </td>
              <td>Menu Item</td>
              <td>
                Moves focus to the previous item, skipping disabled items and wrapping around.
              </td>
            </tr>
            <tr>
              <td>
                <kbd>Home</kbd>
              </td>
              <td>Menu Item</td>
              <td>Jumps focus to the first non-disabled item.</td>
            </tr>
            <tr>
              <td>
                <kbd>End</kbd>
              </td>
              <td>Menu Item</td>
              <td>Jumps focus to the last non-disabled item.</td>
            </tr>
            <tr>
              <td>
                <kbd>Escape</kbd>
              </td>
              <td>Menu Item</td>
              <td>Closes menu and immediately returns focus to the trigger button.</td>
            </tr>
            <tr>
              <td>
                <kbd>Tab</kbd>
              </td>
              <td>Menu Item</td>
              <td>Closes menu and allows normal tab order progression.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section aria-labelledby="menu-a11y-title" className="doc-section">
        <h2 id="menu-a11y-title">Accessibility Highlights</h2>
        <ul>
          <li>
            <strong>Trigger Semantics</strong>: Configured with <code>aria-haspopup="menu"</code>{' '}
            and <code>aria-expanded</code>.
          </li>
          <li>
            <strong>Roving Tabindex</strong>: Only the active item receives focus during arrow key
            navigation; pressing <kbd>Tab</kbd> doesn't trap keyboard focus inside the menu.
          </li>
          <li>
            <strong>Focus Return (WCAG 2.4.3)</strong>: Dismissing via <kbd>Escape</kbd> or
            activating an action item returns focus directly to the trigger button.
          </li>
          <li>
            <strong>Semantic Groups & Dividers</strong>: Uses <code>role="group"</code> with
            accessible section headers and <code>role="separator"</code> for dividing lines.
          </li>
          <li>
            <strong>Zero 3rd-Party Dependencies</strong>: Native React and CSS implementation with
            zero external runtime footprint.
          </li>
        </ul>
      </section>

      <section aria-labelledby="menu-playground-title" className="doc-section">
        <h2 id="menu-playground-title">Playground</h2>
        <a
          className="playground-link"
          href="/storybook-static/index.html?path=/docs/components-menu--docs"
        >
          Open Menu stories in Storybook
        </a>
      </section>
    </article>
  );
}
