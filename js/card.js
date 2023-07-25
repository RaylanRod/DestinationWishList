import { handleFormSubmit } from "./form.js";

export function createCard(destName, locName, locDesc) {
  const newCard = document.createElement("div");
  newCard.classList.add("card", "dest_card");
  newCard.style.width = "18rem";

  const newImage = document.createElement("img");
  newImage.classList.add("card-img-to", "dest_img");
  newImage.alt = destName;
  newImage.src =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F1514097%2Fscreenshots%2F3457456%2Floading_animation.gif&f=1&nofb=1&ipt=6f174198bfc486735def0fa3041e963111bfc2b58e527dfe21854d3f2740aa85&ipo=images";
  newCard.appendChild(newImage);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title", "dest_name");
  cardTitle.textContent = destName;
  cardBody.appendChild(cardTitle);

  const cardLocation = document.createElement("p");
  cardLocation.classList.add("card-text", "dest_loc");
  cardLocation.textContent = locName;
  cardBody.appendChild(cardLocation);

  if (locDesc.length !== 0) {
    const cardDescription = document.createElement("p");
    cardDescription.classList.add("card-text", "dest_desc");
    cardDescription.textContent = locDesc;
    cardBody.appendChild(cardDescription);
  }

  const editBtn = document.createElement("a");
  editBtn.classList.add("btn", "btn-warning", "edit_btn");
  editBtn.textContent = "Edit";
  cardBody.appendChild(editBtn);

  const deleteBtn = document.createElement("a");
  deleteBtn.classList.add("btn", "btn-danger", "delete_btn");
  deleteBtn.textContent = "Delete";
  cardBody.appendChild(deleteBtn);

  newCard.appendChild(cardBody);

  getCardDynamicPhoto(destName, locName, newCard);

  return newCard;
}

function getCardDynamicPhoto(destName, locName, cardElt) {
  const unsplash = `https://api.unsplash.com/search/photos?query=${destName} ${locName}&client_id=H-vphUYApRoRp5drKE9CLEBf7JDBNDw8UqQqMYmytL0`;

  fetch(unsplash)
    .then((res) => res.json())
    .then((data) => {
      const photos = data.results;
      const randIndex = Math.floor(Math.random() * photos.length);
      const randomPhoto = photos[randIndex];
      const randPhotoUrl = randomPhoto.urls.small;

      cardElt.querySelector(".dest_img").setAttribute("src", randPhotoUrl);
    })
    .catch((error) => {
      console.log(error);
    });
}

// newCard.innerHTML += `
//   <img class="card-img-top dest_img" alt="${destName}">
//   <div class="card-body">
//     <h5 class="card-title dest_name">${destName}</h5>
//     <p class="card-text dest_loc">${locName}</p>
//     ${
//       locDesc.length === 0
//         ? ""
//         : `<p class="card-text dest_desc">${locDesc}</p>`
//     }
//     <a class="btn btn-warning edit_btn">Edit</a>
//     <a class="btn btn-danger delete_btn">Delete</a>
//   </div>
// `;

// try {
//   const response = await fetch(unsplash);
//   const data = await response.json();
//   const photos = data.results;
//   const randIndex = Math.floor(Math.random() * photos.length);
//   const randomPhoto = photos[randIndex];
//   const randPhotoUrl = randomPhoto.urls.small;
//   const placeholderUrl =
//     "https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg";
//   newImage.src = randPhotoUrl || placeholderUrl;
// } catch (error) {
//   console.log(error);
// }

export function handleCardEdit(evt) {
  let hasDestChanged = false;
  let hasLocationChanged = false;
  const destinationName = prompt("Enter new destination name");
  if (destinationName !== null && destinationName.length > 0) {
    const destNameElement = evt.target
      .closest(".dest_card")
      .querySelector(".dest_name");
    hasDestChanged = true;
    if (destNameElement) {
      destNameElement.textContent = destinationName;
    }
  }

  const locationName = prompt("Enter new location name");
  if (locationName !== null && locationName.length > 0) {
    const locNameElement = evt.target
      .closest(".dest_card")
      .querySelector(".dest_loc");
    hasLocationChanged = true;
    if (locNameElement) {
      locNameElement.textContent = locationName;
    }
  }
  if (hasDestChanged && hasLocationChanged) {
    const desName = evt.target
      .closest(".dest_card")
      .querySelector(".dest_name").textContent;
    const locName = evt.target
      .closest(".dest_card")
      .querySelector(".dest_loc").textContent;
    const cardElt = evt.target.closest(".dest_card");
    getCardDynamicPhoto(desName, locName, cardElt);
  }

  const locationDescription = prompt("Enter new description");
  if (locationDescription !== null && locationDescription.length > 0) {
    const descElt = evt.target
      .closest(".dest_card")
      .querySelector(".dest_desc");
    if (descElt) {
      descElt.textContent = locationDescription;
    } else {
      const newDescElt = document.createElement("p");
      newDescElt.classList.add("card-text", "dest_desc");
      newDescElt.textContent = locationDescription;
      const cardBody = evt.target.closest(".card-body");
      const editBtn = evt.target
        .closest(".card-body")
        .querySelector(".edit_btn");
      cardBody.insertBefore(newDescElt, editBtn);
    }
  }
}

export function handleCardDelete(evt) {
  evt.target.closest(".dest_card").remove();
}

export function handleCardClick(e) {
  e.target.classList.contains("edit_btn")
    ? handleCardEdit(e)
    : e.target.classList.contains("delete_btn")
    ? handleCardDelete(e)
    : "";
}
