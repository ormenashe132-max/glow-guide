type ErrorMessageProps = {
  message: string
  onRetry: () => void
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div role="alert">
      <p>לא הצלחנו לטעון את המוצרים: {message}</p>
      <button type="button" onClick={onRetry}>
        נסי שוב
      </button>
    </div>
  )
}

export default ErrorMessage
