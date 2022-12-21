console.log('Before');
async function displayRepos() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    console.log('Repositories: ', repos);
  }
  catch (err) {
    console.log('Error ', err);
  }
}
displayRepos();
console.log('After');

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({id: id, gitHubUsername: 'mosh'});
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Reading the repositories for user ${username}...`);
      let repositories = ['repo1', 'repo2', 'repo3'];
      resolve(repositories);
    }, 2000);
  });
}