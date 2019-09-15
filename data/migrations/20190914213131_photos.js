exports.up = function (knex) {
    return knex.schema.createTable('photos', photos => {
        photos.increments();

        photos
            .string('photo_url', 3000)
            .notNullable()

        photos
            .string('title', 50)
            .notNullable();

        photos
            .string('description', 1000)

        photos.timestamp('created_at').defaultTo(knex.fn.now());

        photos.integer("user_id")
            .notNullable()
            .unsigned()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('photos');
};