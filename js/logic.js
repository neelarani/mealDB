const searchMealByName = async () => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=a`
  );
  const getData = await response.json();

  const thambnails = document.getElementById('thambnail');
  thambnails.innerHTML = '';
  getData.meals.forEach(meal => {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="flex gap-4">
    <img class="w-[250px] h-[250px] rounded-lg object-cover" src="${meal.strMealThumb}"/>
    <div class="space-y-3">
      <h2 class="text-lg  font-bold">${meal.strMeal}</h2>
      <p class="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, fugiat! Commodi exercitationem error  qui  beatae. Nobis nam saepe reprehenderit ratione.</p>
    <a onclick="modalContent('${meal.strCategory}','${meal.strArea}', '${meal.strInstructions}', '${meal.strYoutube}')" class="underline text-bgButton font-medium" href="#">View Details</a>
      </div>
    </div>
    `;
    thambnails.appendChild(div);
  });
};

const modalContent = (category, area, process, channel) => {
  const modal = document.getElementById('my_modal_1');
  modal.querySelector('.modal-box').innerHTML = `
            <h3 class="text-lg font-bold">Category: ${category}</h3>
              <p class="py-4">Area: ${area}</p>
                <p class="py-4">Instructions: ${process}</p>
                <p class="py-4 text-sm">
              <a href="${channel}" target="_blank">Youtube: ${channel}</a>
                </p>
            <div class="modal-action">
              <form method="dialog">
                <button class="px-8 py-4 text-white bg-red-500">Close</button>
              </form>
            </div>
  `;
  modal.showModal();
};
searchMealByName();
