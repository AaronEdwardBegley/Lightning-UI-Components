import React from 'react';
import { useGlobals } from '@storybook/manager-api';
import { IconButton, Icons } from '@storybook/components';
import { setGlobalTheme } from '../../utils/themeUtils';

/**
 * @returns a reset button that when clicked will reset component style panel back to default style props of component base on theme
 */

export default function ResetButton() {
  const [{ LUITheme }, updateGlobals] = useGlobals();

  /** resets theme globals & controls */
  const handleReset = () => {
    //FIXME: resets to Base but needs logic to set to what ever theme is selected in ThemePicker
    return setGlobalTheme('base', updateGlobals);
  };

  return (
    <>
      <IconButton
        title="reset styles"
        label="reset-panel"
        onClick={handleReset}
      >
        <Icons icon="undo" />
      </IconButton>
    </>
  );
}
