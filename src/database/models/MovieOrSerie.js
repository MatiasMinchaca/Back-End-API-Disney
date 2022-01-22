module.exports = function(sequelize, dataTypes){
    let alias = "MovieOrSerie";
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
        title: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        qualification: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        created_date: {
            type: dataTypes.DATE
        }
    }
    
    let config = {
        tableName: "movies_or_series",
        timestamps: false
    }

    const MovieOrSerie = sequelize.define(alias, cols, config)

    MovieOrSerie.associate = models => {
        MovieOrSerie.belongsToMany(models.Character, {
            as: "Characters",
            through: 'CharacterMovieOrSerie',
            foreignKey: "movies_or_series_id",
            otherKey: "character_id"
        }),
        MovieOrSerie.belongsToMany(models.Genre, {
            as: "Genres",
            through: 'GenreMovieOrSerie',
            foreignKey: "movies_or_series_id",
            otherKey: "genre_id"
        })
    }

    return MovieOrSerie
}