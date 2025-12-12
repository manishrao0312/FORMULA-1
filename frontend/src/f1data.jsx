// src/f1data.js
export const teams = [
    {
      id: 'rbr',
      name: 'Red Bull Racing',
      color: '#0600EF',
      logo: '/red.jpg',
      drivers: [
        /* Since the file is in 'public/verstappen.jpg', 
           we just use '/verstappen.jpg' 
        */
        { name: 'Max Verstappen', number: '1', image: '/verstappen.jpg' },
        
        { name: 'Sergio Perez', number: '11', image: '/perez.jpg' }
      ]
    },
    // ... keep the rest of your teams the same ...
    {
      id: 'fer',
      name: 'Ferrari',
      color: '#E8002D',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Ferrari-Logo.svg/1200px-Ferrari-Logo.svg.png',
      drivers: [
        { name: 'Charles Leclerc', number: '16', image: '/leclerc.jpg' },
        { name: 'Lewis Hamilton', number: '44', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg/500px-Lewis_Hamilton_2016_Malaysia_2.jpg' }
      ]
    },
    {
      id: 'mcl',
      name: 'McLaren',
      color: '#FF8000',
      logo: '/mc.png',
      drivers: [
        { name: 'Lando Norris', number: '4', image: '/norris.jpg' },
        { name: 'Oscar Piastri', number: '81', image: '/piastri.jpg' }
      ]
    },
    {
      id: 'mer',
      name: 'Mercedes',
      color: '#00D2BE',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg/1200px-Mercedes_AMG_Petronas_F1_Logo.svg.png',
      drivers: [
        { name: 'George Russell', number: '63', image: '/russel.jpg' },
        { name: 'Kimi Antonelli', number: '12', image: '/antoneelii.jpg' }
      ]
    },
    {
      id: 'ast',
      name: 'Aston Martin',
      color: '#006F62',
      logo: '/as.png',
      drivers: [
        { name: 'Fernando Alonso', number: '14', image: '/alonso.jpg' },
        { name: 'Lance Stroll', number: '18', image: '/stroll.jpg' }
      ]
    }
];

export const nextRace = {
    name: "Australian Grand Prix",
    date: "2025-03-16T05:00:00Z", 
    track: "Albert Park Circuit",
    flag: "🇦🇺"
};