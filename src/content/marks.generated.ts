/**
 * Written by `npm run marks`. Do not edit by hand.
 *
 * Lists which mask files actually exist in public/marks, so a brand mark is
 * only ever rendered when its PNG is really there. A CSS mask whose image
 * fails to load is ignored by the browser, which would paint the element as a
 * solid block, so this list is the guard against that.
 */
export const availableMarks: readonly string[] = [];
