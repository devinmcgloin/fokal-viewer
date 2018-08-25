const loadAuth = () => {
  try {
    let auth = localStorage.getItem('fokal:auth');
    return auth && JSON.parse(auth);
  } catch (err) {
    return undefined;
  }
};

const loadImages = () => {
  try {
    let images = localStorage.getItem('fokal:cache:images');
    return images && JSON.parse(images);
  } catch (err) {
    return undefined;
  }
};

const loadSearch = () => {
  try {
    let results = localStorage.getItem('fokal:cache:search');
    return results && JSON.parse(results);
  } catch (err) {
    return undefined;
  }
};

const saveStore = store => {
  saveAuth(store.auth);
  saveImages(store.images);
  saveSearch(store.search);
};

const saveAuth = auth => {
  try {
    localStorage.setItem('fokal:auth', JSON.stringify(auth));
  } catch (err) {
    console.log('UNABLE TO SAVE AUTH %s', err);
  }
};

const saveImages = images => {
  try {
    localStorage.setItem('fokal:cache:images', JSON.stringify(images));
  } catch (err) {
    console.log('UNABLE TO SAVE IMAGES %s', err);
  }
};

const saveSearch = search => {
  try {
    localStorage.setItem('fokal:cache:search', JSON.stringify(search));
  } catch (err) {
    console.log('UNABLE TO SAVE SEARCH %s', err);
  }
};

export { saveStore, loadAuth, loadImages, loadSearch };
