'use client';

import Link from 'next/link';
import { Menubar, Menu, MenuItem, MenuDivider, MenuGroup } from '@a11ypros/a11y-ui-components';
import { DocExample } from '../../_components/DocExample';
import { ApiReference } from '../../_components/ApiReference';
import { menubarApi } from '../api-reference-data';

export default function MenubarPage() {
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
            <span aria-current="page">Menubar</span>
          </li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Menubar</h1>
        <p>
          Desktop-style application menu bars following the WAI-ARIA Menubar pattern, consuming
          composed Menu components with roving tabindex, inter-menu arrow key transitions, and hover
          switching.
        </p>
      </header>

      <DocExample
        id="menubar-basic-example"
        title="Application Menu Bar"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Menubar/Menubar.tsx"
        snippets={[
          {
            label: 'React',
            language: 'tsx',
            code: `<Menubar label="Application menu">
  <Menu trigger={<button type="button">File</button>}>
    <MenuItem shortcut="⌘N" onClick={() => alert('New File')}>New File</MenuItem>
    <MenuItem shortcut="⌘O" onClick={() => alert('Open')}>Open...</MenuItem>
    <MenuItem shortcut="⌘S" onClick={() => alert('Save')}>Save</MenuItem>
    <MenuDivider />
    <MenuItem danger shortcut="⌘Q" onClick={() => alert('Quit')}>Quit</MenuItem>
  </Menu>

  <Menu trigger={<button type="button">Edit</button>}>
    <MenuItem shortcut="⌘Z" onClick={() => alert('Undo')}>Undo</MenuItem>
    <MenuItem shortcut="⇧⌘Z" onClick={() => alert('Redo')}>Redo</MenuItem>
    <MenuDivider />
    <MenuItem shortcut="⌘X">Cut</MenuItem>
    <MenuItem shortcut="⌘C">Copy</MenuItem>
    <MenuItem shortcut="⌘V">Paste</MenuItem>
  </Menu>
</Menubar>`,
            preview: (
              <div style={{ padding: '2rem 1rem 14rem 1rem' }}>
                <Menubar label="Application menu">
                  <Menu trigger={<button type="button">File</button>}>
                    <MenuItem shortcut="⌘N" onClick={() => alert('New File')}>
                      New File
                    </MenuItem>
                    <MenuItem shortcut="⌘O" onClick={() => alert('Open')}>
                      Open...
                    </MenuItem>
                    <MenuItem shortcut="⌘S" onClick={() => alert('Save')}>
                      Save
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem danger shortcut="⌘Q" onClick={() => alert('Quit')}>
                      Quit Application
                    </MenuItem>
                  </Menu>

                  <Menu trigger={<button type="button">Edit</button>}>
                    <MenuItem shortcut="⌘Z" onClick={() => alert('Undo')}>
                      Undo
                    </MenuItem>
                    <MenuItem shortcut="⇧⌘Z" onClick={() => alert('Redo')}>
                      Redo
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem shortcut="⌘X">Cut</MenuItem>
                    <MenuItem shortcut="⌘C">Copy</MenuItem>
                    <MenuItem shortcut="⌘V">Paste</MenuItem>
                  </Menu>

                  <Menu trigger={<button type="button">View</button>}>
                    <MenuItem shortcut="⌘+">Zoom In</MenuItem>
                    <MenuItem shortcut="⌘-">Zoom Out</MenuItem>
                    <MenuDivider />
                    <MenuItem shortcut="⌃⌘F">Full Screen</MenuItem>
                  </Menu>

                  <Menu trigger={<button type="button">Help</button>}>
                    <MenuItem href="/getting-started">Documentation</MenuItem>
                    <MenuItem onClick={() => alert('About A11y UI')}>About</MenuItem>
                  </Menu>
                </Menubar>
              </div>
            ),
          },
          {
            label: 'Web Component (HTML)',
            language: 'html',
            code: `// Import once in your app or component
import '@a11ypros/a11y-ui-elements/menubar';
import '@a11ypros/a11y-ui-elements/menu';

<a11y-menubar label="Application menu">
  <a11y-menu label="File">
    <a11y-menu-item shortcut="⌘N">New File</a11y-menu-item>
    <a11y-menu-item shortcut="⌘O">Open...</a11y-menu-item>
    <a11y-menu-item shortcut="⌘S">Save</a11y-menu-item>
    <a11y-menu-divider></a11y-menu-divider>
    <a11y-menu-item danger shortcut="⌘Q">Quit</a11y-menu-item>
  </a11y-menu>

  <a11y-menu label="Edit">
    <a11y-menu-item shortcut="⌘Z">Undo</a11y-menu-item>
    <a11y-menu-item shortcut="⇧⌘Z">Redo</a11y-menu-item>
    <a11y-menu-divider></a11y-menu-divider>
    <a11y-menu-item shortcut="⌘X">Cut</a11y-menu-item>
    <a11y-menu-item shortcut="⌘C">Copy</a11y-menu-item>
    <a11y-menu-item shortcut="⌘V">Paste</a11y-menu-item>
  </a11y-menu>
</a11y-menubar>`,
            preview: (
              <div style={{ padding: '2rem 1rem 14rem 1rem' }}>
                <a11y-menubar label="Application menu">
                  <a11y-menu label="File">
                    <a11y-menu-item shortcut="⌘N">New File</a11y-menu-item>
                    <a11y-menu-item shortcut="⌘O">Open...</a11y-menu-item>
                    <a11y-menu-item shortcut="⌘S">Save</a11y-menu-item>
                    <a11y-menu-divider></a11y-menu-divider>
                    <a11y-menu-item danger shortcut="⌘Q">
                      Quit
                    </a11y-menu-item>
                  </a11y-menu>

                  <a11y-menu label="Edit">
                    <a11y-menu-item shortcut="⌘Z">Undo</a11y-menu-item>
                    <a11y-menu-item shortcut="⇧⌘Z">Redo</a11y-menu-item>
                    <a11y-menu-divider></a11y-menu-divider>
                    <a11y-menu-item shortcut="⌘X">Cut</a11y-menu-item>
                    <a11y-menu-item shortcut="⌘C">Copy</a11y-menu-item>
                    <a11y-menu-item shortcut="⌘V">Paste</a11y-menu-item>
                  </a11y-menu>
                </a11y-menubar>
              </div>
            ),
          },
        ]}
      />

      <DocExample
        id="menubar-icons-example"
        title="With Icons & Section Groups"
        code={`<Menubar label="Workspace tools">
  <Menu trigger={<button type="button">Project</button>}>
    <MenuItem
      icon={<FolderIcon />}
      shortcut="⌘P"
      onClick={() => alert('Open Project')}
    >
      Open Project...
    </MenuItem>
    <MenuItem
      icon={<ExportIcon />}
      shortcut="⌘E"
      onClick={() => alert('Export')}
    >
      Export Archive
    </MenuItem>
  </Menu>

  <Menu trigger={<button type="button">Preferences</button>}>
    <MenuGroup label="Editor">
      <MenuItem>Color Theme</MenuItem>
      <MenuItem>Font Family</MenuItem>
    </MenuGroup>
    <MenuDivider />
    <MenuGroup label="System">
      <MenuItem>Keybindings</MenuItem>
    </MenuGroup>
  </Menu>
</Menubar>`}
      >
        <div style={{ padding: '2rem 1rem 14rem 1rem' }}>
          <Menubar label="Workspace tools">
            <Menu trigger={<button type="button">Project</button>}>
              <MenuItem
                icon={
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                }
                shortcut="⌘P"
                onClick={() => alert('Open Project')}
              >
                Open Project...
              </MenuItem>
              <MenuItem
                icon={
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                shortcut="⌘E"
                onClick={() => alert('Export')}
              >
                Export Archive
              </MenuItem>
            </Menu>

            <Menu trigger={<button type="button">Preferences</button>}>
              <MenuGroup label="Editor">
                <MenuItem>Color Theme</MenuItem>
                <MenuItem>Font Family</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup label="System">
                <MenuItem>Keybindings</MenuItem>
              </MenuGroup>
            </Menu>
          </Menubar>
        </div>
      </DocExample>

      <ApiReference sections={menubarApi} />

      <section aria-labelledby="menubar-keyboard-title" className="doc-section">
        <h2 id="menubar-keyboard-title">Keyboard Navigation (WAI-ARIA Menubar)</h2>
        <table className="api-table">
          <thead>
            <tr>
              <th scope="col">Key</th>
              <th scope="col">Target</th>
              <th scope="col">Behavior</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <kbd>→</kbd>
              </td>
              <td>Menubar Trigger</td>
              <td>Moves focus to the next menubar trigger (wraps around).</td>
            </tr>
            <tr>
              <td>
                <kbd>←</kbd>
              </td>
              <td>Menubar Trigger</td>
              <td>Moves focus to the previous menubar trigger (wraps around).</td>
            </tr>
            <tr>
              <td>
                <kbd>Home</kbd> / <kbd>End</kbd>
              </td>
              <td>Menubar Trigger</td>
              <td>Jumps focus to the first or last menubar trigger.</td>
            </tr>
            <tr>
              <td>
                <kbd>↓</kbd> / <kbd>Enter</kbd> / <kbd>Space</kbd>
              </td>
              <td>Menubar Trigger</td>
              <td>Opens the menu and moves focus to the first item.</td>
            </tr>
            <tr>
              <td>
                <kbd>↑</kbd>
              </td>
              <td>Menubar Trigger</td>
              <td>Opens the menu and moves focus to the last item.</td>
            </tr>
            <tr>
              <td>
                <kbd>→</kbd>
              </td>
              <td>Inside Open Menu</td>
              <td>
                Closes the current menu, opens the next menu in the menubar, and focuses its first
                item.
              </td>
            </tr>
            <tr>
              <td>
                <kbd>←</kbd>
              </td>
              <td>Inside Open Menu</td>
              <td>
                Closes the current menu, opens the previous menu in the menubar, and focuses its
                first item.
              </td>
            </tr>
            <tr>
              <td>
                <kbd>Escape</kbd>
              </td>
              <td>Inside Open Menu</td>
              <td>Closes the menu and returns focus to the menubar trigger button.</td>
            </tr>
            <tr>
              <td>
                <kbd>Tab</kbd>
              </td>
              <td>Menubar / Menu</td>
              <td>
                Closes open menus and advances focus out of the menubar to the next page element.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section aria-labelledby="menubar-a11y-title" className="doc-section">
        <h2 id="menubar-a11y-title">Accessibility Highlights</h2>
        <ul>
          <li>
            <strong>Composite Widget Semantics</strong>: Container uses <code>role="menubar"</code>{' '}
            with <code>aria-orientation="horizontal"</code>, while top-level triggers use{' '}
            <code>role="menuitem"</code> with <code>aria-haspopup="menu"</code>.
          </li>
          <li>
            <strong>Single Tab Stop</strong>: The entire menubar acts as one tab stop with roving{' '}
            <code>tabIndex</code> (0 on active item, -1 on others).
          </li>
          <li>
            <strong>Desktop Application Experience</strong>: Seamless inter-menu arrow key
            navigation and mouse hover transfer when any menu is open.
          </li>
          <li>
            <strong>Focus Return (WCAG 2.4.3)</strong>: Closing any menu via <kbd>Escape</kbd>{' '}
            returns focus directly to the menubar trigger.
          </li>
          <li>
            <strong>Zero 3rd-Party Dependencies</strong>: Built purely with React context, native
            DOM event handling, and CSS.
          </li>
        </ul>
      </section>

      <section aria-labelledby="menubar-playground-title" className="doc-section">
        <h2 id="menubar-playground-title">Playground</h2>
        <a
          className="playground-link"
          href="/storybook-static/index.html?path=/docs/components-menubar--docs"
        >
          Open Menubar stories in Storybook
        </a>
      </section>
    </article>
  );
}
