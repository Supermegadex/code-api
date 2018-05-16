/**
 * Code.org API library
 * @module code-api
 */

import { defaultStyles, defaultProps, StyleManager }
  from './styles';

/**
 * Unofficial code.org api recreation for ES6
 */
class Library {
  /**
   * Create a new instance of the library
   * @param {string|HTMLElement} root DOM node for ui elements
   * @param {string|CanvasRenderingContext2D} ctx Canvas 2D context or a string selector for a canvas element
   * @param {number} width Canvas width
   * @param {number} height canvas height
   * @param {boolean} [global] Make the class members pollute the global namespace (not recommended)
   */
  constructor(root, ctx, width, height, global) {
    if (typeof (Number.prototype.toRad) === "undefined") {
      Number.prototype.toRad = function () {
        return this * Math.PI / 180;
      }
    }
    if (typeof (Number.prototype.toDeg) === "undefined") {
      Number.prototype.toDeg = function () {
        return this * 180 / Math.PI;
      }
    }
    if (typeof ctx === "string") {
      let canvas = document.querySelector(ctx);
      this.ctx = canvas.getContext("2d");
    }
    else this.ctx = ctx;
    if (typeof root === "string") {
      this.root = document.querySelector(root);
    }
    else this.root = root;
    this.width = width;
    this.height = height;
    this.turtle = {
      x: width / 2,
      y: height / 2,
      color: "#000",
      rot: 0,
      pen: true,
      width: 5
    };

    console.log(this);
    if (global) {
      for (let i in this) {
        window[i] = this[i];
      }
    }
  }

  /**
   * Moves turtle to provided coordinates
   * @param {number} x x-coordinate to move turtle to
   * @param {number} y y-coordinate to move turtle to
   */
  moveTo(x, y) {
    this.turtle.x = x;
    this.turtle.y = y;
  }

  /**
   * Change the color of turtle strokes
   * @param {color} color CSS-compatible color string
   */
  penColor(color) {
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;
    this.turtle.color = color;
  }

  /**
   * Draw a dot at the turtle's current location
   * @param {number} radius Radius of the dot
   */
  dot(radius) {
    this.ctx.beginPath();
    this.ctx.arc(this.turtle.x, this.turtle.y, radius, 0, Math.PI * 2, true);
    this.ctx.fill();
  }

  /**
   * Turn the turtle to the right
   * @param {number} deg Degrees to turn the turtle
   */
  turnRight(deg) {
    this.turtle.rot += deg || 90;
  }

  /**
   * Turn the turtle to the left
   * @param {number} deg Degrees to turn the turtle
   */
  turnLeft(deg) {
    this.turtle.rot -= deg || 90;
  }

  /**
   * Turn the turtle to exactly the angle specified
   * @param {number} deg Agle to turn the turtle to
   */
  turnTo(deg) {
    this.turtle.rot = deg || 0;
  }

  /**
   * Get the x-position of the turtle
   * @returns {number} X-coordinate
   */
  getX() {
    return this.turtle.x;
  }

  /**
   * Get the y-position of the turtle
   * @returns {number} Y-coordinate
   */
  getY() {
    return this.turtle.y;
  }

  /**
   * Pick up the turtle's pen
   */
  penUp() {
    this.turtle.pen = false;
  }

  /**
   * Put down the turtle's pen
   */
  penDown() {
    this.turtle.pen = true;
  }

  /**
   * Change the color of the turtle pen using rgb color values
   * @param {number} r Red value
   * @param {number} g Green value
   * @param {number} b Blue value
   * @param {number} a Alpha value
   */
  penRGB(r, g, b, a) {
    if (a) {
      this.penColor(`rgba(${r}, ${g}, ${b}, ${a})`);
    }
    else {
      this.penColor(`rgb(${r}, ${g}, ${b})`);
    }
  }

  /**
   * Change the width of the turtle's stroke
   * @param {number} width Width of the stroke
   */
  penWidth(width) {
    this.ctx.lineWidth = width;
    this.turtle.width = width;
  }

  /**
   * Get the current angle the turtle is facing
   * @returns {number} Angle turtle is facing
   */
  getDirection() {
    let dir = this.turtle.rot;
    while (dir < 0) dir += 360;
    while (dir >= 360) dir -= 360;
    return dir;
  }

  /**
   * Move the turtle forward
   * @param {number} dist Pixels to travel
   */
  moveForward(dist) {
    let x1 = this.turtle.x;
    let y1 = this.turtle.y;
    let angle = this.getDirection().toRad();
    let L = dist || 25;
    let x2 = x1 + Math.sin(angle) * L;
    let y2 = y1 - Math.cos(angle) * L;
    if (this.turtle.pen) {
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
    this.turtle.x = x2;
    this.turtle.y = y2;
  }

  /**
   * Move the turtle backward
   * @param {number} dist Pixels to travel
   */
  moveBackward(dist) {
    let x1 = this.turtle.x;
    let y1 = this.turtle.y;
    let angle = this.getDirection().toRad();
    let length = dist || 25;
    let x2 = x1 - Math.sin(angle) * length;
    let y2 = y1 + Math.cos(angle) * length;
    if (this.turtle.pen) {
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
    this.turtle.x = x2;
    this.turtle.y = y2;
  }

  /**
   * Move to turtle to explicit x & y coordinates
   * @param {number} x new x-position
   * @param {number} y new y-position
   */
  move(x, y) {
    let x1 = this.turtle.x;
    let y1 = this.turtle.y;
    let x2 = x1 + x;
    let y2 = y1 + y;
    if (this.turtle.pen) {
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
    this.turtle.x = x2;
    this.turtle.y = y2;
  }

  /**
   * Move the turtle in the path of an arc where a circle is tangent 
   * on the right side of the direction that the turtle is facing
   * @param {number} angle Arc angle of the circle
   * @param {number} radius Radius of the circle
   * @param {boolean} left Turn left instead of right?
   */
  arcRight(angle, radius, left) {
    const center = left ? -90 : 90;
    const deg = left ? -angle : angle;
    if (this.ctx) {
      let x1 = this.turtle.x + radius *
        Math.sin(2 * Math.PI * (this.turtle.rot + center) / 360);
      let y1 = this.turtle.y - radius *
        Math.cos(2 * Math.PI * (this.turtle.rot + center) / 360);

      let start = 2 * Math.PI * (this.turtle.rot + (left ? 0 : 180)) / 360;
      let end = start + (2 * Math.PI * deg / 360);

      this.ctx.beginPath();
      this.ctx.arc(x1, y1, radius, start, end, left);
      this.ctx.stroke();

      this.turtle.rot = (this.turtle.rot + deg + 360) % 360;
      let x2 = radius * Math.cos(2 * Math.PI * this.turtle.rot / 360);
      let y2 = radius * Math.sin(2 * Math.PI * this.turtle.rot / 360);
      this.turtle.x = x1 + (left ? x2 : -x2);
      this.turtle.y = y1 + (left ? y2 : -y2);
    }
  }

  /**
   * Same as `arcLeft`, but the circle is on the left side
   * @param {number} angle Arc angle of the circle
   * @param {number} radius Radius of the circle
   */
  arcLeft(angle, radius) {
    this.arcRight(angle, radius, true);
  }

  /**
   * Listen for an event from an element
   * @param {string} id Id of element to listen to
   * @param {string} type Type of event to listen for
   * @param {function} handler Callback handler
   */
  onEvent(id, type, handler) {
    const el = document.getElementById(id);
    el.addEventListener(type, (event) => {
      handler(event);
    })
  }

  /**
   * Create a new button
   * @param {string} id Id of new button
   * @param {string} text Text content of button
   * @param {number} x Pixels from left
   * @param {number} y Pixels from top
   * @param {number} width Width of button
   * @param {number} height Height of button
   */
  button(id, text, x, y, width, height) {
    if (document.getElementById(id)) return false;
    const button = document.createElement('button');
    button.id = id;
    button.innerText = text;

    const custom = StyleManager.genCustom(x, y, width, height);
    const styles = Object.assign(defaultStyles.button, custom);
    StyleManager.apply(button, styles);
    this.root.appendChild(button);
  }

  /**
   * Create a text input
   * @param {string} id Id of the text field
   * @param {string} placeholder Text to show before a user enters text
   * @param {number} x X-coordinate
   * @param {number} y X-coordinate
   * @param {number} width Width of input
   * @param {number} height Height of input
   */
  textInput(id, placeholder, x, y, width, height) {
    if (document.getElementById(id)) return false;
    const input = document.createElement('input');
    input.id = id;
    input.placeholder = placeholder;

    const custom = StyleManager.genCustom(x, y, width, height);
    const styles = Object.assign(defaultStyles.input, custom);
    StyleManager.apply(input, styles);
    this.root.appendChild(input);
  }

  /**
   * Create a text label
   * @param {string} id Id of new label
   * @param {string} text Text content of label
   * @param {number} x X-coordinate
   * @param {number} y X-coordinate
   * @param {number} width Width of label
   * @param {number} height Height of label
   */
  textLabel(id, text, x, y, width, height) {
    if (document.getElementById(id)) return false;
    const label = document.createElement('label');
    label.id = id;
    label.innerText = text;

    const custom = StyleManager.genCustom(x, y, width, height);
    const styles = Object.assign(defaultStyles.label, custom);
    StyleManager.apply(label, styles);
    this.root.appendChild(label);
  }

  dropDown(id, option1, option2) {
    console.log("drop-downs are not supported yet")
  }
  /**
   * Get the text content of an element
   * Finds the most appropriate text field of an element
   * for you
   * @param {string} id Element id
   * @returns {string} Text content of element
   */
  getText(id) {
    const el = document.getElementById(id);
    if (el.nodeName === "INPUT") {
      return el.value;
    }
    else {
      return el.innerText;
    }
  }

  /**
   * Set the text content of an element to a string
   * @param {string} id Element id
   * @param {string} text Text to set
   */
  setText(id, text) {
    const el = document.getElementById(id);
    const validNodes = [
      "LABEL",
      "SPAN",
      "P",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6"
    ]
    if (el.nodeName === "INPUT") {
      el.value = text;
    }
    else if (validNodes.indexOf(el.nodeName) !== -1) {
      el.innerText = text;
    }
    else {
      console.error("Invalid element to get text from.");
    }
  }

  checkbox(id, checked) {
    console.log("checkboxes are not available yet")
  }

  /**
   * Create an image element
   * @param {string} id Element id
   * @param {string} url Image url
   * @param {number} x X-coordiante
   * @param {number} y Y-coordinate
   * @param {number} width Width
   * @param {number} height Height
   */
  image(id, url, x, y, width, height) {
    const img = document.createElement('img');
    img.id = id;
    img.src = url;

    const custom = StyleManager.genCustom(x, y, width, height);
    const styles = Object.assign(defaultStyles.image, custom);
    StyleManager.apply(img, styles);
    this.root.appendChild(img);
  }

  /**
   * Get the url of an image on the page
   * @param {string} id Id of image element
   * @returns {string} Image URL
   */
  getImageUrl(id) {
    const img = document.getElementById(id);
    if (img.nodeName === "IMG") {
      return img.src;
    }
    else {
      console.error("Only image elements are allowed.");
    }
  }

  /**
   * Set the url of an image element
   * @param {string} id Id of image element
   * @param {string} url Image url
   */
  setImageUrl(id, url) {
    const img = document.getElementById(id);
    if (img.nodeName === "IMG") {
      img.src = url;
    }
    else {
      console.error("Only image elements are allowed.");
    }
  }

  playSound(src) {

  }

  stopSound(src) {

  }

  /**
   * Show a hidden element
   * @param {string} id Element id
   */
  showElement(id) {
    document.getElementById(id).hidden = false;
  }

  /**
   * Hide a visible element
   * @param {string} id Element id
   */
  hideElement(id) {
    document.getElementById(id).hidden = true;
  }

  /**
   * Delete an element
   * @param {string} id Element id
   */
  deleteElement(id) {
    const el = document.querySelector(id);
    el.remove();
  }

  /**
   * Change the position of an existing element
   * @param {string} id Element id
   * @param {number} x X-coordinate
   * @param {number} y Y-coordinate
   * @param {number} width Width
   * @param {number} height Height
   */
  setPosition(id, x, y, width, height) {
    const el = document.querySelector(id);

    const styles = StyleManager.genCustom(x, y, width, height);
    StyleManager.apply(el, styles);
  }

  /**
   * Set only the width and height of an element
   * @param {string} id Element id
   * @param {number} width Width
   * @param {number} height Height
   */
  setSize(id, width, height) {
    const el = document.querySelector(id);
    const x = el.style.left, y = el.style.top;

    const styles = StyleManager.genCustom(x, y, width, height);
    StyleManager.apply(el, styles);
  }

  getProperty(id, property) {

  }

  /**
   * Set an element's property
   * @param {string} id Element id
   * @param {string} property Property to set
   * @param {*} value Value to apply
   */
  setProperty(id, property, value) {
    const el = document.getElementById(id);
    StyleManager.setProperty(el, property, value, defaultProps);
  }

  /**
   * Simply write some text to the screen
   * @param {string} text Test to write
   */
  write(text) {
    let el = document.querySelector('div.write-content[data-write-content]');
    if (!el) {
      console.log("Write element doesn't exist! Creating...")
      el = document.createElement("div");
      el.className = "write-content";
      el.setAttribute('data-write-content', true);
      StyleManager.apply(el, defaultStyles.write);
      this.root.appendChild(el);
    }
    let textContent = el.textContent || "";
    textContent += "\n" + text;
    el.textContent = textContent;
  }

  getXPosition(id) {

  }

  getYPosition(id) {

  }

  setScreen(id) {
    console.log("Sorry! Screens are not supported yet!")
  }
}

export default Library;
