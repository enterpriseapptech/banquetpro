import React from 'react'

export interface PreloginLayoutProps {
  children: React.ReactNode
}

export const PreloginLayout: React.FC<PreloginLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50/60 p-4 sm:p-6 md:p-10 font-sans">
      <div className="w-full max-w-[460px] bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100/80 p-6 sm:p-8 my-auto transition-all">
        {children}
      </div>
    </div>
  )
}

export default PreloginLayout
