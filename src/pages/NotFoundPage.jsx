import { Link } from 'react-router-dom'
import './notFoundPage.css'

export const NotFoundPage = () => {
	return (
		<section className="not-found-page">
			<p className="not-found-page__code">404</p>
			<h1 className="not-found-page__title">Esta página no existe</h1>
			<p className="not-found-page__text">
				Puede que el enlace esté mal escrito o que la página se haya movido.
			</p>
			<Link to="/" className="not-found-page__link">
				Volver al inicio
			</Link>
		</section>
	)
}