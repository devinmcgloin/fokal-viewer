const loadStore = () => {
  try {
    let auth = localStorage.getItem('fokal:auth');
    return auth && { auth: JSON.parse(auth) };
  } catch (err) {
    return undefined;
  }
};

const saveStore = store => {
  saveAuth(store.auth);
};

const saveAuth = auth => {
  try {
    localStorage.setItem('fokal:auth', JSON.stringify(auth));
  } catch (err) {
    console.log('UNABLE TO SAVE AUTH %s', err);
  }
};

export { saveStore, loadStore };
