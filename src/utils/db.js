const Sequelize = require('sequelize');

const CONNECTION_STRING = process.env.DATABASE || "postgres://postgres:asd123@localhost:5432/urls";

const db = new Sequelize(CONNECTION_STRING);

const  User = db.define('users', {
    name: Sequelize.TEXT,
    email: {
        type: Sequelize.TEXT,
        unique: true

    },
    password: Sequelize.TEXT
});

const Direction = db.define('directions', {
    user_id: Sequelize.NUMERIC,
    destination: Sequelize.TEXT,
    hash: Sequelize.TEXT
});

db.sync( )
    .then(e=>{
        console.log(`Database sync`);
    }).catch(e=>{
        console.log(e.message);
})

module.exports = {
    db, User, Direction,
}
