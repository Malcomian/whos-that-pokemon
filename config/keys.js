dbPassword = 'mongodb+srv://YOUR_USERNAME_HERE:'+ encodeURIComponent('YOUR_PASSWORD_HERE') + '@CLUSTER_NAME_HERE.mongodb.net/test?retryWrites=true';

local = 'mongodb://localhost/whosthatpokemon';

module.exports = {
    mongoURI: dbPassword,
    local: local,
    secret: 'a totally secret key that nobody would guess ever in a million years'
};
