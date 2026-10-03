import { FallbackProps } from 'react-error-boundary'
import { Button, Result } from 'antd'

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-50">
      <Result
        status="error"
        title="Something went wrong"
        subTitle={error?.toString() || 'An unexpected error occurred.'}
        extra={[
          <Button type="primary" key="retry" onClick={resetErrorBoundary}>
            Try Again
          </Button>,
        ]}
      />
    </div>
  )
}
