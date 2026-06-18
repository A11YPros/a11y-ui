import type { Meta, StoryObj } from '@storybook/react';
import { useMemo } from 'react';
import { useArgs } from 'storybook/preview-api';
import { DataTable, type DataTableColumn } from './DataTable';

type Row = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const sampleData: Row[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
];

const columns: DataTableColumn<Row>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
];

function sortData<T extends Record<string, any>>(
  data: T[],
  sortConfig: { column: string; direction: 'asc' | 'desc' } | undefined
): T[] {
  if (!sortConfig) return data;

  return [...data].sort((a, b) => {
    const aValue = a[sortConfig.column];
    const bValue = b[sortConfig.column];
    if (aValue === bValue) return 0;
    const comparison = aValue < bValue ? -1 : 1;
    return sortConfig.direction === 'asc' ? comparison : -comparison;
  });
}

const getRowId = (row: Row) => row.id;

type SortConfig = { column: string; direction: 'asc' | 'desc' } | undefined;

type StoryArgs = {
  data: Row[];
  columns: typeof columns;
  caption: string;
  className?: string;
  selectable: boolean;
  selectedRows: string[];
  sortConfig: SortConfig;
};

const meta = {
  title: 'Components/DataTable',
  component: DataTable<Row>,
  tags: ['autodocs'],
  args: {
    data: sampleData,
    columns,
    getRowId, // <- add this
    caption: 'User list',
    className: '',
    selectable: false,
    selectedRows: [],
    sortConfig: undefined,
  },
  argTypes: {
    caption: { control: 'text' },
    className: { control: 'text' },
    selectable: { control: 'boolean' },
    selectedRows: { control: 'object' },
    sortConfig: { control: 'object' },
    data: { control: 'object' },
    columns: { control: 'object' },
    getRowId: { control: false },
    onSelectionChange: { control: false },
    onSortChange: { control: false },
  },
} satisfies Meta<typeof DataTable<Row>>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderInteractive: Story['render'] = function Render(args) {
  const [{ selectedRows = [], sortConfig }, updateArgs] = useArgs<
    Pick<StoryArgs, 'selectedRows' | 'sortConfig'>
  >();

  const sortedData = sortData<Row>(args.data, sortConfig);

  return (
    <DataTable<Row>
      data={sortedData}
      columns={args.columns}
      getRowId={getRowId}
      caption={args.caption}
      className={args.className}
      selectable={args.selectable}
      selectedRows={selectedRows}
      sortConfig={sortConfig}
      onSelectionChange={(next) => updateArgs({ selectedRows: next })}
      onSortChange={(column, direction) => updateArgs({ sortConfig: { column, direction } })}
    />
  );
};

export const Default: Story = {
  render: renderInteractive,
  args: {
    selectable: false,
    sortConfig: undefined,
    selectedRows: [],
  },
};

export const Selectable: Story = {
  render: renderInteractive,
  args: {
    selectable: true,
    selectedRows: [],
    sortConfig: undefined,
    caption: 'Selectable user list',
  },
};

export const Sortable: Story = {
  render: renderInteractive,
  args: {
    selectable: false,
    sortConfig: { column: 'name', direction: 'asc' },
    caption: 'Sortable user list',
  },
};