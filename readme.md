# TODOS

## TODO(TOGETHER): Set up the Chrome Extension App

## TODO(TOGETHER): Set up the basic strucrure of the app

#### TODO: Create a structure for action item within action-items class

#### HINTS:

- Create a div with a class `actionItem__item` 
- Duplicate it a few times

## TODO: Create HTML and Style for the header

#### HTML/CSS Structure:

```
.greeting
    h2 .greeting__type
    h2 .greeting__name
    img #greeting__image
```

#### HINTS:
- Use the `good-morning.png` image

## TODO(TOGETHER): Add circular progress 

## TODO: Create HTML and Style for Input 

#### HTML/CSS Structure:

```
.actionInput
    h5 .actionInput__text
    .actionInput__inputContainer
        form #addItemForm
            .input-group .input-group-lg
                input .form-control

```

#### HINTS:
- You have to target classes like `input::placeholder` and `input:focus` to rewrite default bootstrap styling
- You can use **Google** to figure out HOW

## TODO: Create HTML and Style for Quick Action Buttons

#### HINTS:
- You have to overwrite bootstrap classes like `.btn-outline-dark` & `.btn-outline-dark:focus` & `.btn-outline-dark:hover` 
- Use a class `actionInput__suggestions` for the parent container of the buttons inside `.actionInput__inputContainer`
- Use buttons from [here](https://getbootstrap.com/docs/4.0/components/buttons/)

## TODO: Create HTML and Style for Action Items

#### HTML Structure:

```
<div class="actionItem__item" >
   <div class="actionItem__main">
      <div class="actionItem__check">
         <div class="actionItem__checkBox">
            <i class="fas fa-check" aria-hidden="true"></i>
         </div>
      </div>
      <div class="actionItem__text">Start on Module 2</div>
      <div class="actionItem__delete"><i class="fas fa-times" aria-hidden="true"></i></div>
   </div>
</div>
```

#### HINTS:
- You need to import `fontawesome.js` that is saved in `packages` folder

## TODO(TOGETHER): Connect the Input to add Action Item to the front end 
- Handle form submission
- Create `renderActionItem()` function
- Add action item html to the action items list with class `.actionItems`

## TODO: Save the Action Item data in a database

#### HINTS:
- Save the data in Chrome Sync
- Create `add()` function
- Add storge permission to `manifest.json`
- Make sure to reload your chrome extension for `manifest.json` to take effect
- You need to grab the list of action items first and then append the new item

## TODO: Display the list of Action Items from the database

#### HINTS:

- Get all `actionItems` from Chrome Storage
- Create `renderActionItems()` function
- Loop through each action item and render it

## TODO(TOGETHER): Clean up the styling

- Clean up spacing and borders

## TODO: Create HTML and Style of the completed action item

#### HINTS:
- Set the background color of `.actionItem__item` to `#b0f1ab`
- Set the checkbox color to `#56e452`
- Add `.completed` class to action item 

## TODO(TOGETHER): Add the ability to mark item completed

- Create an event listener on the checkmark element
- Add a class `.completed` to the clicked element
- Create a `markUnmarkCompleted()` function to set the item completed in chrome storage
- Create a unique id for each element with `uuidv4`
- Add the ability to unmark it completed as well

## TODO: Add the ability to uncheck a completed item

#### HINTS:

- Check if the classlist contains `.completed` class
- If yes then we need to remove the `.completed` class and set it null in Chrome Storage
- If no then we need to add `.completed` class and set it in Chrome Storage
- Set the current date as completed value

## TODO: Udpate items progress in progressbar

#### HINTS:
- Create a `setProgress()` function
- Calculate the percentage of completed items over total items `completedItems/totalItems`
- Use `circle.animate` to update the progress bar

## TODO(TOGETHER): Clean up functions and create an ActionItem Class
- Move the `add()` function
- Move the `markUnmarkCompleted()` function
- Move the `setProgress()` function
- Move the `circle` function to it's own file

## TODO: Add the ability to delete action items

#### HINTS:
- Add an event listener to `.actionItem__delete`
- Create a `handleDeleteEventListener()` function
- Create a `remove()` function to remove the item from Chrome Storage
- On hover of the `X` button, chane the color to `#D00000`

## TODO: Add the ability to add Quick Action items

#### HINTS:
- Create an event listener for quick action buttons with a `createQuickActionListener()` function
- Create an event handler `handleQuickActionListener()` function 
- Add `data-text` attribute to every button as text that will be used for the action item
- Use the `add()`

## TODO: Capture the link of the site from the curent tab in Chrome

#### HINTS:
- Create a `getCurrentTab()` function to get active tab
- Use `chrome.tabs.query` to grab tab data
- Create a `addQuickActionItem()` function in `action-items-utils.js` to add website data to action item
- Structure website data like so
```
website = {
    url: tab.url,
    fav_icon: tab.favIconUrl,
    title: tab.title
}
```
- Make sure to add website data only if `Link site for later` is clicked

## TODO(TOGETHER): Create HTML and Style for "Link site for later"

- Create a `createLinkContainer()` function

#### HTML Structure
```
.actionItem__linkContainer
    a
        .actionItem__link
            .actionItem__favIcon
                img
            .actionItem__title
                span
```

## TODO: Show the Link on click of "Link site for later"

#### HINTS:
- Create a `createLinkContainer()` function
- Use `document.createElement` to create the link from our HTML
- Append the link element to action item in `renderActionItem()` function
- Make sure to check if webiste data exists

## TODO: Create the Update Name modal

#### HINTS:
- Use the Bootstrap modal from [here](https://getbootstrap.com/docs/4.0/components/modal/)
- Create click listener on the `.greeting__name`
- Open dialog on click of the name text
- Use the `modal-dialog-centered`

## TODO: Finish styling for greeting name

#### HINTS:
- Add a pencil icon next to greeting name `fas fa-pen` within `.greeting__name`
- Add a `.name__value` class within `.greeting__name` class that will contain the name value
- Show the pencil icon only on hover of `.greeting__name`
- Font size for pencil icon is `font-size: 0.8em;`

## TODO: Save the name from modal input

#### HINTS:
- Create a `createUpdateNameListener()` for when `Save Changes` is clicked
- Create a `handleUpdateName()` for retrieving the new name from input
- Create a `saveName()` function to save name in Chrome Storage
- Create a `setUsersName()` function to change the name text in `.name__value`
- Remember to set the user's name when when opening Chrome Extension

## TODO: Set the greeting depending on time of day

#### HINTS:
- Create a `setGreeting()` function
- Set the text in HTML using JavaScript
- Time: 5 - 11 -> Good Morning
- Time: 12 - 16 -> Good Afternoon
- Time: 17 - 20 -> Good Evening
- Time: 20 - 5 -> Good Night

## TODO: Set the greeting image based on time of day

#### HINTS:
- Create a `setGreetingImage()` function
- Set image based on type of the day

## TODO: Add a browser badge to show number of action items

#### HINTS:
- Create a `setBrowserBadge()` function
- Figure out how to set the badge in chrome
- Call the `setBrowserBadge()` when setting the progress

## TODO: Create a right click context menu for adding an action item

#### HINTS:
- Create a `background.js` file
- Add a context menu with the id `linkSiteMenu`
- Capture the Context Menu click using `contextMenus.onClicked.addListener`
- Add the quick action item
- Make sure to update the badge after adding the item

## TODO: Filter old completed action items 

#### HINTS:
- Create a `filterActionItems()` function
- Use the `.filter()` funcion
- Filter out completed items before today `completedDate < currentDate`
- Current date is today midnight
- Make sure to filter action items before rendering them

## TODO(TOGETHER): Clean up

- Set progrss to `0` if there are 0 completed items
- Add transition for `checkmark`
- Fix link styling on completion of action item
- Provide padding for the update name modal
- Make sure progress bar works with 0 completed items

## TODO: Initialize action items on installation of the extension

#### HINTS
- Add functionality inside `background.js`
- Use `chrome.runtime.onInstalled` function
- Set action items in Chrome Storage to `[]`

## TODO(TOGETHER): Add an EPIC animation for when adding a new action item
- Create an `animateDown()` function 
- Animate from `opacity: 0` to `opacity: 1`
- Animate the full height of element
- Call the funcation after rendering it

## TODO: Add an EPIC animation for when deleting an action item

#### HINTS:
- Create an `animateUp()` function where we will animate the action item when deleting it
- Use the jQuery animate function
- Animate from `opacity: 1` to `opacity: 0`
- Animate to `marginTop: -${height}px`
- Upon completion of the animation remove the element fully

## TODO(TOGETHER): Add an EPIC animation for marking an action item completed

## TODO: Upload the extension to Chrome Web Store

We are DONE! LET'S GOOOOOOO!




