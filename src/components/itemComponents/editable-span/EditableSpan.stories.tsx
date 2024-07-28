import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {EditableSpan} from './EditableSpan';

const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            description: 'Start value empty. Add value push button set string.',
            control: 'text',
        },
        className: {
            description: 'Class name for styling',
            control: 'text',
        },
        onChange: {
            description: 'Value EditableSpan changed',
        },
    },
    args: {
        title: 'string',
        className: 'string',
        onChange: action('Value EditableSpan changed'),
    },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
    args: {
        title: 'Default title',
        className: '',
        onChange: action('Value EditableSpan changed'),
    },
};
