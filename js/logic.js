// spinner show
const loadAllMeals = async mealName => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${
      mealName ? mealName : ''
    }`
  );
  const getData = await response.json();

  if (getData.meals) {
    displayAllMeals(getData.meals);
  } else if (getData.meals) {
    displayAllMeals('');
  } else {
    alert('Not Available');
  }
  document.getElementById('spinner').style.display = 'none';
};
// display all meals
const displayAllMeals = meals => {
  const mealContainer = document.getElementById('meal-container');
  mealContainer.innerHTML = ``;
  meals.forEach(meal => {
    const { strMealThumb: image, strMeal: title, idMeal } = meal;
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="flex gap-4">
    <img
      class="w-[250px] h-[250px] rounded-lg object-cover"
      src="${image}"
    />
    <div class="space-y-3">
      <h2 class="text-lg  font-bold">${title}</h2>
      <p class="text-sm">Desserts add a sweet end to meals. Favorites include chocolate cake, pudding, ice cream, and Bengali sweets like rasgulla. They bring joy and a satisfying finish.</p>
      <a onclick="mealDetails('${idMeal}'); event.preventDefault() "  
        class="underline text-bgButton font-medium"
        href="#"
      >
        View Details
      </a>
    </div>
  </div>
    `;
    mealContainer.appendChild(div);
  });
};

const handleSearch = () => {
  document.getElementById('spinner').style.display = 'block';
  const searchText = document.getElementById('search-box').value;

  setTimeout(() => {
    loadAllMeals(searchText);
  }, 3000);
};

// Meals Details
const mealDetails = async id => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const getData = await response.json();
  const {
    strMealThumb: image,
    strCategory: category,
    strArea: area,
    strYoutube: channel,
  } = getData.meals[0];

  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = `
  <dialog id="my_modal_1" class="modal">
          <div class="modal-box">
            <img
              class="w-full h-[250px] rounded-lg object-cover"
              src="${image}"
              />
            <h3 class="text-lg font-bold">Category: ${category}</h3>
            <p class="py-4">Area: ${area}</p>
            <p class="text-sm">
            <a href="${channel}" target="_blank">Youtube: ${channel}</a>
            </p>
            <div class="modal-action">
              <form method="dialog">
                <button class="btn bg-red-500">Close</button>
              </form>
            </div>
          </div>
        </dialog>
  `;

  my_modal_1.showModal();
};

loadAllMeals('');
