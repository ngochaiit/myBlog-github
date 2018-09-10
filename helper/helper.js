var bcrypt = require('bcrypt');
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const saltRounds = 10;

const getHashPassword = async (password) => {
    try {
        let salt = await bcrypt.genSaltSync(saltRounds);
        let hash = await bcrypt.hashSync(password, salt);
        return hash;

    } catch(e) {
        return null;
    }
    
}

const deHashPassword = async (password, hash) =>
{
    try{
        return bcrypt.compareSync(password, hash);

    }
    catch(e)
    {
        return null;
    }

    
}

module.exports = {
    getHashPassword: getHashPassword,
    deHashPassword: deHashPassword
}