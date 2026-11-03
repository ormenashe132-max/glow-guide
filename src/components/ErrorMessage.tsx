type ErrorMessageProps = {
  onRetry: () => void
}

function ErrorMessage({ onRetry }: ErrorMessageProps) {
  return (
    <div role="alert">
      <p>לא ניתן לטעון את המידע. נסי שוב.</p>
      <button type="button" onClick={onRetry}>
        נסי שוב
      </button>
    </div>
  )
}

export default ErrorMessage
