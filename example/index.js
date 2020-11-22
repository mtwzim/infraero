const { getVoosPartida, getVoosChegada } = require('../dist/infraero-promise');

async function infraeroPromiseExample() {
  getVoosPartida('SBRF').then(console.log).catch(console.error);
  getVoosChegada('SBRF').then(console.log).catch(console.error);
}

infraeroPromiseExample();
