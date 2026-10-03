import { ReactNode } from 'react'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

interface PageHeaderProps {
  title: string
  description?: string
  action?: ReactNode
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 mb-6 border-b border-slate-200">
      <div>
        <Title level={3} className="!mb-1 !text-slate-800 font-bold">
          {title}
        </Title>
        {description && (
          <Paragraph className="!mb-0 text-slate-500">
            {description}
          </Paragraph>
        )}
      </div>
      {action && <div className="mt-4 md:mt-0">{action}</div>}
    </div>
  )
}
