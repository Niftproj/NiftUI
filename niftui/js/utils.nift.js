// Object.defineProperty(String.prototype, 'capitalize', {
//     value: function() {
//       return this.charAt(0).toUpperCase() + this.slice(1);
//     },
//     enumerable: false
//   });


const getCurrentRoute = () => {
    return window.location.pathname;
}

const Component = {
  "NIFTBLOCK": "NiftBlock",
  "NIFTTEXT": "NiftText",
  "CUSTOMCOMPONENT": "CustomComponent"
}

function GetDictionaryName(raw) {
  return Component[raw];
}

const DOMEngine = new DOMParser();

// FOR GENERIC INTERFACE
const GetDOMObjectFromString = (string) => {
  return DOMEngine.parseFromString(string, "text/html").all[3];
}

function NiftErrorHandler(errorText) {
  
    let NiftErrorPage = document.createElement("div");
    NiftErrorPage.setAttribute("id", "niftErrorBody");

    let NiftLogo = document.createElement("img");
    NiftLogo.setAttribute("id", "niftErrorLogo");
    NiftLogo.setAttribute("src", "https://niftproj.github.io/NiftUI/docs/assets/brand.svg");

    let NiftErrorText = document.createElement("p");
    NiftErrorText.setAttribute("id", "niftErrorText");
    NiftErrorText.innerHTML = errorText;

    NiftErrorPage.appendChild(NiftLogo);
    NiftErrorPage.appendChild(NiftErrorText);

    document.body.appendChild(NiftErrorPage);

    console.error(errorText);

    return false;
}