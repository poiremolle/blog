const theme_list = ['light', 'dark', 'princess'];

const buttons = {
                  'light': light_button = document.createElement("button"),
                  'dark': dark_button = document.createElement("button"),
                  'princess': princess_button = document.createElement("button")
                }

function setTheme(themeName) {
  console.log("I ran setTheme for: " + themeName);
      document.getElementById('theme-link').setAttribute('href', 'assets/themes/theme-' +
  themeName + '.css');
}

for(let themeName in buttons) {
  if(buttons.hasOwnProperty(themeName)){
    let button = buttons[themeName];
    button.textContent = themeName + " theme";
    button.id = "theme-" + themeName;
    button.onclick = () => setTheme(themeName);
    document.getElementById('top-nav').appendChild(button);
  }
}

console.log("I ran theme-toggle")

