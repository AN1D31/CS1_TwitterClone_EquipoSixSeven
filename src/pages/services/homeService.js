const mockCurrentUser = {
    id: 'user-1',
    fullName: 'Yesica Restrepo',
    username: 'yesicarestrepo',
    initials: 'YR',
    bio: 'Disfrutando de las buenas conversaciones. Bienvenidos a mi perfil.',
    location: 'Medellín, Colombia',
    website: 'yesicarestrepo.com',
    joinedDate: 'Se unió en octubre de 2024',
    tweetCount: 125,
    followersCount: 1250,
    followingCount: 340,
}

const mockTweets = [
    {
        id: 'tweet-1',
        fullName: 'Andres Bolívar',
        username: 'andresbolivar',
        initials: 'AB',
        verified: true,
        date: 'Hace 12 minutos',
        content: '¡Bienvenidos a XClone! Un espacio para compartir ideas, conversar y descubrir lo que está pasando.',
        replies: 12,
        reposts: 8,
        likes: 45,
        views: 1200,
    },
    {
        id: 'tweet-2',
        fullName: 'Laura Gómez',
        username: 'lauragomez',
        initials: 'LG',
        verified: false,
        date: 'Hace 35 minutos',
        content: 'Hoy es un buen día para aprender algo nuevo, compartir conocimientos y seguir creciendo.',
        replies: 5,
        reposts: 14,
        likes: 89,
        views: 2300,
    },
    {
        id: 'tweet-3',
        fullName: 'Valentina Torres',
        username: 'valentinatorres',
        initials: 'VT',
        verified: false,
        date: 'Hace 1 hora',
        content: 'Las mejores ideas nacen cuando nos atrevemos a compartir lo que pensamos.',
        replies: 3,
        reposts: 6,
        likes: 32,
        views: 850,
    },
    {
        id: 'tweet-4',
        fullName: 'Sofía Montoya',
        username: 'sofiamontoya',
        initials: 'SM',
        verified: true,
        date: 'Hace 2 horas',
        content: 'Un nuevo proyecto, nuevos retos y muchas ganas de hacerlo realidad. ¡Vamos con toda! 💙',
        replies: 9,
        reposts: 11,
        likes: 104,
        views: 3100,
    },
]

const mockTrends = [
    {
        id: 'trend-1',
        category: 'Tecnología · Tendencia',
        name: '#InteligenciaArtificial',
        posts: '12,5 mil publicaciones',
    },
    {
        id: 'trend-2',
        category: 'Colombia · Tendencia',
        name: 'Medellín',
        posts: '8.420 publicaciones',
    },
    {
        id: 'trend-3',
        category: 'Tecnología · Tendencia',
        name: '#DesarrolloWeb',
        posts: '5.230 publicaciones',
    },
    {
        id: 'trend-4',
        category: 'Tendencia',
        name: '#ReactJS',
        posts: '3.850 publicaciones',
    },
]

const mockSuggestedUsers = [
    {
        id: 'user-2',
        fullName: 'Daniel Herrera',
        username: 'danielherrera',
        initials: 'DH',
    },
    {
        id: 'user-3',
        fullName: 'Valentina Pérez',
        username: 'valentinaperez',
        initials: 'VP',
    },
    {
        id: 'user-4',
        fullName: 'Sebastián López',
        username: 'sebastianlopez',
        initials: 'SL',
    },
]

export const getHomeData = () => {
    return {
        currentUser: mockCurrentUser,
        tweets: mockTweets,
        trends: mockTrends,
        suggestedUsers: mockSuggestedUsers,
    }
}