let itemsList = document.querySelector('.actionItems');
let addItemForm = document.querySelector('#addItemForm');
let storage = chrome.storage.sync;

const setUsersName = (savedName) => {
  let name = savedName ? savedName : "Add Name";
  document.querySelector('.name__value').innerText = name;
}

storage.get(['actionItems', 'name'], (data)=>{
  let actionItems = data.actionItems;
  setUsersName(data.name);
  setGreeting();
  setGreetingImage();
  renderActionItems(actionItems)
  ActionItems.setProgress();
  createQuickActionListener();
  createUpdateNameListener();
  createUpdateNameDialogListener();
  chrome.storage.onChanged.addListener(()=>{
    ActionItems.setProgress();
  })
})

const renderActionItems = (actionItems) => {
  sortedActionItems = sortFilterActionItems(actionItems);
  sortedActionItems.forEach((doc)=>{
      renderActionItem(doc);
  });
  storage.set({
    actionItems: sortedActionItems
  })
}

const sortFilterActionItems = (actionItems) => {
  var currentDate = new Date(); // Datetime now
  currentDate.setHours(0, 0, 0, 0); // Midnight today 00:00:00.000
  const filteredItems = actionItems.filter((item)=>{
    if(item.completed){
      const completedDate = new Date(item.completed);
      if(completedDate < currentDate){
        return false;
      }
    }
    return true;
  })
  const sortedItems = filteredItems.sort((a, b) => {
    const bDate = new Date(b.added);
    const aDate = new Date(a.added);
    return aDate - bDate;
  })
  return sortedItems;
}

const handleQuickActionListener = (e) => {
  const text = e.target.getAttribute('data-text');
  const id = e.target.getAttribute('data-id');
  getCurrentTab().then((tab)=>{
    ActionItems.addQuickActionItem(id, text, tab, renderActionItem)
  })
}

async function getCurrentTab() {
  return await new Promise((resolve, reject)=>{
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
      function(tabs){
        resolve(tabs[0]);
      }
    );
  })
}

const createUpdateNameDialogListener = () => {
  let greetingName = document.querySelector('.greeting__name');
  let currentName = document.querySelector('.name__value').innerText;
  greetingName.addEventListener('click', ()=>{
    document.getElementById('input__name').value  = currentName;
    $('#updateNameModal').modal('show');
  })
}

const createQuickActionListener = () => {
  let quickActionButtons = document.querySelectorAll('.quick-action');
  quickActionButtons.forEach((quickActionButton)=>{
    quickActionButton.addEventListener('click', handleQuickActionListener);
  })
}

addItemForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  let actionText = addItemForm.itemText.value;
  if(actionText){
    let actionItem = {
      id: uuidv4(),
      added: new Date().toString(),
      completed: null,
      text: addItemForm.itemText.value,
      website: null
    }
    ActionItems.add(actionItem, ()=>{
      renderActionItem(actionItem, 250);
    })
    addItemForm.itemText.value = '';
  }
})

const handleCompletedEventListener = (e) => {
  const id = e.target.parentElement.parentElement.getAttribute('data-id');
  const parent = e.target.parentElement.parentElement;
  if(parent.classList.contains('completed')){
    ActionItems.markUnmarkCompleted(id, null);
    parent.classList.remove('completed');
  } else {
    ActionItems.markUnmarkCompleted(id, new Date().toString());
    parent.classList.add('completed');
  }
} 

const handleDeleteEventListener = (e) => {
  const id = e.target.parentElement.parentElement.getAttribute('data-id');
  let jElement = $(`div[data-id="${id}"]`);
  ActionItems.remove(id, () => {
    animateUp(jElement);
  });
}

const createUpdateNameListener = () => {
  const element = document.querySelector('#update-name');
  element.addEventListener('click', handleUpdateName)
}

const handleUpdateName = () => {
  const name = document.getElementById('input__name').value;
  if(name){
    ActionItems.saveName(name, ()=>{
        setUsersName(name);
    });
    $('#updateNameModal').modal('hide');
  }
}

const renderActionItem = (item, animateDuration=500) => {
    let element = document.createElement('div');
    let mainElement = document.createElement('div');
    let deleteEl = document.createElement('div');
    let checkEl = document.createElement('div');
    let textEl = document.createElement('div');
    mainElement.classList.add('actionItem__main');
    element.classList.add('actionItem__item');
    deleteEl.classList.add('actionItem__delete');
    checkEl.classList.add('actionItem__check');
    textEl.classList.add('actionItem__text');
    if(item.completed){
      element.classList.add('completed');
    }
    checkEl.addEventListener('click', handleCompletedEventListener);
    element.setAttribute('data-id', item.id );
    deleteEl.innerHTML = `<i class="fas fa-times"></i>`;
    checkEl.innerHTML = ` 
      <div class="actionItem__checkBox">
        <i class="fas fa-check"></i>
      </div>`
    deleteEl.addEventListener('click', handleDeleteEventListener);
    textEl.textContent = item.text;
    mainElement.appendChild(checkEl);
    mainElement.appendChild(textEl);
    mainElement.appendChild(deleteEl);
    element.appendChild(mainElement)
    if(item.website) {
      const link = createLinkContainer(item.website.url, item.website['fav_icon'], item.website.title);
      element.appendChild(link);
    }
    itemsList.prepend(element);
    let jElement = $(`div[data-id="${item.id}"]`);
    animateDown(jElement, animateDuration);
}

const animateUp = (element) => {
  let height = element.innerHeight();
  element.animate({
    opacity: '0',
    marginTop: `-${height}px`}
  , {
    duration: 250,
    done: ()=>{
      element.remove();
    }
  });
}

const animateDown = (element, duration) => {
  let height = element.innerHeight();
  element.css({ marginTop: `-${height}px`, opacity: 0 }).animate({
    opacity: '1',
    marginTop: `12px`}
  , {
    duration: duration
  });
}

const createLinkContainer = (url, favIcon, title) => {
  let element = document.createElement('div');
  element.classList.add('actionItem__linkContainer');
  element.innerHTML = `              
    <a href="${url}" target="_blank">
      <div class="actionItem__link">
        <div class="actionItem__favIcon">
          <img src="${favIcon}">
        </div>
        <div class="actionItem__title">
          <span>${title}</span>
        </div>
      </div>
    </a>`
    return element;
}

const setGreetingImage = () => {
  const image = document.getElementById('greeting__image');
  const date = new Date();
  const hours = date.getHours();
  if(hours >= 5 && hours <= 11){
    image.src = './images/good-morning.png';
  } else if(hours >= 12 && hours <= 16){
    image.src = './images/good-afternoon.png';
  } else if(hours >= 17 && hours <= 20){
    image.src = './images/good-evening.png';
  } else {
    image.src = './images/good-night.png';
  }
}

const setGreeting = () => {
  let greeting = "Good ";
  const date = new Date();
  const hours = date.getHours();
  if(hours >= 5 && hours <= 11){
    greeting += "Morning,";
  } else if(hours >= 12 && hours <= 16){
    greeting += "Afternoon,";
  } else if(hours >= 17 && hours <= 20){
    greeting += "Evening,";
  } else {
    greeting += "Night,";
  }
  document.querySelector('.greeting__type').innerText = greeting;
}
