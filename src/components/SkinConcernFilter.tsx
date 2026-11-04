import {
  SKIN_CONCERNS,
  type SkinConcern,
} from '../data/skinConcerns'
import './SkinConcernFilter.css'

type SkinConcernFilterProps = {
  selectedConcern: SkinConcern | null
  onConcernChange: (concern: SkinConcern | null) => void
}

function SkinConcernFilter({
  selectedConcern,
  onConcernChange,
}: SkinConcernFilterProps) {
  return (
    <div className="skin-concern-filter" role="group" aria-label="סינון לפי בעיית עור">
      <button
        className="skin-concern-button"
        type="button"
        aria-pressed={selectedConcern === null}
        onClick={() => onConcernChange(null)}
      >
        הכל
      </button>
      {SKIN_CONCERNS.map((concern) => (
        <button
          className="skin-concern-button"
          key={concern}
          type="button"
          aria-pressed={selectedConcern === concern}
          onClick={() =>
            onConcernChange(selectedConcern === concern ? null : concern)
          }
        >
          {concern}
        </button>
      ))}
    </div>
  )
}

export default SkinConcernFilter
