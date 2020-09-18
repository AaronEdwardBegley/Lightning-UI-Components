import createStyles from '../components/Styles/createStyles';
import { clone } from '../utils';
import { getXfinityTheme } from '../components/Styles/createTheme';

export default function withStyles(Base, styles, theme) {
  const _theme = theme || Base.theme || getXfinityTheme();
  const _styles = Base.styles ? clone(Base.styles, createStyles(styles, _theme)) : createStyles(styles, _theme);

  return class extends Base {
    static get name() { return Base.name }
    static get styles() { return _styles };
    get styles() { return _styles }
  }
}
