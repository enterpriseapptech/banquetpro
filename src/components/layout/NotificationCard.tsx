import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_NOTIFICATIONS, NotificationItem } from '@/utils/data'

export interface NotificationCardProps {
  notifications?: NotificationItem[]
  onViewAll?: () => void
  onItemClick?: (item: NotificationItem) => void
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notifications = MOCK_NOTIFICATIONS,
  onViewAll,
  onItemClick,
}) => {
  const navigate = useNavigate()
  const unreadCount = notifications.filter((n) => n.isUnread).length

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll()
    } else {
      navigate('/notifications')
    }
  }

  return (
    <div className="w-80 bg-white rounded-2xl shadow-xl border border-gray-200/90 overflow-hidden text-left font-['Inter'] animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-white">
        <h3 className="font-bold text-gray-900 text-sm sm:text-base tracking-tight">
          Notifications
        </h3>
        {unreadCount > 0 && (
          <span className="text-xs text-gray-500 font-normal">
            {unreadCount} new
          </span>
        )}
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100/80">
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemClick?.(item)}
            className={`px-4 py-3.5 flex items-start gap-3 transition-colors cursor-pointer ${
              item.isUnread
                ? 'bg-[#f4f7ff] hover:bg-[#ebf2ff]'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            {/* Status Dot */}
            <span
              className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                item.isUnread ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />

            {/* Content */}
            <div className="min-w-0 flex-1">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-gray-600 mt-0.5 leading-normal">
                {item.description}
              </p>
              <p className="text-[11px] text-gray-400 mt-1 font-normal">
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 bg-white border-t border-gray-100 text-center">
        <button
          type="button"
          onClick={handleViewAll}
          className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer w-full"
        >
          View all notifications
        </button>
      </div>
    </div>
  )
}

export default NotificationCard
