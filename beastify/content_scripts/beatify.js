(function () {
  // Variable globale pour n'activer le script qu'une fois sur la page.
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  // Pour l'URL requise, retire les bêtes déjà ajoutées, crée un élément qui pointe vers l'image indiquée et l'insère
  function insertBeast(beastURL) {
    removeExistingBeasts();
    let beastImage = document.createElement("img");
    beastImage.setAttribute("src", beastURL);
    beastImage.style.height = "100vh";
    beastImage.className = "beastify-image";
    document.body.appendChild(beastImage);
  }

  // Retire toute bête présente sur la page
  function removeExistingBeasts() {
    let existingBeasts = document.querySelectorAll(".beastify-image");
    for (let beast of existingBeasts) {
      beast.remove();
    }
  }

  // Ecoute les messages du script d'arrière-plan pour déclencher "insertBeast()" ou "removeExistingBeasts()".
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "beastify") {
      insertBeast(message.beastURL);
    } else if (message.command === "reset") {
      removeExistingBeasts();
    }
  });
})();

