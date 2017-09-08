module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define("priceTicker", {
        id: {
            primaryKey: true,
            type: DataTypes.STRING(50)
        },
        name: {
            required: true,
            type: DataTypes.STRING(50)
        },
        symbol: {
            required: true,
            type: DataTypes.STRING(6)
        },
        rank: {
            type: DataTypes.INTEGER(6)
        },
        price_usd: {
            type: DataTypes.FLOAT
        },
        price_btc: {
            type: DataTypes.FLOAT
        },
        '24h_volume_usd': {
            type: DataTypes.FLOAT
        },
        'market_cap_usd': {
            type: DataTypes.FLOAT
        },
        available_supply: {
            type: DataTypes.FLOAT
        },
        total_supply: {
            type: DataTypes.FLOAT
        },
        total_supply: {
            type: DataTypes.FLOAT
        },
        percent_change_1h: {
            type: DataTypes.FLOAT
        },
        percent_change_24h: {
            type: DataTypes.FLOAT
        },
        percent_change_7d: {
            type: DataTypes.FLOAT
        }
    }, {
        tableName: 'priceTicker',
        classMethods: {
          associate: models => {
            Model.hasMany(models.assetPosition);
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
