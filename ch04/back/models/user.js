module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
        // sequelize에서 자동으로 id, createdAt, updatedAt을 만들어줌
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci' // 한글 저장하기 위해
    });

    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
    };

    return User;
}
