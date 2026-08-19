import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, runAxeTest } from '../../test-utils';
import { Tabs, TabItem } from './Tabs';

const mockTabs: TabItem[] = [
  { id: 'account', label: 'Account', content: <div>Account Settings</div> },
  { id: 'password', label: 'Password', content: <div>Password Settings</div> },
  { id: 'notifications', label: 'Notifications', content: <div>Notification Preferences</div> },
];

describe('Tabs', () => {
  it('renders tablist, tabs, and active tabpanel', () => {
    render(<Tabs items={mockTabs} aria-label="Settings" />);

    expect(screen.getByRole('tablist', { name: 'Settings' })).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getByRole('tabpanel', { name: 'Account' })).toBeInTheDocument();
    expect(screen.getByText('Account Settings')).toBeInTheDocument();
  });

  it('sets proper ARIA attributes on tabs and tabpanels', () => {
    render(<Tabs items={mockTabs} aria-label="Settings" />);

    const firstTab = screen.getByRole('tab', { name: 'Account' });
    const secondTab = screen.getByRole('tab', { name: 'Password' });
    const panel = screen.getByRole('tabpanel');

    expect(firstTab).toHaveAttribute('aria-selected', 'true');
    expect(firstTab).toHaveAttribute('aria-controls', 'tabpanel-account');
    expect(firstTab).toHaveAttribute('tabIndex', '0');

    expect(secondTab).toHaveAttribute('aria-selected', 'false');
    expect(secondTab).toHaveAttribute('aria-controls', 'tabpanel-password');
    expect(secondTab).toHaveAttribute('tabIndex', '-1');

    expect(panel).toHaveAttribute('id', 'tabpanel-account');
    expect(panel).toHaveAttribute('aria-labelledby', 'tab-account');
  });

  it('switches tabs on click', () => {
    render(<Tabs items={mockTabs} aria-label="Settings" />);

    const secondTab = screen.getByRole('tab', { name: 'Password' });
    fireEvent.click(secondTab);

    expect(secondTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Password Settings')).toBeInTheDocument();
    expect(screen.queryByText('Account Settings')).not.toBeInTheDocument();
  });

  it('supports controlled selectedId', () => {
    const handleSelectionChange = vi.fn();

    const { rerender } = render(
      <Tabs
        items={mockTabs}
        selectedId="password"
        onSelectionChange={handleSelectionChange}
        aria-label="Settings"
      />
    );

    expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Password Settings')).toBeInTheDocument();

    const thirdTab = screen.getByRole('tab', { name: 'Notifications' });
    fireEvent.click(thirdTab);
    expect(handleSelectionChange).toHaveBeenCalledWith('notifications');

    rerender(
      <Tabs
        items={mockTabs}
        selectedId="notifications"
        onSelectionChange={handleSelectionChange}
        aria-label="Settings"
      />
    );

    expect(screen.getByRole('tab', { name: 'Notifications' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Notification Preferences')).toBeInTheDocument();
  });

  describe('Keyboard Navigation', () => {
    it('navigates with ArrowRight and ArrowLeft in automatic mode', () => {
      render(<Tabs items={mockTabs} aria-label="Settings" />);

      const firstTab = screen.getByRole('tab', { name: 'Account' });
      firstTab.focus();

      fireEvent.keyDown(firstTab, { key: 'ArrowRight' });
      expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute('aria-selected', 'true');

      const secondTab = screen.getByRole('tab', { name: 'Password' });
      fireEvent.keyDown(secondTab, { key: 'ArrowRight' });
      expect(screen.getByRole('tab', { name: 'Notifications' })).toHaveAttribute('aria-selected', 'true');

      const thirdTab = screen.getByRole('tab', { name: 'Notifications' });
      fireEvent.keyDown(thirdTab, { key: 'ArrowLeft' });
      expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute('aria-selected', 'true');
    });

    it('jumps to first/last tab with Home and End keys', () => {
      render(<Tabs items={mockTabs} aria-label="Settings" />);

      const firstTab = screen.getByRole('tab', { name: 'Account' });
      firstTab.focus();

      fireEvent.keyDown(firstTab, { key: 'End' });
      expect(screen.getByRole('tab', { name: 'Notifications' })).toHaveAttribute('aria-selected', 'true');

      const lastTab = screen.getByRole('tab', { name: 'Notifications' });
      fireEvent.keyDown(lastTab, { key: 'Home' });
      expect(screen.getByRole('tab', { name: 'Account' })).toHaveAttribute('aria-selected', 'true');
    });

    it('requires Enter or Space for activation in manual mode', () => {
      render(
        <Tabs
          items={mockTabs}
          activationMode="manual"
          aria-label="Settings"
        />
      );

      const firstTab = screen.getByRole('tab', { name: 'Account' });
      firstTab.focus();

      // Move focus right with arrow key
      fireEvent.keyDown(firstTab, { key: 'ArrowRight' });

      // Tab selection should NOT change yet in manual mode
      expect(firstTab).toHaveAttribute('aria-selected', 'true');

      const secondTab = screen.getByRole('tab', { name: 'Password' });
      fireEvent.keyDown(secondTab, { key: 'Enter' });

      // Now it should be selected
      expect(secondTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Password Settings')).toBeInTheDocument();
    });

    it('navigates with ArrowDown and ArrowUp in vertical orientation', () => {
      render(
        <Tabs
          items={mockTabs}
          orientation="vertical"
          aria-label="Vertical Settings"
        />
      );

      const firstTab = screen.getByRole('tab', { name: 'Account' });
      firstTab.focus();

      fireEvent.keyDown(firstTab, { key: 'ArrowDown' });
      expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute('aria-selected', 'true');

      const secondTab = screen.getByRole('tab', { name: 'Password' });
      fireEvent.keyDown(secondTab, { key: 'ArrowUp' });
      expect(screen.getByRole('tab', { name: 'Account' })).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Accessibility (axe)', () => {
    it('has no accessibility violations for horizontal tabs', async () => {
      const { container } = render(
        <Tabs items={mockTabs} aria-label="Account Settings" />
      );

      await runAxeTest(container);
    });

    it('has no accessibility violations for vertical tabs', async () => {
      const { container } = render(
        <Tabs items={mockTabs} orientation="vertical" aria-label="Account Settings Vertical" />
      );

      await runAxeTest(container);
    });
  });
});
