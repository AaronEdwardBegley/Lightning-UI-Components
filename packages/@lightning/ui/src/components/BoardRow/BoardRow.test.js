import { pathToDataURI, makeCreateComponent } from '@lightning/ui-test-utils';
import BoardRow from '.';
import { Tile, CardContentVertical } from '@lightning/ui-core';
import BoardRowComponent from './BoardRowComponent';
import { jest } from '@jest/globals';

import CardLayout from './CardLayout';
import HeroLayout from './HeroLayout';
import PosterLayout from './PosterLayout';
import SquareLayout from './SquareLayout';
import SquareSmallLayout from './SquareSmallLayout';
import StandardLayout from './StandardLayout';

const jurassic = pathToDataURI('./src/assets/images/Jurassic_World_16x9.jpg');

const menuCard = {
  title: 'Test title',
  description: 'Test description',
  onEnter: () => {},
  onInfo: () => {}
};

const mockItemsValid = type => {
  return new Array(10).fill().map((item, index) => {
    return {
      type,
      src: jurassic,
      title: `Item ${index + 1}`
    };
  });
};

const createComponent = makeCreateComponent(BoardRow);

describe('BoardRow', () => {
  let boardRow, testRenderer;

  beforeEach(() => {
    [boardRow, testRenderer] = createComponent({ spyOnMethods: ['_update'] });
  });

  afterEach(() => {
    boardRow = null;
    testRenderer = null;
  });

  it('renders', () => {
    const tree = testRenderer.toJSON(2);
    expect(tree).toMatchSnapshot();
  });

  it('should have a height if layout is not defined', () => {
    // layout should default to standard if none is provided
    expect(boardRow.layout).toEqual('standard');
    expect(boardRow.h).toEqual(
      StandardLayout._calcTotalHeight(boardRow.style.itemSpacing)
    );
  });

  it('should deliver the correct height for default layout', () => {
    const boardRow = createComponent({ layout: 'standard' })[0];
    expect(boardRow.h).toEqual(
      StandardLayout._calcTotalHeight(boardRow.style.itemSpacing)
    );
  });

  it('should deliver the correct height for hero layout', () => {
    const boardRow = createComponent({ layout: 'hero' })[0];
    expect(boardRow.h).toEqual(
      HeroLayout._calcTotalHeight(boardRow.style.itemSpacing)
    );
  });

  it('should deliver the correct height for poster layout', () => {
    const boardRow = createComponent({ layout: 'poster' })[0];
    expect(boardRow.h).toEqual(
      PosterLayout._calcTotalHeight(boardRow.style.itemSpacing)
    );
  });

  it('should deliver the correct height for card layout', () => {
    const boardRow = createComponent({ layout: 'card' })[0];
    const roundedHeight = Math.round(boardRow.h * 100) / 100;
    expect(roundedHeight).toEqual(
      CardLayout._calcTotalHeight(boardRow.style.itemSpacing)
    );
  });

  it('should deliver the correct height for square layout', () => {
    const boardRow = createComponent({ layout: 'square' })[0];
    expect(boardRow.h).toEqual(
      SquareLayout._calcTotalHeight(boardRow.style.itemSpacing)
    );
  });

  it('should deliver the correct height for square small layout', () => {
    const boardRow = createComponent({ layout: 'squareSmall' })[0];
    expect(boardRow.h).toEqual(
      SquareSmallLayout._calcTotalHeight(boardRow.style.itemSpacing)
    );
  });

  it('should accept all properties for menuCard', () => {
    [boardRow] = createComponent({ menuCard });
    expect(
      boardRow._Layout.constructor.properties.includes('menuCard')
    ).toEqual(true);
    expect(boardRow._Layout.MenuCard.title).toEqual('Test title');
    expect(boardRow._Layout.MenuCard.description).toEqual('Test description');
    expect(typeof boardRow._Layout.MenuCard.onEnter).toBe('function');
    expect(typeof boardRow._Layout.MenuCard.onInfo).toBe('function');
  });

  it('should accept all valid row props', () => {
    const rowProps = [
      'scrollIndex',
      'alwaysScroll',
      'neverScroll',
      'lazyScroll',
      'lazyUpCount',
      'autoResizeWidth',
      'autoResizeHeight',
      'startLazyScrollIndex',
      'stopLazyScrollIndex'
    ];

    expect(
      rowProps.every(prop =>
        boardRow._Layout.constructor.properties.includes(prop)
      )
    ).toBe(true);
  });

  it('should execute function if enter is pressed while focused on the first vertical card', async () => {
    [boardRow, testRenderer] = createComponent(
      {
        menuCard,
        items: mockItemsValid(Tile)
      },
      { spyOnMethods: ['_update'] }
    );
    await boardRow.__updatePromiseSpy;

    const spy = jest.spyOn(boardRow._Layout._Row.items[0], 'onEnter');
    testRenderer.keyPress('Enter');
    expect(spy).toBeCalled();
  });

  it('should accept viewAll prop', () => {
    [boardRow, testRenderer] = createComponent({
      viewAll: true
    });
    expect(boardRow.viewAll).toBe(true);
  });

  it('should show a duplicate the verticalCard dynamic at the end of the row if viewAll is equal to true', async () => {
    [boardRow, testRenderer] = createComponent({
      viewAll: true,
      menuCard
    });

    testRenderer.getInstance()._Layout._Row.appendItemsPromise = new Promise(
      resolve =>
        (testRenderer.getInstance()._Layout._Row.appendItemsPromiseResolver =
          resolve)
    );
    const originalSetItems =
      testRenderer.getInstance()._Layout._Row.appendItems;
    jest
      .spyOn(testRenderer.getInstance()._Layout._Row, 'appendItems')
      .mockImplementation(function (items) {
        originalSetItems.call(this, items);
        testRenderer.getInstance()._Layout._Row.appendItemsPromiseResolver();
      });
    await testRenderer.getInstance()._Layout._Row.appendItemsPromise;

    expect(
      boardRow._Layout._Row.items[boardRow._Layout._Row.items.length - 1]
        .constructor.name
    ).toEqual(boardRow._Layout._Row.items[0].constructor.name);
  });

  it('should show standard layout update', () => {
    [boardRow, testRenderer] = createComponent({
      layout: 'standard'
    });
    expect(boardRow._Layout._layoutType.name).toBe('StandardLayout');
  });

  it.skip('should display items in the proper order for standard layout', async done => {
    [boardRow, testRenderer] = createComponent({
      layout: 'standard',
      items: mockItemsValid(Tile),
      menuCard
    });

    testRenderer.getInstance()._Layout._Row.appendItemsPromise = new Promise(
      resolve =>
        (testRenderer.getInstance()._Layout._Row.appendItemsPromiseResolver =
          resolve)
    );
    const originalSetItems =
      testRenderer.getInstance()._Layout._Row.appendItems;
    jest
      .spyOn(testRenderer.getInstance()._Layout._Row, 'appendItems')
      .mockImplementation(function (items) {
        originalSetItems.call(this, items);
        testRenderer.getInstance()._Layout._Row.appendItemsPromiseResolver();
      });
    await testRenderer.getInstance()._Layout._Row.appendItemsPromise;
    const whenColumnEnabled =
      testRenderer.getInstance()._Layout._Row.selected._whenEnabled;
    await boardRow._whenEnabled;
    testRenderer.keyPress('Right');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().firstLine).toBe('Item 1');
    testRenderer.keyPress('Down');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().firstLine).toBe('Item 2');
    testRenderer.keyPress('Right');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().firstLine).toBe('Item 4');
    testRenderer.keyPress('Up');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().firstLine).toBe('Item 3');
    done();
  });

  it('should show hero layout', () => {
    [boardRow, testRenderer] = createComponent({
      layout: 'hero'
    });
    expect(boardRow._Layout._layoutType.name).toBe('HeroLayout');
  });

  it.skip('should display items in the proper order for hero layout', async done => {
    [boardRow, testRenderer] = createComponent({
      layout: 'hero',
      items: mockItemsValid(Tile),
      menuCard
    });
    testRenderer.getInstance()._Layout._Row.appendItemsPromise = new Promise(
      resolve =>
        (testRenderer.getInstance()._Layout._Row.appendItemsPromiseResolver =
          resolve)
    );
    const originalSetItems =
      testRenderer.getInstance()._Layout._Row.appendItems;
    jest
      .spyOn(testRenderer.getInstance()._Layout._Row, 'appendItems')
      .mockImplementation(function (items) {
        originalSetItems.call(this, items);
        testRenderer.getInstance()._Layout._Row.appendItemsPromiseResolver();
      });
    await testRenderer.getInstance()._Layout._Row.appendItemsPromise;
    const whenColumnEnabled =
      testRenderer.getInstance()._Layout._Row.selected._whenEnabled;
    await boardRow._whenEnabled;
    testRenderer.keyPress('Right');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().firstLine).toBe('Item 1');
    testRenderer.keyPress('Right');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().firstLine).toBe('Item 2');
    testRenderer.keyPress('Down');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().firstLine).toBe('Item 3');
    testRenderer.keyPress('Right');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().firstLine).toBe('Item 4');
    done();
  });

  it('should show poster layout', () => {
    [boardRow, testRenderer] = createComponent({
      layout: 'poster'
    });
    expect(boardRow._Layout._layoutType.name).toBe('PosterLayout');
  });

  it.skip('should display items in the proper order for poster layout', async done => {
    [boardRow, testRenderer] = createComponent({
      layout: 'poster',
      items: mockItemsValid(Tile),
      menuCard
    });
    testRenderer.getInstance()._Layout._Row.appendItemsPromise = new Promise(
      resolve =>
        (testRenderer.getInstance()._Layout._Row.appendItemsPromiseResolver =
          resolve)
    );
    const originalSetItems =
      testRenderer.getInstance()._Layout._Row.appendItems;
    jest
      .spyOn(testRenderer.getInstance()._Layout._Row, 'appendItems')
      .mockImplementation(function (items) {
        originalSetItems.call(this, items);
        testRenderer.getInstance()._Layout._Row.appendItemsPromiseResolver();
      });
    await testRenderer.getInstance()._Layout._Row.appendItemsPromise;
    const whenColumnEnabled =
      testRenderer.getInstance()._Layout._Row.selected._whenEnabled;
    await boardRow._whenEnabled;
    testRenderer.keyPress('Right');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().firstLine).toBe('Item 1');
    testRenderer.keyPress('Right');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().firstLine).toBe('Item 2');
    testRenderer.keyPress('Right');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().firstLine).toBe('Item 3');
    testRenderer.keyPress('Right');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().firstLine).toBe('Item 4');
    done();
  });

  it('should show card layout', () => {
    [boardRow, testRenderer] = createComponent({
      layout: 'card'
    });
    expect(boardRow._Layout._layoutType.name).toBe('CardLayout');
  });

  it.skip('should display items in the proper order for card layout', async done => {
    [boardRow, testRenderer] = createComponent({
      layout: 'card',
      items: mockItemsValid(CardContentVertical),
      menuCard
    });
    testRenderer.getInstance()._Layout._Row.appendItemsPromise = new Promise(
      resolve =>
        (testRenderer.getInstance()._Layout._Row.appendItemsPromiseResolver =
          resolve)
    );
    const originalSetItems =
      testRenderer.getInstance()._Layout._Row.appendItems;
    jest
      .spyOn(testRenderer.getInstance()._Layout._Row, 'appendItems')
      .mockImplementation(function (items) {
        originalSetItems.call(this, items);
        testRenderer.getInstance()._Layout._Row.appendItemsPromiseResolver();
      });
    await testRenderer.getInstance()._Layout._Row.appendItemsPromise;
    const whenColumnEnabled =
      testRenderer.getInstance()._Layout._Row.selected._whenEnabled;
    await boardRow._whenEnabled;
    testRenderer.keyPress('Right');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().title).toBe('Item 1');
    testRenderer.keyPress('Right');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().title).toBe('Item 2');
    testRenderer.keyPress('Right');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().title).toBe('Item 3');
    testRenderer.keyPress('Right');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().title).toBe('Item 4');
    done();
  });

  it('should show square layout', () => {
    [boardRow, testRenderer] = createComponent({
      layout: 'square'
    });
    expect(boardRow._Layout._layoutType.name).toBe('SquareLayout');
  });

  it.skip('should display items in the proper order for square layout', async done => {
    [boardRow, testRenderer] = createComponent({
      layout: 'square',
      items: mockItemsValid(Tile),
      menuCard
    });
    testRenderer.getInstance()._Layout._Row.appendItemsPromise = new Promise(
      resolve =>
        (testRenderer.getInstance()._Layout._Row.appendItemsPromiseResolver =
          resolve)
    );
    const originalSetItems =
      testRenderer.getInstance()._Layout._Row.appendItems;
    jest
      .spyOn(testRenderer.getInstance()._Layout._Row, 'appendItems')
      .mockImplementation(function (items) {
        originalSetItems.call(this, items);
        testRenderer.getInstance()._Layout._Row.appendItemsPromiseResolver();
      });
    await testRenderer.getInstance()._Layout._Row.appendItemsPromise;
    const whenColumnEnabled =
      testRenderer.getInstance()._Layout._Row.selected._whenEnabled;
    await boardRow._whenEnabled;
    testRenderer.keyPress('Right');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().firstLine).toBe('Item 1');
    testRenderer.keyPress('Right');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().firstLine).toBe('Item 2');
    testRenderer.keyPress('Right');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().firstLine).toBe('Item 3');
    testRenderer.keyPress('Right');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().firstLine).toBe('Item 4');
    done();
  });

  it('should show squareSmall layout', () => {
    [boardRow, testRenderer] = createComponent({
      layout: 'squareSmall'
    });
    expect(boardRow._Layout._layoutType.name).toBe('SquareSmallLayout');
  });

  it.skip('should display items in the proper order for squareSmall layout', async done => {
    [boardRow, testRenderer] = createComponent({
      layout: 'squareSmall',
      items: mockItemsValid(Tile),
      menuCard
    });
    testRenderer.getInstance()._Layout._Row.appendItemsPromise = new Promise(
      resolve =>
        (testRenderer.getInstance()._Layout._Row.appendItemsPromiseResolver =
          resolve)
    );
    const originalSetItems =
      testRenderer.getInstance()._Layout._Row.appendItems;
    jest
      .spyOn(testRenderer.getInstance()._Layout._Row, 'appendItems')
      .mockImplementation(function (items) {
        originalSetItems.call(this, items);
        testRenderer.getInstance()._Layout._Row.appendItemsPromiseResolver();
      });
    await testRenderer.getInstance()._Layout._Row.appendItemsPromise;
    const whenColumnEnabled =
      testRenderer.getInstance()._Layout._Row.selected._whenEnabled;
    await boardRow._whenEnabled;
    testRenderer.keyPress('Right');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().firstLine).toBe('Item 1');
    testRenderer.keyPress('Down');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().firstLine).toBe('Item 2');
    testRenderer.keyPress('Right');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().firstLine).toBe('Item 4');
    testRenderer.keyPress('Up');
    await whenColumnEnabled;
    expect(testRenderer.getFocused().firstLine).toBe('Item 3');
    done();
  });

  it('should fallback to the standard layout if none specified', () => {
    expect(boardRow._Layout._layoutType.name).toBe('StandardLayout');
  });

  it('should fallback to the standard layout if wrong value is specified', () => {
    [boardRow, testRenderer] = createComponent({
      layout: 'foobar',
      items: mockItemsValid(Tile)
    });

    expect(boardRow._Layout._layoutType.name).toBe('StandardLayout');
  });

  it('should return each item in items as a BoardRowComponent that extends the item type', () => {
    const mock = jest.fn();

    mock.mockImplementation(async () => {
      return jurassic;
    });

    const createTileComponent = makeCreateComponent(
      BoardRowComponent(Tile, mock)
    );

    [boardRow, testRenderer] = createTileComponent({
      srcCached: jurassic
    });

    expect(mock).toBeCalledTimes(1);
  });
});
