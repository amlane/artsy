exports.up = function (knex) {
    return knex.schema.createTable('users', users => {
        users.increments();

        users
            .string('username', 128)
            .unique();

        users
            .string('email', 128)
            .notNullable()
            .unique();

        users
            .string('password', 128)
            .notNullable();

        users.timestamp('created_at').defaultTo(knex.fn.now());

        users
            .string('avatar_url', 3000)
            .defaultTo("https://static.wixstatic.com/media/4151a5_7706b6198d164a3e947f4548166228ad~mv2.png")

        users
            .string('location', 150)

        users
            .string('about', 1000)
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};