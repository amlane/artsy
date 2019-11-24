exports.up = function(knex) {
  return knex.schema.createTable("comments", comments => {
    comments.increments();

    comments.string("content", 1000).notNullable();

    comments.timestamp("created_at").defaultTo(knex.fn.now());

    comments
      .integer("photo_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("photos")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    comments
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("comments");
};
