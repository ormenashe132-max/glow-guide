import {
  FREE_FROM_OPTIONS,
  type FreeFromOption,
} from '../data/freeFrom'
import './FreeFromFilter.css'

type FreeFromFilterProps = {
  selectedOptions: FreeFromOption[]
  onOptionsChange: (options: FreeFromOption[]) => void
}

function FreeFromFilter({
  selectedOptions,
  onOptionsChange,
}: FreeFromFilterProps) {
  function toggleOption(option: FreeFromOption) {
    const isSelected = selectedOptions.includes(option)
    const nextOptions = isSelected
      ? selectedOptions.filter((selectedOption) => selectedOption !== option)
      : [...selectedOptions, option]

    onOptionsChange(nextOptions)
  }

  return (
    <div className="free-from-filter" role="group" aria-label="סינון רכיבים">
      {FREE_FROM_OPTIONS.map((option) => {
        const isSelected = selectedOptions.includes(option)

        return (
          <button
            key={option}
            className="free-from-button"
            type="button"
            aria-pressed={isSelected}
            onClick={() => toggleOption(option)}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

export default FreeFromFilter
