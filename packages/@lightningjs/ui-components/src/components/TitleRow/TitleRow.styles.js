﻿/**
 * Copyright 2023 Comcast Cable Communications Management, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { getWidthByUpCount } from '../../utils';

export const base = theme => ({
  width: getWidthByUpCount(theme, 1),
  titleMarginLeft: theme.layout.gutterX,
  titleTextStyle: {
    ...theme.typography.headline1,
    textColor: theme.color.textNeutral
  },
  titleMarginBottom: theme.spacer.lg
});

export const tone = theme => ({
  neutral: {
    titleTextStyle: { textColor: theme.color.textNeutral }
  },
  inverse: {
    titleTextStyle: { textColor: theme.color.textInverse }
  },
  brand: {
    titleTextStyle: { textColor: theme.color.textNeutral }
  }
});
