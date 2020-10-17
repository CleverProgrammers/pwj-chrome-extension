class ActionItems {
    static storage = chrome.storage.sync; 

    static getCurrentItems(callback){
        ActionItems.storage.get(['actionItems'], (data)=>{
            let items = data.actionItems;
            callback(items);
        });
    }

    static addQuickActionItem(id, text, tab, callback){
        let website = null;
        //quick-action-2 is for Link Site For Later
        if(id=="quick-action-2" && tab){
            website = {
              url: tab.url,
              fav_icon: tab.favIconUrl,
              title: tab.title
            }
            if(website.title == "New Tab") {
                return;
            }
        }
        let actionItem = {
            id: uuidv4(),
            added: new Date().toString(),
            completed: null,
            text: text,
            website: website
        }
        ActionItems.add(actionItem, ()=>{
            callback(actionItem, 250)
        })
    }

    static add(actionItem, callback){
        ActionItems.storage.get(['actionItems'], (data)=>{
            let items = data.actionItems;
            ActionItems.storage.set({
                actionItems: [actionItem, ...items]
            }, callback)
        });
    }

    static saveName(name, callback){
        ActionItems.storage.set({
            name: name
        }, callback)
    }

    static markUnmarkCompleted(itemId, completedStatus, callback){
        ActionItems.storage.get(['actionItems'], (data)=>{
            let items = data.actionItems;
            let foundItemIndex = items.findIndex((el)=> el.id == itemId) 
            if(foundItemIndex >= 0){
                items[foundItemIndex].completed = completedStatus;
                ActionItems.storage.set({
                    actionItems: items
                }, callback)
            }
        });
    }

    static remove(itemId, callback){
        ActionItems.storage.get(['actionItems'], (data)=>{
            let items = data.actionItems;
            let foundItemIndex = items.findIndex((el)=> el.id == itemId) 
            if(foundItemIndex >= 0){
                items.splice(foundItemIndex, 1);
                ActionItems.storage.set({
                    actionItems: items
                }, callback);
            }
        });
    }

    static setProgress() {
        let completedItems = 0;
        ActionItems.getCurrentItems((items)=>{
          let totalItems = items.length;
          completedItems = items.filter((item)=>{
            return item.completed;
          }).length;
          let progress = 0;
          if(totalItems > 0){
            progress = parseFloat(completedItems/totalItems).toFixed(2);
          }
          ActionItems.setBrowserBadge(totalItems - completedItems);
          if(typeof window.circle !== "undefined") circle.animate(progress);  
        })
    }

    static setBrowserBadge(todoItems){
        let text = `${todoItems}`;
        if(todoItems > 9){
          text = '9+'
        }
        chrome.browserAction.setBadgeText({text: text});
    }
}