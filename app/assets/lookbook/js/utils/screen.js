// Adapted from: https://github.com/alpine-collective/toolkit

export default function (Alpine) {
  // Create reactive data context
  let data = Alpine.reactive({ screensize: window.innerWidth });

  // Configuration
  const defaultBreakpoints = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  };

  const breakpoints =
    window.AlpineMagicHelpersConfig &&
    window.AlpineMagicHelpersConfig.breakpoints
      ? window.AlpineMagicHelpersConfig.breakpoints
      : defaultBreakpoints;

  window.addEventListener("resize", () => {
    data.screensize = window.innerWidth;
  });

  Alpine.magic("screen", () => (breakpoint) => {
    let width = data.screensize;

    if (Number.isInteger(breakpoint)) return breakpoint <= width;

    // Check if breakpoint exists
    if (breakpoints[breakpoint] === undefined) {
      throw Error(
        "Undefined $screen property: " +
          breakpoint +
          ". Supported properties: " +
          Object.keys(breakpoints).join(", ")
      );
    }

    return breakpoints[breakpoint] <= width;
  });
}
