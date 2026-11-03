import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main>
      <section className="not-found-panel">
        <h1>העמוד לא נמצא</h1>
        <Link to="/">חזרה לדף הבית</Link>
      </section>
    </main>
  )
}

export default NotFoundPage
