function typeWriter(elementId, text, speed) {
  const input_field = document.getElementById('command-input')
  let index = 0;

  function type() {
    if (index < text.length) {
      input_field.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }

  type();
  setTimeout(press_enter, speed * text.length);
}

// Usage:
typeWriter('typing-text', 'about', 100);
console.log("We get here");
