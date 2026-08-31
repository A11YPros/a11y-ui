import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, runAxeTest, act, fireEvent } from '../../test-utils';
import React from 'react';
import { Menu, MenuItem, MenuDivider, MenuGroup } from './Menu';

describe('Menu', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  const renderBasicMenu = (props = {}) => {
    return render(
      <Menu trigger={<button type="button">Actions</button>} {...props}>
        <MenuItem onClick={vi.fn()}>Edit</MenuItem>
        <MenuItem onClick={vi.fn()}>Duplicate</MenuItem>
        <MenuItem disabled onClick={vi.fn()}>
          Archive (Disabled)
        </MenuItem>
        <MenuDivider />
        <MenuItem danger onClick={vi.fn()}>
          Delete
        </MenuItem>
      </Menu>
    );
  };

  describe('rendering', () => {
    it('renders trigger button and menu is closed by default', () => {
      renderBasicMenu();
      const trigger = screen.getByRole('button', { name: 'Actions' });
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('renders menu open when isOpen=true', () => {
      renderBasicMenu({ isOpen: true });
      expect(screen.getByRole('menu')).toBeInTheDocument();
      const items = screen.getAllByRole('menuitem');
      expect(items).toHaveLength(4);
      expect(items[0]).toHaveTextContent('Edit');
      expect(items[1]).toHaveTextContent('Duplicate');
      expect(items[2]).toHaveTextContent('Archive (Disabled)');
      expect(items[3]).toHaveTextContent('Delete');
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('renders link menu item when href is provided', () => {
      render(
        <Menu trigger={<button type="button">Menu</button>} isOpen={true}>
          <MenuItem href="/profile">Profile Link</MenuItem>
        </Menu>
      );
      const link = screen.getByRole('menuitem');
      expect(link.tagName.toLowerCase()).toBe('a');
      expect(link).toHaveAttribute('href', '/profile');
    });

    it('renders menu groups with accessible labels', () => {
      render(
        <Menu trigger={<button type="button">Menu</button>} isOpen={true}>
          <MenuGroup label="Preferences">
            <MenuItem>Account</MenuItem>
          </MenuGroup>
        </Menu>
      );
      const group = screen.getByRole('group');
      expect(group).toBeInTheDocument();
      expect(screen.getByText('Preferences')).toBeInTheDocument();
    });
  });

  describe('interactions and keyboard navigation', () => {
    it('opens on trigger click and closes on second click', () => {
      renderBasicMenu();
      const trigger = screen.getByRole('button', { name: 'Actions' });

      act(() => {
        fireEvent.click(trigger);
        vi.runAllTimers();
      });
      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(trigger).toHaveAttribute('aria-expanded', 'true');

      act(() => {
        fireEvent.click(trigger);
        vi.runAllTimers();
      });
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('opens and focuses first item on ArrowDown on trigger', () => {
      renderBasicMenu();
      const trigger = screen.getByRole('button', { name: 'Actions' });

      act(() => {
        fireEvent.keyDown(trigger, { key: 'ArrowDown' });
        vi.runAllTimers();
      });

      expect(screen.getByRole('menu')).toBeInTheDocument();
      const items = screen.getAllByRole('menuitem');
      expect(document.activeElement).toBe(items[0]);
    });

    it('opens and focuses last item on ArrowUp on trigger', () => {
      renderBasicMenu();
      const trigger = screen.getByRole('button', { name: 'Actions' });

      act(() => {
        fireEvent.keyDown(trigger, { key: 'ArrowUp' });
        vi.runAllTimers();
      });

      expect(screen.getByRole('menu')).toBeInTheDocument();
      const items = screen.getAllByRole('menuitem');
      // Last item is Delete (since Archive is disabled)
      expect(document.activeElement).toBe(items[3]);
    });

    it('navigates with ArrowDown, skips disabled item, and wraps to top', () => {
      renderBasicMenu();
      const trigger = screen.getByRole('button', { name: 'Actions' });

      act(() => {
        fireEvent.keyDown(trigger, { key: 'ArrowDown' });
        vi.runAllTimers();
      });

      const items = screen.getAllByRole('menuitem');
      expect(document.activeElement).toBe(items[0]); // Edit

      // ArrowDown to Duplicate
      act(() => {
        fireEvent.keyDown(items[0], { key: 'ArrowDown' });
      });
      expect(document.activeElement).toBe(items[1]); // Duplicate

      // ArrowDown should SKIP Archive (disabled) and land on Delete
      act(() => {
        fireEvent.keyDown(items[1], { key: 'ArrowDown' });
      });
      expect(document.activeElement).toBe(items[3]); // Delete

      // ArrowDown on Delete wraps around to Edit (index 0)
      act(() => {
        fireEvent.keyDown(items[3], { key: 'ArrowDown' });
      });
      expect(document.activeElement).toBe(items[0]); // Edit
    });

    it('navigates with ArrowUp and wraps to bottom', () => {
      renderBasicMenu();
      const trigger = screen.getByRole('button', { name: 'Actions' });

      act(() => {
        fireEvent.keyDown(trigger, { key: 'ArrowDown' });
        vi.runAllTimers();
      });

      const items = screen.getAllByRole('menuitem');
      expect(document.activeElement).toBe(items[0]); // Edit

      // ArrowUp on first item wraps to last item (Delete)
      act(() => {
        fireEvent.keyDown(items[0], { key: 'ArrowUp' });
      });
      expect(document.activeElement).toBe(items[3]); // Delete
    });

    it('jumps with Home and End keys', () => {
      renderBasicMenu();
      const trigger = screen.getByRole('button', { name: 'Actions' });

      act(() => {
        fireEvent.keyDown(trigger, { key: 'ArrowDown' });
        vi.runAllTimers();
      });

      const items = screen.getAllByRole('menuitem');

      // Press End
      act(() => {
        fireEvent.keyDown(items[0], { key: 'End' });
      });
      expect(document.activeElement).toBe(items[3]); // Delete

      // Press Home
      act(() => {
        fireEvent.keyDown(items[3], { key: 'Home' });
      });
      expect(document.activeElement).toBe(items[0]); // Edit
    });

    it('activates item and closes menu on click', () => {
      const handleEdit = vi.fn();
      render(
        <Menu trigger={<button type="button">Actions</button>} defaultOpen={true}>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
        </Menu>
      );

      const item = screen.getByRole('menuitem');
      act(() => {
        fireEvent.click(item);
      });

      expect(handleEdit).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('activates item on Enter key', () => {
      const handleEdit = vi.fn();
      render(
        <Menu trigger={<button type="button">Actions</button>} defaultOpen={true}>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
        </Menu>
      );

      const item = screen.getByRole('menuitem');
      act(() => {
        fireEvent.keyDown(item, { key: 'Enter' });
      });

      expect(handleEdit).toHaveBeenCalledTimes(1);
    });

    it('closes menu and restores focus to trigger on Escape key (WAI-ARIA)', () => {
      renderBasicMenu();
      const trigger = screen.getByRole('button', { name: 'Actions' });

      act(() => {
        fireEvent.keyDown(trigger, { key: 'ArrowDown' });
      });

      const items = screen.getAllByRole('menuitem');
      expect(document.activeElement).toBe(items[0]);

      act(() => {
        fireEvent.keyDown(items[0], { key: 'Escape' });
      });

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      expect(document.activeElement).toBe(trigger);
    });

    it('closes menu on click outside', () => {
      renderBasicMenu({ defaultOpen: true });
      expect(screen.getByRole('menu')).toBeInTheDocument();

      act(() => {
        fireEvent.mouseDown(document.body);
      });

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations when closed', async () => {
      vi.useRealTimers();
      const { container } = renderBasicMenu();
      await runAxeTest(container);
    });

    it('has no axe violations when open', async () => {
      vi.useRealTimers();
      const { container } = renderBasicMenu({ isOpen: true });
      await runAxeTest(container);
    });
  });
});
