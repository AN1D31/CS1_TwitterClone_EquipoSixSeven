import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getHomeData } from './services/homeService'
import './home-page.css'

export const HomePage = () => {
    const homeData = getHomeData()
    const { currentUser, tweets, trends, suggestedUsers } = homeData
    const [likedTweets, setLikedTweets] = useState([])

    const toggleLike = (tweetId) => {
        setLikedTweets((previousLikes) =>
            previousLikes.includes(tweetId)
                ? previousLikes.filter((id) => id !== tweetId)
                : [...previousLikes, tweetId]
        )
    }

    return (
        <main className="home-x-layout">
            <aside className="home-left-sidebar">
                <div className="home-x-logo">𝕏</div>

                <nav className="home-navigation">
                    <Link to="/" className="home-nav-item home-nav-active">
                        <span>⌂</span>
                        <strong>Inicio</strong>
                    </Link>

                    <div className="home-nav-item">
                        <span>⌕</span>
                        <span>Explorar</span>
                    </div>

                    <div className="home-nav-item">
                        <span>♧</span>
                        <span>Notificaciones</span>
                    </div>

                    <div className="home-nav-item">
                        <span>✉</span>
                        <span>Mensajes</span>
                    </div>

                    <Link to="/tweets/feed" className="home-nav-item">
                        <span>▤</span>
                        <span>Feed</span>
                    </Link>

                    <div className="home-nav-item">
                        <span>♙</span>
                        <span>Perfil</span>
                    </div>
                </nav>

                <Link to="/tweets/compose" className="home-post-button">
                    Publicar
                </Link>

                <div className="home-sidebar-user">
                    <div className="home-avatar">
                        {currentUser.initials}
                    </div>

                    <div className="home-sidebar-user-info">
                        <strong>{currentUser.fullName}</strong>
                        <span>@{currentUser.username}</span>
                    </div>
                </div>
            </aside>

            <section className="home-center-column">
                <header className="home-center-header">
                    <h1>Inicio</h1>
                    <span>Para ti</span>
                </header>

                <div className="home-composer">
                    <div className="home-avatar">
                        {currentUser.initials}
                    </div>

                    <div className="home-composer-content">
                        <Link
                            to="/tweets/compose"
                            className="home-composer-link"
                        >
                            ¿Qué está pasando?
                        </Link>

                        <div className="home-composer-bottom">
                            <span>🌎 Cualquier persona puede responder</span>

                            <Link
                                to="/tweets/compose"
                                className="home-composer-button"
                            >
                                Publicar
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="home-feed-label">
                    Publicaciones recientes
                </div>

                <div className="home-tweet-list">
                    {tweets.map((tweet) => {
                        const isLiked = likedTweets.includes(tweet.id)

                        return (
                            <article className="home-tweet" key={tweet.id}>
                                <div className="home-avatar">
                                    {tweet.initials}
                                </div>

                                <div className="home-tweet-content">
                                    <div className="home-tweet-header">
                                        <strong>{tweet.fullName}</strong>

                                        {tweet.verified && (
                                            <span className="home-verified">
                                                ✓
                                            </span>
                                        )}

                                        <span>@{tweet.username}</span>
                                        <span>·</span>
                                        <span>{tweet.date}</span>
                                    </div>

                                    <p className="home-tweet-text">
                                        {tweet.content}
                                    </p>

                                    <div className="home-tweet-actions">
                                        <span>♧ {tweet.replies}</span>
                                        <span>↻ {tweet.reposts}</span>

                                        <button
                                            type="button"
                                            className={isLiked ? 'home-liked' : ''}
                                            onClick={() => toggleLike(tweet.id)}
                                            aria-label="Me gusta"
                                        >
                                            ♥ {tweet.likes + (isLiked ? 1 : 0)}
                                        </button>

                                        <span>◉ {tweet.views}</span>
                                        <span>↗</span>
                                    </div>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </section>

            <aside className="home-right-sidebar">
                <div className="home-search">
                    <span>⌕</span>
                    <input
                        type="search"
                        placeholder="Buscar"
                        aria-label="Buscar"
                    />
                </div>

                <section className="home-widget">
                    <h2>Tendencias para ti</h2>

                    {trends.map((trend) => (
                        <div className="home-trend" key={trend.id}>
                            <span>{trend.category}</span>
                            <strong>{trend.name}</strong>
                            <span>{trend.posts}</span>
                        </div>
                    ))}

                    <span className="home-show-more">
                        Mostrar más
                    </span>
                </section>

                <section className="home-widget">
                    <h2>A quién seguir</h2>

                    {suggestedUsers.map((user) => (
                        <div className="home-suggested-user" key={user.id}>
                            <div className="home-avatar home-avatar-small">
                                {user.initials}
                            </div>

                            <div className="home-suggested-info">
                                <strong>{user.fullName}</strong>
                                <span>@{user.username}</span>
                            </div>

                            <span className="home-follow-label">
                                Seguir
                            </span>
                        </div>
                    ))}

                    <span className="home-show-more">
                        Mostrar más
                    </span>
                </section>

                <footer className="home-footer">
                    Condiciones de Servicio · Política de Privacidad
                    <br />
                    Política de cookies · Accesibilidad
                    <br />
                    © 2026 XClone
                </footer>
            </aside>
        </main>
    )
}