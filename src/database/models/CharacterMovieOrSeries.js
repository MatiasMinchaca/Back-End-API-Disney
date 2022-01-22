module.exports = (sequelize, dataTypes) =>{
    let alias = "CharacterMovieOrSerie";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        character_id: {
            type: dataTypes.INTEGER(11),
            allowNull: true
        },
        movies_or_series_id:{
            type: dataTypes.INTEGER(11),
            allowNull: true
        }
    }
    let config = {
        tableName: "characters_movies_or_series",
        timestamps: false
    }
    
    const CharacterMovieOrSerie = sequelize.define(alias, cols, config)
    return CharacterMovieOrSerie
}