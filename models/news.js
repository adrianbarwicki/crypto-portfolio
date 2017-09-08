module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define("news", {
        title: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING
        },
        time: {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'news'
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
