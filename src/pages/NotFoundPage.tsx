import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main>
      <h1>העמוד לא נמצא</h1>
      <Link to="/">חזרה לדף הבית</Link>
    </main>
  )
}

export default NotFoundPage
