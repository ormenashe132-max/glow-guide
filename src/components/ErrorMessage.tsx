type ErrorMessageProps = {
  onRetry: () => void
}

function ErrorMessage({ onRetry }: ErrorMessageProps) {
  return (
    <div role="alert">
      <p>לא הצלחנו לטעון את המוצרים. נסי שוב.</p>
      <button type="button" onClick={onRetry}>
        נסי שוב
      </button>
    </div>
  )
}

export default ErrorMessage
