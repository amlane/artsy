exports.up = function (knex) {
    return knex.schema.createTable('likes', likes => {
        likes.integer("user_id")
            .notNullable()
            .unsigned()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")

        likes.integer("photo_id")
            .notNullable()
            .unsigned()
            .references("id")
            .inTable("photos")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")

        // Composite primary key; this combines ids from each table to create a unique id 
        likes.primary(['user_id', 'photo_id']);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('likes');
};