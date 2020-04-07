const initState = [
  {
    id: 1,
    title: 'Edinburgh JS',
    snip: `A get together for fellow Javascript enthusiasts. All new members are welcome.`,
    description: `A get together for fellow Javascript enthusiasts. All new members are welcome.
    EdinburghJS is a casual event presenting short talks and a chance for discussion with other local 
    JavaScripters, whatever your experience or job title is.  
    Our goal is to have an awesome and inclusive community meetup where people meet, hang out together, chat, 
    listen to talks, exchange ideas and make new friends.
    Well be looking for monthly contributors who want to talk about the technologies theyre 
    most comfortable with, looking at the pros, cons and unknowns. Drop us a message if you fancy speaking. `,
    date:  new Date(),
    city: 'Edinburgh UK',
    venue: 'Codebase',
    category: 'Javascript',
    cost: 'free',
    img: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
    hostedBy: {
      name: 'Sean Adamson',
      hostPhoto: 'https://randomuser.me/api/portraits/men/81.jpg'
    },
    attendees: [{
      firstName: 'Melissa',
      lastName: 'Baird',
      photoURL: 'https://randomuser.me/api/portraits/women/65.jpg'
    },{
      firstName: 'Laney',
      lastName: 'Armstrong',
      photoURL: 'https://randomuser.me/api/portraits/women/4.jpg'
    }]
  },
  {
    id: 2,
    title: 'Dundee C#',
    description: 'A get together for fellow C# enthusiasts. All new members are welcome.',
    date:  new Date(),
    city: 'Dundee UK',
    venue: 'Codebase',
    category: 'C#',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/C_Sharp_logo.svg/800px-C_Sharp_logo.svg.png',
    hostedBy: {
      name: 'Manuel Alaminos Doninguez',
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
    case 'GET_EVENTS':
      return state;
    default:
      return state;
  }
}

export default eventReducer;