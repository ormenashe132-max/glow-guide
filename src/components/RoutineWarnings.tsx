import type { RoutineConflict } from '../data/routineConflicts'
import './RoutineWarnings.css'

type RoutineWarningsProps = {
  conflicts: RoutineConflict[]
}

function RoutineWarnings({ conflicts }: RoutineWarningsProps) {
  if (conflicts.length === 0) {
    return (
      <p className="routine-warnings-empty" role="status">
        ✓ לא נמצאו התנגשויות בין המוצרים בשגרה
      </p>
    )
  }

  return (
    <section
      className="routine-warnings"
      aria-label="התנגשויות בין מוצרים בשגרה"
      aria-live="polite"
    >
      {conflicts.map((conflict, index) => (
        <article className="routine-warning" key={`${index}-${conflict.explanation}`}>
          <h2>
            {conflict.firstProductName} + {conflict.secondProductName}
          </h2>
          <p>{conflict.explanation}</p>
        </article>
      ))}
    </section>
  )
}

export default RoutineWarnings
