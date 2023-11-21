const { Sequelize, DataTypes } = require('sequelize');
const SQLite = require('sqlite3');

module.exports.DataBase = class {
    sequelize = null;
    Level = null;

    constructor() {
        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: './src/assets/data/DatabaseLevels.sqlite3',
            dialectOptions: {
                mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
            },
        })

        this.Level = this.sequelize.define('level',
            {
                id: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                    unique: true,
                    allowNull: false
                },
                level: {
                    type: DataTypes.TEXT,
                    allowNull: false
                }
            },
            {
                freezeTableName: true,
                timestamps: false
            }
        );
    }

    initConnectionSqlite() {
        return this.sequelize.authenticate();
    }

    syncTabel() {
        this.Level.sync({ alter: true }).then((data) => {
            console.log('Table and model synced successful!');
        }).catch((err) => {
            console.error('Error synced the table and model:\n' + err);
        });
    }

    // Find all users
    findAll() {
        return new Promise((resolve, reject) => {
            this.Level.findAll().then((result) => {
                resolve(JSON.stringify(result, null, 2));
            }).catch((err) => {
                console.error(err);
            });
        });
    }

    addLevel(level) {
        this.Level.sync({ alter: true }).then(async () => {
            return await this.Level.create({ id: level.id, level: JSON.stringify(level) });
        }).then((data) => {
            console.log('Add level successful!');
            return true;
        }).catch((err) => {
            console.error('Error add level:\n' + err);
        });
    }

    updateLevel(level) {
        this.Level.sync({ alter: true }).then(async () => {
            this.Level.update({ level: JSON.stringify(level) }, { where: { id: level.id } });
        }).then((data) => {
            console.log('Update level successful!');
            return true;
        }).catch((err) => {
            console.error('Error update level:\n' + err);
        });
    }

    deleteLevel(id) {
        this.Level.sync({ alter: true }).then(async () => {
            await this.Level.destroy({ where: { id: id } });
        }).then(() => {
            console.log('Delete level successful!');
            return true;
        }).catch((err) => {
            console.error('Error delete level:\n' + err);
        });
    }

}