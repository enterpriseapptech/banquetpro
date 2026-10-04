import React from 'react'
import { HelpCircle } from 'lucide-react'
import { SectionCard } from '@/components/ui/SectionCard'
import { PostloginLayout } from '@/layouts/PostloginLayout'
import { ContactCard, FaqList, SupportRequestForm } from '@/components/support'
import { CONTACT_METHODS, FAQS } from '@/utils/supportData'

export const Support: React.FC = () => {
  const handleStartChat = () => {
    // Hook up a live chat provider here.
  }

  return (
    <PostloginLayout
      title="Support & Help Center"
      subtitle="Get help with your admin dashboard and platform management"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {CONTACT_METHODS.map(({ id, icon: Icon, href, ...method }) => (
            <ContactCard
              key={id}
              icon={<Icon className="w-5 h-5" />}
              href={href}
              onAction={href ? undefined : handleStartChat}
              {...method}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 items-start">
          <SectionCard title="Submit Support Request" icon={<HelpCircle className="w-5 h-5" />}>
            <SupportRequestForm />
          </SectionCard>

          <SectionCard title="Frequently Asked Questions">
            <FaqList items={FAQS} />
          </SectionCard>
        </div>
      </div>
    </PostloginLayout>
  )
}

export default Support
