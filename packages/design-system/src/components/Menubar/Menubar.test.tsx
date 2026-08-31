import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, runAxeTest, act, fireEvent } from '../../test-utils';
import React from 'react';
import { Menubar } from './Menubar';
import { Menu, MenuItem, MenuDivider } from '../Menu/Menu';

describe('Menubar', () => {
  const renderBasicMenubar = (props = {}) => {
    return render(
      <Menubar label="Application menu" {...props}>
        <Menu id="file-menu" trigger={<button type="button">File</button>}>
          <MenuItem onClick={vi.fn()}>New File</MenuItem>
          <MenuItem onClick={vi.fn()}>Open...</MenuItem>
          <MenuDivider />
          <MenuItem danger onClick={vi.fn()}>
            Quit
          </MenuItem>
        </Menu>

        <Menu id="edit-menu" trigger={<button type="button">Edit</button>}>
          <MenuItem onClick={vi.fn()}>Undo</MenuItem>
          <MenuItem onClick={vi.fn()}>Redo</MenuItem>
          <MenuItem onClick={vi.fn()}>Cut</MenuItem>
        </Menu>

        <Menu id="view-menu" trigger={<button type="button">View</button>}>
          <MenuItem onClick={vi.fn()}>Zoom In</MenuItem>
          <MenuItem onClick={vi.fn()}>Zoom Out</MenuItem>
        </Menu>
      </Menubar>
    );
  };

  describe('rendering and roles', () => {
    it('renders with role="menubar" and horizontal orientation', () => {
      renderBasicMenubar();
      const menubar = screen.getByRole('menubar', { name: 'Application menu' });
      expect(menubar).toBeInTheDocument();
      expect(menubar).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('renders triggers with role="menuitem" and roving tabIndex', () => {
      renderBasicMenubar();
      const triggers = screen.getAllByRole('menuitem');
      expect(triggers).toHaveLength(3); // File, Edit, View

      // First item has tabIndex 0, subsequent items have -1
      expect(triggers[0]).toHaveAttribute('tabindex', '0');
      expect(triggers[1]).toHaveAttribute('tabindex', '-1');
      expect(triggers[2]).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('keyboard navigation across menubar triggers', () => {
    it('navigates triggers with ArrowRight and wraps around', () => {
      renderBasicMenubar();
      const triggers = screen.getAllByRole('menuitem');

      triggers[0].focus();
      expect(document.activeElement).toBe(triggers[0]); // File

      // ArrowRight to Edit
      act(() => {
        fireEvent.keyDown(triggers[0], { key: 'ArrowRight' });
      });
      expect(document.activeElement).toBe(triggers[1]); // Edit

      // ArrowRight to View
      act(() => {
        fireEvent.keyDown(triggers[1], { key: 'ArrowRight' });
      });
      expect(document.activeElement).toBe(triggers[2]); // View

      // ArrowRight wraps to File
      act(() => {
        fireEvent.keyDown(triggers[2], { key: 'ArrowRight' });
      });
      expect(document.activeElement).toBe(triggers[0]); // File
    });

    it('navigates triggers with ArrowLeft and wraps to last', () => {
      renderBasicMenubar();
      const triggers = screen.getAllByRole('menuitem');

      triggers[0].focus();
      expect(document.activeElement).toBe(triggers[0]); // File

      // ArrowLeft wraps to View (index 2)
      act(() => {
        fireEvent.keyDown(triggers[0], { key: 'ArrowLeft' });
      });
      expect(document.activeElement).toBe(triggers[2]); // View
    });

    it('jumps with Home and End keys', () => {
      renderBasicMenubar();
      const triggers = screen.getAllByRole('menuitem');

      triggers[0].focus();
      act(() => {
        fireEvent.keyDown(triggers[0], { key: 'End' });
      });
      expect(document.activeElement).toBe(triggers[2]); // View

      act(() => {
        fireEvent.keyDown(triggers[2], { key: 'Home' });
      });
      expect(document.activeElement).toBe(triggers[0]); // File
    });
  });

  describe('dropdown opening and inter-menu navigation', () => {
    it('opens menu and focuses first item on ArrowDown on trigger', () => {
      renderBasicMenubar();
      const fileTrigger = screen.getByRole('menuitem', { name: 'File' });

      act(() => {
        fireEvent.keyDown(fileTrigger, { key: 'ArrowDown' });
      });

      expect(screen.getByRole('menu')).toBeInTheDocument();
      const menuItems = screen.getAllByRole('menuitem');
      // The items now include the menubar triggers (3) + opened menu items (3)
      const openItems = menuItems.filter((el) => el.closest('[role="menu"]'));
      expect(openItems).toHaveLength(3);
      expect(document.activeElement).toBe(openItems[0]); // New File
    });

    it('switches to next menu and focuses its first item on ArrowRight inside open dropdown', () => {
      renderBasicMenubar();
      const fileTrigger = screen.getByRole('menuitem', { name: 'File' });

      act(() => {
        fireEvent.keyDown(fileTrigger, { key: 'ArrowDown' });
      });

      let menuItems = screen.getAllByRole('menuitem');
      let openItems = menuItems.filter((el) => el.closest('[role="menu"]'));
      expect(openItems[0]).toHaveTextContent('New File');
      expect(document.activeElement).toBe(openItems[0]);

      // Press ArrowRight inside the open File menu item
      act(() => {
        fireEvent.keyDown(openItems[0], { key: 'ArrowRight' });
      });

      // Now Edit menu should be open, and its first item (Undo) should be focused!
      menuItems = screen.getAllByRole('menuitem');
      openItems = menuItems.filter((el) => el.closest('[role="menu"]'));
      expect(openItems[0]).toHaveTextContent('Undo');
      expect(document.activeElement).toBe(openItems[0]);
    });

    it('switches to previous menu and focuses its first item on ArrowLeft inside open dropdown', () => {
      renderBasicMenubar();
      const fileTrigger = screen.getByRole('menuitem', { name: 'File' });

      act(() => {
        fireEvent.keyDown(fileTrigger, { key: 'ArrowDown' });
      });

      let menuItems = screen.getAllByRole('menuitem');
      let openItems = menuItems.filter((el) => el.closest('[role="menu"]'));
      expect(document.activeElement).toBe(openItems[0]); // New File

      // Press ArrowLeft inside the open File menu item -> wraps to View menu!
      act(() => {
        fireEvent.keyDown(openItems[0], { key: 'ArrowLeft' });
      });

      menuItems = screen.getAllByRole('menuitem');
      openItems = menuItems.filter((el) => el.closest('[role="menu"]'));
      expect(openItems[0]).toHaveTextContent('Zoom In');
      expect(document.activeElement).toBe(openItems[0]);
    });

    it('switches menu on mouse hover when another menu is already open', () => {
      renderBasicMenubar();
      const fileTrigger = screen.getByRole('menuitem', { name: 'File' });
      const editTrigger = screen.getByRole('menuitem', { name: 'Edit' });

      // Click File to open
      act(() => {
        fireEvent.click(fileTrigger);
      });
      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(screen.getByText('New File')).toBeInTheDocument();

      // Hover over Edit trigger -> should switch to Edit menu!
      act(() => {
        fireEvent.mouseEnter(editTrigger);
      });
      expect(screen.queryByText('New File')).not.toBeInTheDocument();
      expect(screen.getByText('Undo')).toBeInTheDocument();
    });

    it('closes menu and restores focus to trigger on Escape key', () => {
      renderBasicMenubar();
      const fileTrigger = screen.getByRole('menuitem', { name: 'File' });

      act(() => {
        fireEvent.keyDown(fileTrigger, { key: 'ArrowDown' });
      });

      const menuItems = screen.getAllByRole('menuitem');
      const openItems = menuItems.filter((el) => el.closest('[role="menu"]'));
      expect(document.activeElement).toBe(openItems[0]);

      act(() => {
        fireEvent.keyDown(openItems[0], { key: 'Escape' });
      });

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      expect(document.activeElement).toBe(fileTrigger);
    });
  });

  describe('accessibility', () => {
    it('has no axe violations when closed', async () => {
      const { container } = renderBasicMenubar();
      await runAxeTest(container);
    });

    it('has no axe violations when a menu is open', async () => {
      const { container } = renderBasicMenubar({ openMenuId: 'file-menu' });
      await runAxeTest(container);
    });

    it('has no axe violations in dark mode', async () => {
      const { container } = render(
        <div data-theme="dark">
          <Menubar label="Dark Application Menu">
            <Menu id="file-menu" trigger={<button type="button">File</button>}>
              <MenuItem onClick={vi.fn()}>New File</MenuItem>
              <MenuItem onClick={vi.fn()}>Open...</MenuItem>
            </Menu>
          </Menubar>
        </div>
      );
      await runAxeTest(container);
    });
  });
});
