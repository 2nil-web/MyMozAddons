// CSS pour tout masquer sur la page sauf les éléments de la classe "beastify-image"
const hidePage = `body > :not(.beastify-image) { display: none; }`;

// En fonction du bouton envoie le message correspondant au script de la page
function listenForClicks() {
  document.addEventListener("click", (e) => {
    /* Selon le nom de la bête, on fournit l'URL vers l'image correspondante. */
    function beastNameToURL(beastName) {
      switch (beastName) {
        case "Grenouille":
          return browser.runtime.getURL("beasts/frog.jpg");
        case "Serpent":
          return browser.runtime.getURL("beasts/snake.jpg");
        case "Tortue":
          return browser.runtime.getURL("beasts/turtle.jpg");
      }
    }

    // Injecte le CSS qui masque le contenu de la page dans l'onglet actif puis récupère l'URL de la bête avant d'envoyer un message "beastify" au script de contenu dans l'onglet actif
    function beastify(tabs) {
      browser.tabs.insertCSS({ code: hidePage }).then(() => {
        let url = beastNameToURL(e.target.textContent);
        browser.tabs.sendMessage(tabs[0].id, {
          command: "beastify",
          beastURL: url,
        });
      });
    }

    // Retire le CSS qui masque le contenu de l'onglet actif et envoie un reset au script de contenu dans l'onglet actif
    function reset(tabs) {
      browser.tabs.removeCSS({ code: hidePage }).then(() => {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "reset",
        });
      });
    }

    // Affiche l'erreur dans la console
    function reportError(error) {
      console.error(`Beastify impossible : ${error}`);
    }

    // Nomme l'onglet actif "beastify()" ou "reset()" selon le cas
    if (e.target.classList.contains("beast")) {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(beastify)
        .catch(reportError);
    } else if (e.target.classList.contains("reset")) {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(reset)
        .catch(reportError);
    }
  });
}

// En cas d'erreur affiche le message d'erreur dans la popup et masque l'interface * utilisateur normale
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(
    `Erreur d'exécution du script de contenu beastify : ${error.message}`,
  );
}

// Injecte le script dans l'onglet actif au chargement du popup et ajoute le gestionnaire de clic, sinon gére l'erreur d'injection
browser.tabs
  .executeScript({ file: "/content_scripts/beastify.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);

