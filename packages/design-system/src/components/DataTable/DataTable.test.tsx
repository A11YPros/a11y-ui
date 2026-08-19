import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, runAxeTest } from '../../test-utils';
import { DataTable, DataTableColumn } from './DataTable';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const mockData: User[] = [
  { id: '1', name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob Jones', email: 'bob@example.com', role: 'User' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor' },
];

const mockColumns: DataTableColumn<User>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email Address' },
  { key: 'role', header: 'Role', sortable: true, render: (user) => <span className="badge">{user.role}</span> },
];

describe('DataTable', () => {
  it('renders table headers and row data', () => {
    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
        getRowId={(u) => u.id}
        caption="Users Table"
      />
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('renders table caption', () => {
    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
        getRowId={(u) => u.id}
        caption="Team Members"
      />
    );

    expect(screen.getByText('Team Members')).toBeInTheDocument();
  });

  describe('Sorting', () => {
    it('sets aria-sort on sortable columns', () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          getRowId={(u) => u.id}
          sortConfig={{ column: 'name', direction: 'asc' }}
        />
      );

      const nameHeader = screen.getByText('Name').closest('th');
      const emailHeader = screen.getByText('Email Address').closest('th');

      expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
      expect(emailHeader).toHaveAttribute('aria-sort', 'none');
    });

    it('calls onSortChange with column and direction when clicking sort button', () => {
      const handleSortChange = vi.fn();

      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          getRowId={(u) => u.id}
          sortConfig={{ column: 'name', direction: 'asc' }}
          onSortChange={handleSortChange}
        />
      );

      const nameSortBtn = screen.getByRole('button', { name: /name/i });
      fireEvent.click(nameSortBtn);

      expect(handleSortChange).toHaveBeenCalledWith('name', 'desc');
    });
  });

  describe('Selection', () => {
    it('renders selection checkboxes when selectable=true', () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          getRowId={(u) => u.id}
          selectable
          selectedRows={['1']}
        />
      );

      const selectAll = screen.getByLabelText('Select all rows');
      const row1Checkbox = screen.getByLabelText('Select row 1');

      expect(selectAll).toBeInTheDocument();
      expect(row1Checkbox).toBeChecked();
    });

    it('calls onSelectionChange when selecting a row', () => {
      const handleSelectionChange = vi.fn();

      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          getRowId={(u) => u.id}
          selectable
          selectedRows={[]}
          onSelectionChange={handleSelectionChange}
        />
      );

      const row2Checkbox = screen.getByLabelText('Select row 2');
      fireEvent.click(row2Checkbox);

      expect(handleSelectionChange).toHaveBeenCalledWith(['2']);
    });

    it('selects all rows when clicking select-all checkbox', () => {
      const handleSelectionChange = vi.fn();

      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          getRowId={(u) => u.id}
          selectable
          selectedRows={[]}
          onSelectionChange={handleSelectionChange}
        />
      );

      const selectAll = screen.getByLabelText('Select all rows');
      fireEvent.click(selectAll);

      expect(handleSelectionChange).toHaveBeenCalledWith(['1', '2', '3']);
    });

    it('deselects all rows when select-all is clicked while all are selected', () => {
      const handleSelectionChange = vi.fn();

      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          getRowId={(u) => u.id}
          selectable
          selectedRows={['1', '2', '3']}
          onSelectionChange={handleSelectionChange}
        />
      );

      const selectAll = screen.getByLabelText('Select all rows');
      fireEvent.click(selectAll);

      expect(handleSelectionChange).toHaveBeenCalledWith([]);
    });

    it('sets aria-selected on selectable table rows', () => {
      render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          getRowId={(u) => u.id}
          selectable
          selectedRows={['2']}
        />
      );

      const rows = screen.getAllByRole('row');
      // rows[0] is header row
      expect(rows[1]).toHaveAttribute('aria-selected', 'false');
      expect(rows[2]).toHaveAttribute('aria-selected', 'true');
      expect(rows[3]).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('Accessibility (axe)', () => {
    it('has no accessibility violations for basic table', async () => {
      const { container } = render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          getRowId={(u) => u.id}
          caption="Team directory"
        />
      );

      await runAxeTest(container);
    });

    it('has no accessibility violations for selectable and sorted table', async () => {
      const { container } = render(
        <DataTable
          data={mockData}
          columns={mockColumns}
          getRowId={(u) => u.id}
          selectable
          selectedRows={['1', '3']}
          sortConfig={{ column: 'name', direction: 'asc' }}
          caption="Team directory with selection"
        />
      );

      await runAxeTest(container);
    });
  });
});
