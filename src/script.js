var supported_commands = {
  "echo": command_echo,
  "clear": command_clear,
  "help": command_help,
  "tree": command_tree,
  "about": command_about,
}

var displayed_projects = {
  "couple-crows": "https://github.com/Roeliefantje/couple-crows"
}

var socials = {
  "github": "https://github.com/Roeliefantje",
  "itch io": "https://roeliefantje.itch.io/",
  "linkedin": "https://www.linkedin.com/in/roel-de-jeu-82217b207/",
}

var input_field = document.getElementById('command-input')

document.addEventListener("keydown", function (event) {
    // The parameter event is of the type KeyboardEvent
  	handle_input(event);
});

var recent_commands = []
var back_index = 0

function press_enter() {
    
    var input = input_field.textContent.split(" ")
    var command = input[0]
    var args = input.slice(1)
    recent_commands.push(input_field.textContent)
    input_field.textContent = ""
    back_index = 0
    

    handle_command(command, args)
}

function handle_input(event) {
  console.log(event)
  if (event.key === 'Enter') {
    press_enter()
  } else if (event.key === 'Backspace') {
    input_field.textContent = input_field.textContent.slice(0, -1)
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    back_index--;
    if (recent_commands.length < Math.abs(back_index)){
      back_index = (recent_commands.length - 1) * -1
    }  
    input_field.textContent = recent_commands[recent_commands.length + back_index]
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    back_index++;
    if (back_index >= 0){
      back_index = 0
      input_field.textContent = ""
    } else {
      input_field.textContent = recent_commands[recent_commands.length + back_index]
    }
  } else if (event.key === 'Shift' || event.key === 'Control' || event.key === 'Tab'){
    //nothing for now
  } else {
    input_field.textContent = input_field.textContent + event.key
  }
}

function handle_command(command, args) {
  //Display old command above
  command_echo(["roeliefantje $", command].concat(args))
  console.log(command)
  if (supported_commands.hasOwnProperty(command)) {
    supported_commands[command](args)
  } else {
    command_echo([command, "is not recognized as a command, type help to see what commands are available"])
  }
  
  //Scroll to the bottom of the page
  // document.getElementById('content').scrollTop = document.getElementById('content').scrollHeight
  console.log("scrolling")
  window.scroll(0, Number.MAX_SAFE_INTEGER)

}

function command_echo(args) {
  let element = document.createElement("div")
  element.innerHTML = args.join(" ")
  document.getElementById('content').appendChild(element)
}

function command_clear(_args) {
  let content = document.getElementById('content')
  while (content.firstChild) {
    content.removeChild(content.firstChild)
  }
}

function command_about(dir){
  command_echo(["Welcome to my website!<br/>",
                "I am Roel de Jeu, I'm primarily interested in game related development but I am also interested in software development in general.</br>",
                " Some specific fields that interest me at the moment are:</br>",
                "- Game Development</br>",
                "- Graphics programming</br>",
                "- Godot Game Engine</br>",
                "- Rust & Bevy</br>",
                "- Modding Minecraft</br>",
                "You can find my projects and socials using the tree command!",
                "Other commands can be found using the help command"
               ]);
              
}

function command_tree(dir) {
  if (dir.length == 0){
    command_echo(["├─── projects<br/>"])
    print_projects(1)
    command_echo(["├─── socials<br/>"])
    print_socials(1)
  } else {
    console.log(dir.length)
  }
}

function print_projects(depth) {
  for (var key in displayed_projects) {
    var to_print = []
    if (depth === 0) {
      to_print.push("|")
    } else if (depth===1) {
      to_print.push("│&nbsp&nbsp&nbsp&nbsp├───")
    }
    to_print.push(`<a href=${displayed_projects[key]} target="_blank">${key}</a></br>`)
    command_echo(to_print)
  }
}

function print_socials(depth) {
  for (var key in socials) {
    var to_print = []
    if (depth === 0) {
      to_print.push("|")
    } else if (depth===1) {
      to_print.push("│&nbsp&nbsp&nbsp&nbsp├───")
    }
    to_print.push(`<a href=${socials[key]} target="_blank">${key}</a></br>`)
    command_echo(to_print)
  }
}

function command_help(args) {
  command_echo(["about: Some information about me and this website <br/>",
                "tree: A link tree of projects and socials<br/>",
                "help: This Command <br/>",
                "clear: Clear Terminal<br/>",
                "echo: Print arg<br/>"])
}



var speed = 400;
var cursor = document.getElementById('cursor-input')
setInterval(() => {
  cursor.style.visibility = cursor.style.visibility === 'hidden' ? '' : 'hidden'
}, speed)
