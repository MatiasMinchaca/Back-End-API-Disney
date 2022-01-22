module.exports = function(sequelize, dataTypes){
    let alias = "Character";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(70),
            allowNull: false
        },
        age: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        weight: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        history: {
            type: dataTypes.STRING(400),
            allowNull: false
        }
    }
    
    let config = {
        tableName: "characters",
        timestamps: false
    }

    const Character = sequelize.define(alias, cols, config)

    Character.associate=models=>{
        Character.belongsToMany(models.MovieOrSerie,{
            as:"MoviesOrSeries",
            through: 'CharacterMovieOrSerie',
            foreignKey: "character_id",
            otherKey: "movies_or_series_id"
        });
    }

    return Character
}