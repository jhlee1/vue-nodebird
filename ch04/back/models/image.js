module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        src: {
            type: DataTypes.STRING(200),
            allowNull: false
        }
    }, {
        charset: 'utf8', // 이모티콘은 필요없어서 mb4 빼버림
        collate: 'utf8_general_ci'
    });
};