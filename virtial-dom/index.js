(function () {
   let stateToDo = {
      items: []
   };

   const submit = document.querySelector('#submit');
   const input = document.querySelector('#title');
   const listContainer = document.querySelector('#list-container');

   const createVNode = (tagName, props, children) => {
      return {
         tagName,
         props,
         children
      };
   };

   const updateElement = (parent, newNode, oldNode, index = 0) => {
      if (!oldNode) {
         parent.appendChild(createElement(newNode));
      } else if (!newNode) {
         parent.removeChild(parent.childNodes[index]);
      } else if (isChanged(newNode, oldNode)) {
         parent.replaceChild(createElement(newNode), parent.childNodes[index]);
      } else if (newNode.tagName) {
         const newLength = newNode.children.length;
         const oldLength = oldNode.children.length;

         for (let i = 0; i < newLength || i < oldLength; i++) {
            updateElement(parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
         }
      }
   };

   const isChanged = (node1, node2) => {
      return typeof node1 !== typeof node2 ||
          typeof node1 === 'string' && node1 !== node2 ||
          node1.tagName !== node2.tagName;
   };

   const createElement = (node) => {
      if (typeof node === 'string') {
         return document.createTextNode(node);
      }

      const el = document.createElement(node.tagName);
      node.children.map(createElement).forEach(el.appendChild.bind(el));

      return el;
   };

   const render = (state) => {
      const newList = createVNode('ul', {}, state.items.map(item => createVNode('li', {}, [item])));
      updateElement(listContainer, newList, listContainer.childNodes[0]);
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
