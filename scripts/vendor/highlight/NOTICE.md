# highlight.js

Version: 11.12.0. License: BSD-3-Clause, retained in LICENSE.

Official package: https://registry.npmjs.org/highlight.js/-/highlight.js-11.12.0.tgz
Official API: https://highlightjs.readthedocs.io/en/latest/api.html

core.cjs and languages/*.cjs are the unmodified CommonJS source files from lib/ in
the official package, renamed from .js to .cjs for use without a package manifest.
Only the 20 grammars used by the article renderer are included. No browser CDN or
runtime package installation is required. The adapter is ../../highlight-code.mjs.
