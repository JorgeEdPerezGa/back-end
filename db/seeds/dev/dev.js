exports.seed = function(knex, Promise) {
  return knex('daily_totals').del() 
    .then(() => knex('users').del()) 
    .then(() => {
      return Promise.all([
        knex('users').insert({
          token_string: '9999999999'
        }, 'id')
          .then(user => {
            return knex('daily_totals').insert([
              { 
                current_date: 'Tue Apr 17 2018 14:22:06 GMT-0600',
                week_start_date: 'Tue Apr 17 2018 14:22:06 GMT-0600',
                daily_total: 2, 
                user_id: user[0] 
              },
              {
                current_date: 'Wed Apr 18 2018 14:22:06 GMT-0600',
                week_start_date: 'Tue Apr 17 2018 14:22:06 GMT-0600',
                daily_total: 1, 
                user_id: user[0] 
              },
              {
                current_date: 'Thu Apr 19 2018 14:22:06 GMT-0600',
                week_start_date: 'Tue Apr 17 2018 14:22:06 GMT-0600',
                daily_total: 4, 
                user_id: user[0] 
              },
              {
                current_date: 'Fri Apr 20 2018 14:22:06 GMT-0600',
                week_start_date: 'Tue Apr 17 2018 14:22:06 GMT-0600',
                daily_total: 2, 
                user_id: user[0] 
              }
            ]);
          })
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};