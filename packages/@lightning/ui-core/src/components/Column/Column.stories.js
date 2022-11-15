import lng from '@lightningjs/core';
import { context } from '../../globals/index.js';
import { flatten, getWidthByUpCount } from '../../utils/index.js';
import {
  FocusManager,
  Row,
  Column as ColumnComponent,
  Tile,
  Button
} from '../index.js';
import jurassic from '../../assets/images/Jurassic_World_16x9.jpg';
import mdx from './Column.mdx';
import parks from '../../assets/images/Parks_and_Recreation_16x9.jpg';
import person from '../../assets/images/cast.png';
import person1 from '../../assets/images/cast1.png';
import person2 from '../../assets/images/cast2.png';
import pets from '../../assets/images/The_Secret_Life_of_Pets_16x9.jpg';
import trolls from '../../assets/images/Trolls_World_Tour_16x9.jpg';
import { CATEGORIES } from 'lightning-ui-docs';

export default {
  title: `${CATEGORIES[64]}/Column`,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export const Column = args =>
  class Column extends lng.Component {
    static _template() {
      return {
        Column: {
          type: ColumnComponent,
          h:
            context.theme.layout.screenH -
            2 *
              (context.theme.layout.marginY + context.theme.layout.gutterY.sm),
          scrollIndex: args.scrollIndex,
          items: Array.apply(null, { length: 20 }).map((_, i) => ({
            type: ButtonFixedWidth,
            title: `Button ${i + 1}`
          }))
        }
      };
    }
  };
Column.argTypes = {
  scroll: {
    defaultValue: 1,
    control: { type: 'select', options: [1, 5, 15, 20] },
    description: 'scroll to selected index',
    table: { defaultValue: { summary: 1 } }
  },
  scrollIndex: {
    defaultValue: 0,
    control: { type: 'number', min: 0 },
    description:
      'Item index at which scrolling begins, provided the sum of item heights is greater than the height of the Column',
    table: { defaultValue: { summary: 0 } }
  },
  alwaysScroll: {
    defaultValue: false,
    control: { type: 'boolean' },
    description:
      'determines whether the column will stop scrolling as it nears the bottom to prevent white space',
    table: { defaultValue: { summary: false } }
  }
};
Column.parameters = {
  argActions: {
    scroll: function (index, component) {
      component.tag('Column').scrollTo(index - 1);
    }
  }
};

export const TestCase = args =>
  class TestCase extends lng.Component {
    static _template() {
      return {
        Column: {
          type: ColumnComponent,
          h:
            context.theme.layout.screenH -
            2 *
              (context.theme.layout.marginY + context.theme.layout.gutterY.sm),
          scrollIndex: args.scrollIndex,
          items: Array.apply(null, { length: 10 }).map((_, i) => ({
            type: ButtonFixedWidth,
            h: 80,
            title: `Button ${i + 1}`
          }))
        }
      };
    }
  };
TestCase.argTypes = {
  scrollIndex: {
    defaultValue: 3,
    control: { type: 'range', min: 0, max: 4, step: 1 },
    description:
      'Item index at which scrolling begins, provided the sum of item heights is greater than the height of the Column',
    table: { defaultValue: { summary: 3 } }
  }
};

export const MultiColumn = args =>
  class MultiColumn extends lng.Component {
    static _template() {
      return {
        FocusManager: {
          type: FocusManager,
          direction: 'row',
          items: [{ type: Column(args) }, { type: Column(args), x: 180 }]
        }
      };
    }
  };
MultiColumn.parameters = { tag: 'FocusManager' };
MultiColumn.argTypes = {
  scrollIndex: {
    defaultValue: 0,
    control: { type: 'range', min: 0, max: 4, step: 1 },
    description:
      'Item index at which scrolling begins, provided the sum of item heights is greater than the height of the Column',
    table: { defaultValue: { summary: 0 } }
  }
};

export const Plinko = () =>
  class Plinko extends lng.Component {
    static _template() {
      return {
        Column: {
          type: ColumnComponent,
          plinko: true,
          items: [
            {
              type: Row,
              h: 40,
              w: getWidthByUpCount(context.theme, 1),
              items: Array.apply(null, { length: 3 }).map(() => ({
                type: ButtonFixedWidth,
                title: 'Button',
                w: 150
              }))
            },
            {
              type: Row,
              h: 40,
              w: getWidthByUpCount(context.theme, 1),
              items: Array.apply(null, { length: 3 }).map(() => ({
                type: ButtonFixedWidth,
                title: 'Button',
                w: 150
              }))
            }
          ]
        }
      };
    }
  };

export const VaryingItemHeight = () =>
  class VaryingItemHeight extends lng.Component {
    static _template() {
      return {
        Column: {
          type: ColumnComponent,
          h:
            context.theme.layout.screenH -
            2 *
              (context.theme.layout.marginY + context.theme.layout.gutterY.sm),
          items: Array.apply(null, { length: 10 }).map(() => ({
            type: ButtonFixedWidth,
            title: 'Button',
            h: 40 + Math.floor(Math.random() * 100)
          }))
        }
      };
    }
  };

export const ExpandableHeightItems = () =>
  class ExpandableHeightItems extends lng.Component {
    static _template() {
      return {
        Column: {
          type: ColumnComponent,
          h:
            context.theme.layout.screenH -
            2 *
              (context.theme.layout.marginY + context.theme.layout.gutterY.sm),
          items: Array.apply(null, { length: 15 }).map((_, i) => ({
            type: ExpandingButton,
            h: 40,
            w: 150,
            title: `Button ${i}`
          }))
        }
      };
    }
  };

export const ExpandableHeightRows = () =>
  class ExpandableHeightItems extends lng.Component {
    static _template() {
      return {
        Column: {
          type: ColumnComponent,
          h:
            context.theme.layout.screenH -
            2 *
              (context.theme.layout.marginY + context.theme.layout.gutterY.sm),
          w: getWidthByUpCount(context.theme, 1),
          plinko: true,
          items: Array.apply(null, { length: 15 }).map((_, i) => ({
            type: ExpandingRow,
            w: getWidthByUpCount(context.theme, 1),
            h: 40,
            items: [
              { type: ExpandingButton, title: `Button ${i}`, w: 150 },
              { type: ExpandingButton, title: `Button ${i}`, w: 150 },
              { type: ExpandingButton, title: `Button ${i}`, w: 150 }
            ]
          }))
        }
      };
    }
  };

export const SkipFocus = args =>
  class SkipFocus extends lng.Component {
    static _template() {
      return {
        Column: {
          type: ColumnComponent,
          h:
            context.theme.layout.screenH -
            2 *
              (context.theme.layout.marginY + context.theme.layout.gutterY.sm),
          wrapSelected: args.wrapSelected,
          items: [
            ...Array.apply(null, { length: 49 }).map((_, i) => {
              if (i % 4 === 0)
                return {
                  type: Title,
                  titleText: 'Skip Focus Text',
                  h: 30,
                  skipFocus: true
                };
              return { type: ButtonFixedWidth, title: 'Button' };
            }),
            {
              type: Title,
              titleText: 'Skip Focus Text',
              h: 30,
              skipFocus: true
            }
          ]
        }
      };
    }
  };
SkipFocus.argTypes = {
  wrapSelected: {
    defaultValue: false,
    control: { type: 'boolean' },
    description:
      'enables wrapping behavior, so selectNext() selects the first item if the current item is the last on the list and vice versa',
    table: { defaultValue: { summary: false } }
  }
};

export const OnScreenEffect = () =>
  class OnScreenEffect extends lng.Component {
    static _template() {
      return {
        Column: {
          type: ColumnComponent,
          scrollIndex: 2,
          h:
            context.theme.layout.screenH -
            2 *
              (context.theme.layout.marginY + context.theme.layout.gutterY.sm),
          items: Array.apply(null, { length: 10 }).map((_, i) => {
            return {
              type: ButtonFixedWidth,
              title: `Button ${i}`
            };
          })
        }
      };
    }

    _init() {
      this.tag('Column').onScreenEffect = items => {
        const { selected } = this.tag('Column');
        const selectedIndex = items.indexOf(selected);

        items
          .slice(0, selectedIndex)
          .reverse()
          .forEach((item, idx) => {
            item.alpha = 1 / (1 + idx);
          });
        items.slice(selectedIndex + 1).forEach((item, idx) => {
          item.alpha = 1 / (1 + idx);
        });
      };
    }
  };

export const StickyTitle = () => {
  const items = flatten(
    Array.apply(null, { length: 5 }).map((_, i) => {
      const headerText = `Sticky Header ${i}`;
      const items = Array.apply(null, { length: 8 }).map((_, i) => {
        return {
          type: ButtonFixedWidth,
          title: `Button ${i + 1}`,
          w: 200,
          headerText
        };
      });

      return [
        {
          type: ColumnHeader,
          headerText,
          skipFocus: true
        },
        ...items
      ];
    })
  );
  items.shift();

  return class ColumnExample extends lng.Component {
    static _template() {
      return {
        h: 450,
        w: 200,
        ColumnHeader: {
          type: ColumnHeader,
          headerText: 'Sticky Header 0',
          h: 40
        },
        Column: {
          y: 50,
          w: 300,
          h: 400,
          clipping: true,
          type: ColumnComponent,
          items,
          signals: {
            selectedChange: '_updateHeader'
          }
        }
      };
    }

    _updateHeader(selected) {
      this.tag('ColumnHeader').headerText = selected.headerText || '';
    }
  };
};

export const CenteredInParent = () =>
  class CenteredInParent extends lng.Component {
    static _template() {
      const buttonW = 150;
      const button = {
        type: ButtonFixedWidth,
        title: 'Button',
        w: buttonW
      };
      const itemSpacing = context.theme.layout.gutterY.xs;
      return {
        Column: {
          type: ColumnComponent,
          w: buttonW * 3 + itemSpacing * 2,
          items: [
            {
              type: Row,
              h: 40,
              items: Array.apply(null, { length: 3 }).map(() => button)
            },
            {
              type: Row,
              h: 40,
              centerInParent: true,
              items: Array.apply(null, { length: 1 }).map(() => button)
            }
          ]
        }
      };
    }
  };

class ColumnHeader extends lng.Component {
  static _template() {
    return {
      Label: {
        x: 5,
        y: 10,
        text: {
          text: 'Sticky Header',
          fontSize: 24,
          textColor: 0xffffffff
        },
        zIndex: 2
      },
      Line: {
        color: 0xffffff1f,
        rect: true,
        w: 300,
        y: 35,
        h: 3
      }
    };
  }
}

class Title extends lng.Component {
  static _template() {
    return {
      Label: {
        x: 75,
        y: 22,
        mount: 0.5,
        color: 0xffffffff,
        text: { fontSize: 20 }
      }
    };
  }

  _init() {
    this.tag('Label').text = this.titleText;
  }
}

class ButtonFixedWidth extends Button {
  static get __componentName() {
    return 'ButtonSmall';
  }

  _init() {
    this.fixed = true;
    this.w = 200;
    super._init();
  }
}

class ExpandingButton extends Button {
  _focus() {
    super._focus();
    this.patch({ h: 100 });
    this.fireAncestors('$itemChanged');
  }

  _unfocus() {
    super._unfocus();
    this.patch({ h: 40 });
  }
}

class ExpandingRow extends Row {
  _focus() {
    super._focus();
    this.patch({ h: 100 });
    this.fireAncestors('$itemChanged');
  }

  _unfocus() {
    super._unfocus();
    this.patch({ h: 40 });
  }
}

export const SkipPlinko = () =>
  class SkipPlinko extends lng.Component {
    static _template() {
      return {
        Column: {
          type: ColumnComponent,
          w: getWidthByUpCount(context.theme, 1),
          style: {
            itemSpacing: 32
          },
          plinko: true,
          items: [
            {
              type: Row,
              h: 200,
              style: {
                itemSpacing: 50
              },
              items: [
                {
                  type: Tile,
                  w: 320,
                  h: 180,
                  artwork: {
                    src: parks
                  }
                },
                {
                  type: Tile,
                  w: 320,
                  h: 180,
                  artwork: {
                    src: person
                  }
                },
                {
                  type: Tile,
                  w: 320,
                  h: 180,
                  artwork: {
                    src: trolls
                  }
                }
              ]
            },
            {
              type: Row,
              h: 340,
              skipPlinko: true,
              items: [
                {
                  type: Tile,
                  w: 1060,
                  h: 300,
                  artwork: {
                    src: pets
                  },
                  metadata: {
                    firstLine: 'Row with skipPlinko set to true'
                  }
                }
              ]
            },
            {
              type: Row,
              style: {
                itemSpacing: 50
              },
              h: 180,
              items: [
                {
                  type: Tile,
                  w: 320,
                  h: 180,
                  artwork: {
                    src: person2
                  }
                },
                {
                  type: Tile,
                  w: 320,
                  h: 180,
                  artwork: {
                    src: jurassic
                  }
                },
                {
                  type: Tile,
                  w: 320,
                  h: 180,
                  artwork: {
                    src: person1
                  }
                }
              ]
            }
          ]
        }
      };
    }
  };

export const LazyUpCount = args =>
  class LazyUpCount extends lng.Component {
    static _template() {
      return {
        Column: {
          type: ColumnComponent,
          h: 500,
          scrollIndex: args.scrollIndex,
          lazyUpCount: args.lazyUpCount,
          items: Array.apply(null, { length: 20 }).map((_, i) => ({
            type: ButtonFixedWidth,
            title: `Button ${i + 1}`
          })),
          alwaysScroll: args.alwaysScroll
        }
      };
    }
  };
LazyUpCount.args = {
  scrollIndex: 0,
  lazyUpCount: 5,
  itemTransition: 0.4
};
LazyUpCount.argTypes = {
  itemTransition: {
    control: { type: 'number', min: 0, step: 0.1 }
  },
  scroll: {
    control: { type: 'select', options: [1, 5, 15, 20] }
  },
  scrollIndex: {
    control: { type: 'number', min: 0 }
  },
  lazyUpCount: {
    control: { type: 'number', min: 0 }
  },
  alwaysScroll: {
    control: { type: 'boolean' }
  }
};

export const AddingItems = args =>
  class AddingItems extends lng.Component {
    static _template() {
      return {
        Column: {
          type: ColumnComponent,
          h: 500,
          scrollIndex: args.scrollIndex,
          items: Array.apply(null, { length: 20 }).map((_, i) => ({
            type: ButtonFixedWidth,
            title: `Button ${i + 1}`
          }))
        }
      };
    }

    _init() {
      super._init();
      setTimeout(() => {
        this.tag('Column').appendItemsAt(
          [
            {
              type: ButtonFixedWidth,
              title: 'New Button 0'
            },
            {
              type: ButtonFixedWidth,
              title: 'New Button 1'
            },
            {
              type: ButtonFixedWidth,
              title: 'New Button 2'
            }
          ],
          3
        );
      }, 3000);
      setTimeout(() => {
        this.tag('Column').prependItems([
          {
            type: ButtonFixedWidth,
            title: 'New Button 3',
            w: 150
          },
          {
            type: ButtonFixedWidth,
            title: 'New Button 4',
            w: 150
          },
          {
            type: ButtonFixedWidth,
            title: 'New Button 5',
            w: 150
          }
        ]);
      }, 3750);
    }
  };
AddingItems.args = {
  scrollIndex: 0
};
AddingItems.argTypes = {
  scrollIndex: {
    control: 'number'
  }
};

export const RemovingItems = args =>
  class RemovingItems extends lng.Component {
    static _template() {
      return {
        Column: {
          type: ColumnComponent,
          h: 500,
          scrollIndex: args.scrollIndex,
          items: Array.apply(null, { length: 20 }).map((_, i) => ({
            type: ButtonFixedWidth,
            title: `Button ${i + 1}`
          }))
        }
      };
    }

    _init() {
      super._init();
      setTimeout(() => {
        this.tag('Column').removeItemAt(1);
      }, 3000);
    }
  };
RemovingItems.args = {
  scrollIndex: 0
};
RemovingItems.argTypes = {
  scrollIndex: {
    control: 'number'
  }
};
