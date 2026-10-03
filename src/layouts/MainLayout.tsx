import React from 'react'
import { PostloginLayout } from './PostloginLayout'

export interface MainLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <PostloginLayout title={title} subtitle={subtitle}>
      {children}
    </PostloginLayout>
  )
}

export default MainLayout
