import Library from '../../src/index';

const lib = new Library("#app-root", "#canvas", 300, 200);
console.log(lib);

lib.image("test-image", "https://i.redd.it/f7sp2hsovtx01.jpg", 0, 0, 100, 100);
lib.button("test-btn", "Hello, world!", 100, 50, 200, 50);
lib.onEvent("test-btn", "click", function (ev) {
  console.log(lib.getText("test-input"));
});

lib.textInput("test-input", "Type here!", 100, 250, 200, 50);

lib.textLabel("test-label", "Label", 300, 0, 50, 50);
