const p = new Promise((resolved, rejected) => {
  setTimeout(() => {
    // resolved(1);
    rejected(new Error('message'));
  }, 2000);
});

p
  .then(result => console.log('Result', result))
  .catch(err => console.log('Error', err.message));
