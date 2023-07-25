import {
  createCard,
  handleCardDelete,
  handleCardEdit,
  handleCardClick,
} from "./card.js";

import { handleFormSubmit } from "./form.js";
// handle the form submission
destination_form.addEventListener("submit", handleFormSubmit);

// handle edit and delete functionalities
cards_container.addEventListener("click", handleCardClick);
