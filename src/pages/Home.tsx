import { useState } from 'react'
import { Button, Card, Typography } from 'antd'

const { Title, Paragraph } = Typography

export default function Home() {
  const [count, setCount] = useState<number>(0)

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <Card className="max-w-md w-full shadow-lg rounded-2xl">
        <div className="text-center space-y-4">
          <Title level={2} className="!text-slate-800">
            BanquetPro
          </Title>
          <Paragraph className="text-slate-600">
            React + TypeScript + Tailwind CSS + Ant Design
          </Paragraph>
          <div className="py-4">
            <Button
              type="primary"
              size="large"
              onClick={() => setCount((prev) => prev + 1)}
            >
              Count: {count}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
