import lng from '@lightningjs/core';
import { default as CardTitleComponent } from './CardTitle.js';
import mdx from './CardTitle.mdx';
import { createModeControl } from '@lightning/ui-core/storybook/index.js';
import { CATEGORIES } from 'lightning-ui-docs';

export default {
  title: `${CATEGORIES[128]}/CardTitle`,
  tag: 'Card',

  parameters: {
    docs: {
      page: mdx
    }
  }
};
export const CardTitle = () =>
  class CardTitle extends lng.Component {
    static _template() {
      return {
        Card: {
          type: CardTitleComponent,
          h: 386
        }
      };
    }
  };

CardTitle.args = {
  description: 'Description',
  title: 'Title'
};

CardTitle.argTypes = {
  ...createModeControl({ defaultValue: 'focused' }),
  description: {
    control: 'text',
    description: 'Description',
    table: {
      defaultValue: { summary: CardTitle.args.description }
    }
  },
  title: {
    control: 'text',
    description: 'title text',
    table: {
      defaultValue: { summary: CardTitle.args.title }
    }
  }
};

CardTitle.storyName = 'CardTitle';
