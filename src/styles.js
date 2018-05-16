/**
 * Module to keep track of styling elements
 * @module styles
 */

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
  },
  write: {
    "z-index": "-1",
    "white-space": "pre-wrap"
  }
}

/**
 * Default proprty keys for editing element props and styles.
 * @constant
 */
const defaultProps = {
  "text": (el, val) => {
    if (el.nodeName === "INPUT") {
      el.value = val;
    }
    else el.innerText = value;
  },
  "width": (el, val, prop) =>
    StyleManager.setStyle(el, prop, val),
  "height": (el, val, prop) =>
    StyleManager.setStyle(el, prop, val),
  "x": (el, val) =>
    StyleManager.setStyle(el, "left", val),
  "y": (el, val) =>
    StyleManager.setStyle(el, "top", val),
  "text-color": (el, val) =>
    StyleManager.setStyle(el, "color", val),
  "background-color": (el, val, prop) =>
    StyleManager.setStyle(el, prop, val),
  "font-size": (el, val, prop) =>
    StyleManager.setStyle(el, prop, val),
  "image": (el, val) =>
    StyleManager.setAttribute(el, "src", val),
  "hidden": (el, val, prop) =>
    StyleManager.setAttribute(el, prop, val),
  "placeholder": (el, val, prop) =>
    StyleManager.setAttribute(el, prop, val),
  "text-align": (el, val, prop) =>
    StyleManager.setStyle(el, prop, val),
  "value": (el, val, prop) =>
    StyleManager.setAttribute(el, prop, val),
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

  /**
   * Set a supported style property seamlessly
   * @param {HTMLElement} el Target element
   * @param {string} prop Property to set
   * @param {*} value Value to assign
   * @param {object} [props] Object of valid properties
   * @returns Whaever the application function returns
   */
  static setProperty(el, prop, value, props) {
    if (!props) props = defaultProps;
    return props[prop](el, value, prop);
  }

  /**
   * Set a CSS style with added number support
   * @param {HTMLElement} el Element 
   * @param {string} prop CSS property to set
   * @param {string|number} value Value to apply
   * @returns The value that was passed
   */
  static setStyle(el, prop, value) {
    const numRegEx = /^[0-9]*$/g;
    if (numRegEx.test(value)) value = `${value}px`;
    el.style.setProperty(prop, value);
    return value;
  }

  /**
   * Set any HTML attribute, including `data-` ones.
   * @param {HTMLElement} el Element
   * @param {string} attr Attribute to set
   * @param {string|number|boolean} value Value to apply
   */
  static setAttribute(el, attr, value) {
    el.setAttribute(attr, value);
    return value;
  }
}

export { defaultStyles, StyleManager, defaultProps };
