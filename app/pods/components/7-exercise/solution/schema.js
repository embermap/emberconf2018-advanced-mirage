export default function({ schema }) {

  /*
    Models:

    Day
    ---
    name       | string  | The name of the day
    activities | hasMany | Talks and events happening today


    Talk
    ---
    title   | string  | The title of the talk
    start   | string  | The time the talk begins
    end     | string  | The time the talk ends
    speakers| hasMany | A list of speakers


    Speaker
    ---
    name  | string  | The speaker's name
    talks | hasMany | The talks the speaker is giving


    Event
    ---
    title     | string | The name of the event
    start     | string | The time the event begins
    end       | string | The time the event ends
    locations | string | Where the party's at

  */

  let dayOne = schema.days.create({
    name: 'March 13th'
  });

  let keynote = schema.talks.create({
    title: 'Opening Keynote',
    start: '9:00am',
    end: '10:00am',
    speakers: [
      schema.speakers.create({ name: 'Yehuda Katz' }),
      schema.speakers.create({ name: 'Tom Dale' })
    ]
  });

  let happyHour = schema.events.create({
    title: 'Happy Hour',
    start: '6:00pm',
    end: '7:00pm',
    location: 'Main hall'
  });

  dayOne.update({ activities: [keynote, happyHour] });

}
