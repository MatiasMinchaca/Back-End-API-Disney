module.exports = (sequelize, dataTypes) =>{
    let alias = "GenreMovieOrSerie";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        genre_id: {
            type: dataTypes.INTEGER(11),
            allowNull: true
        },
        movies_or_series_id:{
            type: dataTypes.INTEGER(11),
            allowNull: true
        }
    }
    let config = {
        tableName: "genres_movies_or_series",
        timestamps: false
    }
    
    const GenreMovieOrSerie = sequelize.define(alias, cols, config)
    return GenreMovieOrSerie
}