// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright 2021 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.link-swatch-link:not(.undefined) {
  cursor: pointer;
  text-underline-offset: 2px;
  color: var(--color-link);
}

.link-swatch-link:hover:not(.undefined) {
  text-decoration: underline;
}

.link-swatch-link:focus:not(:focus-visible) {
  outline: none;
}

.link-swatch-link.undefined {
  --override-link-swatch-link-undefined-color: rgb(102 102 102);

  color: var(--override-link-swatch-link-undefined-color);
}

/*# sourceURL=linkSwatch.css */
`);
export default styles;
