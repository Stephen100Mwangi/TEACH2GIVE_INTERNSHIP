let listContainer = document.querySelector ('.container');

async function fetchData () {
  const response = await fetch ('https://jsonplaceholder.typicode.com/todos');
  console.log (response);

  const data = await response.json ();
  console.log (data);
  const slicedData = data.slice (0, 20);
  for (let i = 0; i < slicedData.length; i++) {
    const element = slicedData[i];
    const newList = document.createElement ('div');
    const uid = document.createElement ('div');
    const _id = document.createElement ('div');
    const title = document.createElement ('div');
    const completed = document.createElement ('div');

    uid.textContent = element.userId;
    _id.textContent = element.id;
    title.textContent = element.title;
    completed.textContent = element.completed ? 'True ✅' : 'False ❌';

    completed.textContent === 'True ✅'
      ? (completed.style.color = 'green')
      : (completed.style.color = 'red');

    newList.append (uid);
    newList.append (_id);
    newList.append (title);
    newList.append (completed);

    newList.classList.add ('itemContainer');

    listContainer.append (newList);
  }

  //   data.for
}

fetchData ();
