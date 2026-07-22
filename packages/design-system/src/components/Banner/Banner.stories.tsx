import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from './Banner';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error', 'critical'],
    },
    isExposed: {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Info: Story = {
  args: {
    title: 'Heads up',
    variant: 'info',
    children: 'This change will apply to all team members.',
  },
};

export const Success: Story = {
  args: {
    title: 'Saved successfully',
    variant: 'success',
    children: 'Your profile settings were updated.',
  },
};

export const Warning: Story = {
  args: {
    title: 'Storage almost full',
    variant: 'warning',
    children: 'Upgrade your plan to avoid interruptions.',
  },
};

export const Error: Story = {
  args: {
    title: 'Payment failed',
    variant: 'error',
    children: 'Please update your card details and try again.',
  },
};

export const Dismissible: Story = {
  args: {
    title: 'Session timeout warning',
    variant: 'critical',
    children: 'Your session expires in 2 minutes.',
    onClose: () => {},
  },
};