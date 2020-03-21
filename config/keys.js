let password = 'your password to your mongo cloud';
let user_name = 'your username';
let cluster_name = 'your clustername';
dbPassword = `mongodb+srv://${user_name}:${password}@${cluster_name}`;

local = 'mongodb://localhost/whosthatpokemon';

module.exports = {
    external: dbPassword,
    local: local,
    secret: 'your secret string'
};
