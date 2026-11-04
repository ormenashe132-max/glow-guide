import { Link } from 'react-router-dom'
import './HeroSection.css'

function HeroSection() {
  return (
    <section className="hero-section">
      <h1>מוצאים את המוצר המתאים לעור שלכם</h1>
      <p className="hero-section-intro">
        בעיות עור הן נושא רגיש ונפוץ, וכולנו מחפשים פתרונות ברשת. אבל לא תמיד
        ברור איזה מוצר מתאים לאיזו בעיה. Glow Guide עוזר להבין מה יש בתוך המוצר
        ולמי הוא מתאים.
      </p>
      <ol className="hero-steps" aria-label="צעדים להתחלה">
        <li>
          <a href="#product-list">
            <span aria-hidden="true">🔎</span>
            <span>מחפשים מוצר</span>
          </a>
        </li>
        <li>
          <Link to="/ingredients">
            <span aria-hidden="true">✨</span>
            <span>רואים למה הוא מתאים</span>
          </Link>
        </li>
        <li>
          <Link to="/routine">
            <span aria-hidden="true">♡</span>
            <span>שומרים לשגרה שלכם</span>
          </Link>
        </li>
      </ol>
      <Link className="hero-section-cta" to="/ingredients">
        לבודקת הרכיבים
      </Link>
      <p className="hero-section-disclaimer">
        המידע באתר הוא מידע כללי על רכיבים ואינו ייעוץ רפואי.
      </p>
    </section>
  )
}

export default HeroSection
