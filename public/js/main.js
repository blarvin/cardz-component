import { createNewCardButton } from "./newCardButtonModule.js";

document.addEventListener("DOMContentLoaded", () => {
  const button = createNewCardButton();
  document.body.appendChild(button);
});
