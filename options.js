function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    hussiecomment: document.querySelector("#hussiecomment").checked,
    autoopenchat: document.querySelector("#autoopenchat").checked,
  });
}

function restoreOptions() {

  async function setCurrentChoice(result) {
    var resultWithDefaults = {
      hussiecomment: result.hussiecomment,
      autoopenchat: result.autoopenchat,
    };
    var shouldSetDefaults = false;
    if (resultWithDefaults.hussiecomment === undefined) {
      resultWithDefaults.hussiecomment = true;
      shouldSetDefaults = true;
    }
    if (resultWithDefaults.autoopenchat === undefined) {
      resultWithDefaults.autoopenchat = false;
      shouldSetDefaults = true;
    }
    if (shouldSetDefaults) {
      await browser.storage.local.set(resultWithDefaults);
    }
    document.querySelector("#hussiecomment").checked = resultWithDefaults.hussiecomment;
    document.querySelector("#autoopenchat").checked = resultWithDefaults.autoopenchat;
  }

  function onError(error) {
    console.log('[HOMESTUCK COMPANION] Error saving options: ${error}');
  }

  //We attempt to get the boolean values from storage
  browser.storage.local.get(["hussiecomment", "autoopenchat"]).then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
