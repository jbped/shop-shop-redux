export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}

export function idbPromise(storeName, method, object) {
  return new Promise ((resolve, reject) => {
    // open connection to shop-shop version 1 db
    const request = window.indexedDB.open('shop-shop', 1);

    let db, tx, store;

    // on version change or first accessing the website run function and create the appropriate objectStores
    request.onupgradeneeded = function(e) {
      const db = request.result;

      db.createObjectStore('products', { keyPath: '_id'});
      db.createObjectStore('categories', { keyPath: '_id'});
      db.createObjectStore('cart', { keyPath: '_id'});
    };
    
    // Handle connection errors
    request.onerror = function (e) {
      console.log('Uh oh! Something went wrong!')
    }

    request.onsuccess = function (e) {
      db = request.result;

      // open transaction and store whatever is passed to storeName
      tx = db.transaction(storeName, 'readwrite');
      // save reference to declared object store 
      store = tx.objectStore(storeName);
      // console.log(store)
      // console log if error
      db.onerror = function (e) {
        console.log('Error:', e)
      }

      switch(method) {
        case 'put': 
          console.log('put:', store.put(object))
          store.put(object);
          // console.log('resolution:', resolve(object))
          resolve(object);
          break;
        case 'get': 
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          }
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method')
          break;
      }

      tx.oncomplete = function () {
        db.close()
      };
    };
  });
}