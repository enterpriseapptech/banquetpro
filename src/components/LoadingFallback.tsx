import { Spin } from 'antd'

export function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <Spin size="large" tip="Loading..." />
    </div>
  )
}
