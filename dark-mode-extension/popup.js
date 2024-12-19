// Event listener for the button click.
document.getElementById("toggle-dark-mode").addEventListener("click", async () => {
    // Access the current tab.
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    // Push a script into the current tab to toggle dark mode.
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: toggleDarkMode
    });
  });
  
  // Function for dark mode.
  function toggleDarkMode() {
    const existingStyle = document.getElementById("dark-mode-style");
    
    if (existingStyle) {
      // If dark mode is already applied, remove it.
      existingStyle.remove();
    } else {
      // Apply dark mode by pushing CSS.
      const style = document.createElement("style");
      style.id = "dark-mode-style";
      style.textContent = `
        html {
          filter: invert(1) hue-rotate(180deg);
          background-color: #121212 !important;
        }
        img, video {
          filter: invert(1) hue-rotate(180deg);
        }
      `;
      document.head.appendChild(style);
    }
  }
  