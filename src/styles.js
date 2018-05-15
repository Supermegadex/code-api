/**
 * Container for code-api default styling of different elements
 * @constant
 */
const defaultStyles = {
  button: {
    "padding": "0px",
    "margin": "0px",
    "height": "30px",
    "width": "80px",
    "font-size": "14px",
    "color": "rgb(255, 255, 255)",
    "background-color": "rgb(26, 188, 156)",
    "left": "90px",
    "top": "60px",
    "border": "none",
    "cursor": "pointer",
    "position": "absolute"
  },
  input: {
    "margin": "0px",
    "width": "200px",
    "height": "30px",
    "color": "rgb(0, 0, 0)",
    "left": "25px",
    "top": "165px",
    "border": "1px solid #999",
    "padding": "5px",
    "position": "absolute"
  },
  label: {
    "padding": "2px",
    "line-height": "1",
    "font-size": "14px",
    "overflow": "hidden",
    "word-wrap": "break-word",
    "color": "rgb(51, 51, 51)",
    "max-width": "320px",
    "width": "32px",
    "height": "19px",
    "position": "absolute"
  },
  image: {
    "height": "100px",
    "width": "100px",
    "position": "absolute",
    "left": "25px",
    "top": "245px",
    "margin": "0px",
    "object-fit": "contain"
  }
}

/**
 * Manage code-api elements' styles
 */
class StyleManager {
  /**
   * Apply an object with CSS key-value pairs to 
   * @param {HTMLElement} element Element to apply styles
   * @param {object} styles Style object
   */
  static apply(element, styles) {
    for (let style of Object.keys(styles)) {
      element.style.setProperty(style, styles[style]);
    }
  }

  /**
   * Generate position and size styles for an element
   * @param {number} x X-coordinate
   * @param {number} y Y-coordinate
   * @param {number} width Width
   * @param {number} height Height
   * @returns {object} CSS object
   */
  static genCustom(x, y, width, height) {
    const custom = {};
    if (width) custom.width = width + "px";
    if (height) custom.height = height + "px";
    if (x || x === 0) custom.left = x + "px";
    if (y || x === 0) custom.top = y + "px";
    return custom;
  }

  static setProperty(el, )
}

export { defaultStyles, StyleManager };
