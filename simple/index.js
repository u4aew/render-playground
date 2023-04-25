(function () {
   let stateToDo = {
      items: []
   };

   const submit = document.querySelector('#submit');
   const input = document.querySelector('#title');
   const listContainer = document.querySelector('#list-container');

   const render = (state) => {
      listContainer.innerHTML = '';

      state.items.forEach(item => {
         const listItem = document.createElement('li');
         listItem.textContent = item;
         listContainer.appendChild(listItem);
      });
   };

   const addItem = (title) => {
      stateToDo.items.push(title);
      render(stateToDo);
   };

   submit.addEventListener('click', () => {
      if (input.value.trim()) {
         addItem(input.value.trim());
         input.value = '';
      }
   });
})();
