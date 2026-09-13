/**
 * Which version answers the door at "/".
 *
 * "index" serves the comparison page that walks through all four. Set it to a
 * variant slug once you have picked one and that version becomes the site,
 * with the other three still reachable at /v/<slug>.
 */
export const frontDoor: "index" | "editorial" | "cinematic" | "kinetic" | "terminal" =
  "index";
