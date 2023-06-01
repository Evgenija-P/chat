const { trims } = require('./utils');

let users = [];
const addUser = user => {
  const userName = trims(user.name);
  const userRoom = trims(user.room);

  const isExist = users.find(
    user => trims(user.name) === userName && trims(user.room) === userRoom
  );

  !isExist && users.push(user);

  const currenUser = isExist || user;

  return { isExist: !!isExist, user: currenUser };
};

module.exports = addUser;
