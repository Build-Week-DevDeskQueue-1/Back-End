
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: "student1",
          password: "testhash",
          is_helper: false,
          is_student: true
        },
        {
          id: 2,
          username: "helper1",
          password: "testhash",
          is_helper: true,
          is_student: false
        }
      ]);
    });
};
