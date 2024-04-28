import { createNewCardButton } from "./newCardButtonModule.js";

document.addEventListener("DOMContentLoaded", () => {
  const button = createNewCardButton();
  document.body.appendChild(button);
  const container = document.createElement("div");
  container.id = "cards-container";
  document.body.appendChild(container);
});
