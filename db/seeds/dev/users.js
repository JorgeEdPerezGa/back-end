exports.seed = function(knex, Promise) {

  return knex('questions').del() 
    .then(() => knex('users').del()) 

    .then(() => {
      return Promise.all([
        
        knex('users').insert({
          user_email: 'jorge@jorge.com',
          username: 'Jorge',
          password: 'iloveprettylittleliars',
          push_notifications_on: true,
          notification_time: '3:00pm',
          primary_contact_name: 'Nyssa',
          primary_contact_email: 'nyssa@nyssa.com'
        }, 'id')
          .then(user => {
            return knex('questions').insert([
              { 
                how_do_you_feel_morning: 'Fantastico', 
                anything_to_look_forward_to: 'false',
                did_you_exercise: 'false',
                did_you_take_medicine: 'true',
                how_do_you_feel_night: 'great',
                date: '04/01/2018',
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
