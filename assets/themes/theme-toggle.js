const theme_list = ['light', 'dark', 'princess'];

const buttons = {
                  'light': light_button = document.createElement("button"),
                  'dark': dark_button = document.createElement("button"),
                  'princess': princess_button = document.createElement("button")
                }

for(let themeName in buttons) {
  if(buttons.hasOwnProperty(themeName)){
    let button = buttons[themeName];
    button.textContent = themeName + " theme";
    button.id = "theme-" + themeName;
    button.onclick = () => setTheme(themeName);
    document.getElementById('theme-buttons').appendChild(button);
  }
}

function applySavedTheme() {
  const savedTheme = sessionStorage.getItem('theme');

  if (savedTheme) {
      setTheme(savedTheme)
  } else {
      document.getElementById('theme-link').setAttribute('href', '/blog/assets/themes/theme-light.css');
  }
}

function setTheme(themeName) {
  sessionStorage.clear();
  sessionStorage.setItem('theme', themeName);

  document.getElementById('theme-link').setAttribute('href', '/blog/assets/themes/theme-' +
  themeName + '.css');
}


window.onload = applySavedTheme();






