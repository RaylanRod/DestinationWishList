import { createCard, handleCardDelete, handleCardEdit } from "./card.js";
export function handleFormSubmit(e) {
  e.preventDefault();

  //   retrieve and store user input to use later
  const destinationName = destination_name.value;
  const locationName = location_name.value;

  // const photoUrl = photo_url.value;

  const locationDescription = location_description.value;

  // reset the user input form fields
  destination_form.reset();

  //   create dynamic card with user input
  const newC = createCard(destinationName, locationName, locationDescription);

  cards_container.appendChild(newC);
}
