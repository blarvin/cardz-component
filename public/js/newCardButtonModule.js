// newCardButtonModule.js
import { createCard } from "./cardModule.js";

function createNewCardButton() {
  const newCardButton = document.createElement("button");
  newCardButton.textContent = "New Card";

  newCardButton.addEventListener("click", () => {
    try {
      createCard({
        resize: true,
        deleteBtn: true,
        drag: true,
      });
    } catch (error) {
      console.error("Error adding a card:", error.message, error.stack);
    }
  });

  return newCardButton;
}

export { createNewCardButton };
