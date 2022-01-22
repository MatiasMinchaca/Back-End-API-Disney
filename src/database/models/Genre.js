module.exports = function(sequelize, dataTypes){
    let alias = "Genre";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(70),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(200),
            allowNull: false
        }
    }
    
    let config = {
        tableName: "genres",
        timestamps: false
    }

    const Genre = sequelize.define(alias, cols, config)

    
    Genre.associate = models => {
        Genre.belongsToMany(models.MovieOrSerie,{
            as:"MoviesOrSeries",
            through: 'GenreMovieOrSerie',
            foreignKey: "genre_id",
            otherKey: "movies_or_series_id"
        });
    }

    return Genre
}