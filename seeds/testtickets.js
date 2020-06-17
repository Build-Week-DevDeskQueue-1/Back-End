
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tickets').del()
    .then(function () {
      // Inserts seed entries
      return knex('tickets').insert([
        {
          id: 1,
          title: 'ticket1',
          description: 'tried doing this thing but doesnt work',
          tried: 'everything',
          category: 'tech support',
          student_id: 1,
          status: "open"
        },
        {
          id: 2,
          title: 'ticket2',
          description: 'tried doing this thing but doesnt work',
          tried: 'nothing',
          category: 'tech support',
          student_id: 1,
          helper_id: 2,
          status: "closed"
        }
      ]);
    });
};
