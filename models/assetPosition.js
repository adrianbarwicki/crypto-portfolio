module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define("assetPosition", {
        amount: {
            type: DataTypes.FLOAT
        }
    }, {
        tableName: 'assetPosition',
        classMethods: {
          associate: models => {
            Model.belongsTo(models.priceTicker);
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
