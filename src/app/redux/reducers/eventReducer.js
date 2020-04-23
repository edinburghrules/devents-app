const initState = [
  {
    id: 1,
    title: 'Edinburgh JS',
    summary: `A get together for fellow Javascript enthusiasts. All new members are welcome.`,
    description: `EdinburghJS is a casual event presenting short talks and a chance for 
    discussion with other local JavaScripters, whatever your experience or job title is. \r 
    Our goal is to have an awesome and inclusive community meetup where people meet, hang out together, chat, 
    listen to talks, exchange ideas and make new friends. \r
    Well be looking for monthly contributors who want to talk about the technologies theyre 
    most comfortable with, looking at the pros, cons and unknowns. Drop us a message if you fancy speaking. `,
    date:  "2020-04-22T18:30:00.624Z",
    city: 'Edinburgh UK',
    venue: 'Codebase',
    latlng: {
      lat: 55.9465849,
      lng: -3.2041196
    },
    category: 'web',
    cost: '2.00',
    spaces: 20,
    img: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
    hostedBy: {
      name: 'Sean Adamson',
      hostPhoto: 'https://randomuser.me/api/portraits/men/81.jpg'
    },
    attendees: [{
      firstName: 'Monica',
      lastName: 'Gellar',
      photoURL: 'https://randomuser.me/api/portraits/women/65.jpg'
    },{
      firstName: 'Rachel',
      lastName: 'Green',
      photoURL: 'https://randomuser.me/api/portraits/women/4.jpg'
    }]
  },
  {
    id: 2,
    title: 'Dundee C#',
    summary: `A get together for fellow C# enthusiasts. All new members are welcome.`,
    description: `This is a very casual and welcoming meetup - come along to code 
    in company, chat about learning to code or coding in general 
    and learn from other people over a beverage of your choice.
    All languages and levels of experience welcome, you don't have to be a 
    beginner and you also don't have to know anything yet to come along!
    There's no structure for this event, it's just for socialising and learning - 
    drop in for however long you like. We will have a table reserved at the back of Akva 
    so just ask for the coding meetup when you arrive.`,
    date:  '18th May 2020',
    city: 'Dundee UK',
    venue: 'Codebase',
    category: 'web',
    cost: '0.00',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/C_Sharp_logo.svg/800px-C_Sharp_logo.svg.png',
    hostedBy: {
      name: 'Manuel Alaminos Dominguez',
      hostPhoto: 'https://randomuser.me/api/portraits/men/86.jpg'
    },
    attendees: [{
      firstName: 'Innes',
      lastName: 'Baird',
      photoURL: 'https://randomuser.me/api/portraits/men/31.jpg'
    },{
      firstName: 'Daljeet',
      lastName: 'Singh',
      photoURL: 'https://randomuser.me/api/portraits/men/56.jpg'
    }]
  }
]

const eventReducer = (state=initState, action) => {
  switch(action.type) {
    case 'CREATE_EVENT':
      return [
        ...state, 
        action.payload
      ];
    case 'EDIT_EVENT':
      return [
        ...state.filter(event => event.id !== action.payload.id),
        action.payload
      ]
    default:
      return state;
  }
}

export default eventReducer;