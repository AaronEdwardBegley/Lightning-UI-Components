/**
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

import lng from '@lightningjs/core';
import Slider, { SliderStyle } from '../Slider';
import { ScrollWrapperStyle } from './ScrollWrapper';
import { StylePartial } from '../../types/lui';

type ScrollSliderStyle = SliderStyle & {
  progressBar: { animation: ScrollWrapperStyle['scroll'] };
  circleAnimation: ScrollWrapperStyle['scroll'];
};

declare class ScrollSlider<
  TemplateSpec extends Slider.TemplateSpec = Slider.TemplateSpec,
  TypeConfig extends lng.Component.TypeConfig = lng.Component.TypeConfig
> extends Slider<TemplateSpec, TypeConfig> {
  get style(): ScrollSliderStyle;
  set style(v: StylePartial<ScrollSliderStyle>);
}

export { ScrollSlider as default, ScrollSliderStyle };
