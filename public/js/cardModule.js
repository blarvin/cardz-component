function createCard(options = {}) {
  const parent = options.parentId;
  const card = makeCard(parent);

  if (options.resize) {
    addResizeHandles(card);
  }

  if (options.deleteBtn) {
    addDeleteButton(card);
  }

  if (options.drag) {
    makeDraggable(card);
  }

  //addToScreen(card);
  addToPage(card, parent);
}

function addToPage(card, parent) {
  const element = document.getElementById(parent);
  element.appendChild(card);
  console.log(`Card added to ${parent}.`);
}

let zIndex = 1;

function addZIndex() {
  return zIndex++; // Increment and return the new z-index value
}

function makeCard(parentId) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.zIndex = addZIndex();
  const parent = document.getElementById(parentId);
  const parentRect = parent.getBoundingClientRect();
  card.style.left = parentRect.x + 50 + "px";
  card.style.top = parentRect.y + 50 + "px";
  return card;
}

function addResizeHandles(card) {
  const corners = ["top-left", "top-right", "bottom-right", "bottom-left"];
  corners.forEach((corner) => {
    const resizeHandle = makeResizeHandle(corner);
    card.appendChild(resizeHandle);
    makeResizable(resizeHandle, card, corner);
  });
}

function makeResizeHandle(corner) {
  const resizeHandle = document.createElement("div");
  resizeHandle.className = `resize-handle ${corner}`;
  return resizeHandle;
}

function makeResizable(resizeHandle, card, corner) {
  resizeHandle.addEventListener("mousedown", function (e) {
    e.stopPropagation();
    card.style.zIndex = zIndex++;
    let isResizing = true;
    const cardRect = card.getBoundingClientRect();
    const resizeStartX = e.clientX;
    const resizeStartY = e.clientY;

    console.log(`Card resizing started at ${corner}.`);

    function resizeMove(e) {
      if (isResizing) {
        const currentX = e.clientX;
        const currentY = e.clientY;
        let newWidth, newHeight, newLeft, newTop;

        switch (corner) {
          case "top-left":
            newWidth = cardRect.right - currentX;
            newHeight = cardRect.bottom - currentY;
            newLeft = currentX;
            newTop = currentY;
            break;
          case "top-right":
            newWidth = currentX - cardRect.left;
            newHeight = cardRect.bottom - currentY;
            newLeft = cardRect.left;
            newTop = currentY;
            break;
          case "bottom-left":
            newWidth = cardRect.right - currentX;
            newHeight = currentY - cardRect.top;
            newLeft = currentX;
            newTop = cardRect.top;
            break;
          case "bottom-right":
            newWidth = currentX - cardRect.left;
            newHeight = currentY - cardRect.top;
            newLeft = cardRect.left;
            newTop = cardRect.top;
            break;
        }

        if (newWidth > 50 && newWidth < 700) {
          card.style.width = newWidth + "px";
          card.style.left = newLeft + "px";
        }
        if (newHeight > 50 && newHeight < 700) {
          card.style.height = newHeight + "px";
          card.style.top = newTop + "px";
        }

        e.preventDefault();
      }
    }

    // Resize end logic
    function resizeUp() {
      isResizing = false;
      document.removeEventListener("mousemove", resizeMove);
      document.removeEventListener("mouseup", resizeUp);
    }

    document.addEventListener("mousemove", resizeMove);
    document.addEventListener("mouseup", resizeUp);
  });
}

function addDeleteButton(card) {
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "x";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function () {
    console.log("Deleting card.");
    card.remove();
  };
  card.appendChild(deleteBtn);
}

function addToScreen(card) {
  document.body.appendChild(card);
  console.log("Card added to the screen.");
}

function makeDraggable(card) {
  let isDragging = false;
  let dragStartX, dragStartY;

  // Drag start logic
  card.addEventListener("mousedown", function (e) {
    e.stopPropagation();
    isDragging = true;
    dragStartX = e.clientX - card.offsetLeft;
    dragStartY = e.clientY - card.offsetTop;
    console.log("Card dragging started.");
  });

  // Dragging logic
  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      card.style.left = `${e.clientX - dragStartX}px`;
      card.style.top = `${e.clientY - dragStartY}px`;
    }
  });

  // Drag end logic
  document.addEventListener("mouseup", function (e) {
    if (isDragging) {
      isDragging = false;
    }
  });
}

export { createCard };
