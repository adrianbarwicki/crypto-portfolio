module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define("portfolio", {
        name: {
            type: DataTypes.STRING(50)
        },
        initialValue: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'portfolio',
        classMethods: {
          associate: models => {
          }
        }
    });

    Model.upsert = (values, where) =>
        Model
        .findOne({
            where
        })
        .then(obj => {
            if (obj) {
                return obj.update(values);
            }
    
            return Model.create(values);
        });

    return Model;
  };
