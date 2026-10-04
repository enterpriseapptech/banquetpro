import React, { useState } from 'react'
import {
  Plus,
  UserPlus,
  LayoutGrid,
  List,
  Eye,
  Pencil,
  Power,
  Trash2,
  Check,
  XCircle,
  RefreshCw,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { DataTable, Column } from '@/components/ui/DataTable'
import { PostloginLayout } from '@/layouts/PostloginLayout'
import {
  SubscriptionPlan,
  SubscribedUser,
  INITIAL_PLANS,
  INITIAL_SUBSCRIBED_USERS,
} from '@/utils/subscriptionData'
import { PlanFormModal } from '@/components/subscription/PlanFormModal'
import { PlanDetailsModal } from '@/components/subscription/PlanDetailsModal'
import { UserSubscriptionDetailsModal } from '@/components/subscription/UserSubscriptionDetailsModal'
import { ChangeUserPlanModal } from '@/components/subscription/ChangeUserPlanModal'

export const Subscriptions: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>(INITIAL_PLANS)
  const [users, setUsers] = useState<SubscribedUser[]>(INITIAL_SUBSCRIBED_USERS)
  const [activeTab, setActiveTab] = useState<'plans' | 'users'>('plans')
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards')

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [viewingPlan, setViewingPlan] = useState<SubscriptionPlan | null>(null)

  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false)
  const [viewingUser, setViewingUser] = useState<SubscribedUser | null>(null)
  const [isChangePlanOpen, setIsChangePlanOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<SubscribedUser | null>(null)

  const handleCreateNewPlan = () => {
    setEditingPlan(null)
    setIsFormModalOpen(true)
  }

  const handleEditPlan = (plan: SubscriptionPlan) => {
    setEditingPlan(plan)
    setIsFormModalOpen(true)
  }

  const handleViewPlan = (plan: SubscriptionPlan) => {
    setViewingPlan(plan)
    setIsDetailsModalOpen(true)
  }

  const handleTogglePlanStatus = (planId: string) => {
    setPlans((prev) =>
      prev.map((p) =>
        p.id === planId
          ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' }
          : p
      )
    )
  }

  const handleDeletePlan = (planId: string) => {
    if (window.confirm('Are you sure you want to delete this subscription plan?')) {
      setPlans((prev) => prev.filter((p) => p.id !== planId))
    }
  }

  const handleSavePlan = (
    planData: Omit<SubscriptionPlan, 'id' | 'status'> & { id?: string }
  ) => {
    if (planData.id) {
      setPlans((prev) =>
        prev.map((p) =>
          p.id === planData.id
            ? {
              ...p,
              name: planData.name,
              billingType: planData.billingType,
              price: planData.price,
              features: planData.features,
            }
            : p
        )
      )
    } else {
      const newPlan: SubscriptionPlan = {
        id: String(Date.now()),
        name: planData.name,
        billingType: planData.billingType,
        price: planData.price,
        status: 'Active',
        features: planData.features,
      }
      setPlans((prev) => [...prev, newPlan])
    }
  }

  const handleViewUser = (user: SubscribedUser) => {
    setViewingUser(user)
    setIsUserDetailsOpen(true)
  }

  const handleChangeUserPlan = (user: SubscribedUser) => {
    setEditingUser(user)
    setIsChangePlanOpen(true)
  }

  const handleToggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === 'Active' ? 'Expired' : 'Active' }
          : u
      )
    )
  }

  const handleSaveUserPlan = (
    userData: Omit<SubscribedUser, 'id' | 'status'> & { id?: string; status?: 'Active' | 'Expired' | 'Cancelled' }
  ) => {
    if (userData.id) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userData.id ? { ...u, ...userData } as SubscribedUser : u))
      )
    } else {
      const newUser: SubscribedUser = {
        id: String(Date.now()),
        businessName: userData.businessName,
        planName: userData.planName,
        startDate: userData.startDate,
        renewalDate: userData.renewalDate,
        status: userData.status || 'Active',
      }
      setUsers((prev) => [...prev, newUser])
    }
  }

  const planColumns: Column<SubscriptionPlan>[] = [
    {
      key: 'name',
      header: 'Plan Name',
      sortable: true,
      render: (row) => (
        <span className="font-bold text-gray-900 text-xs sm:text-sm">
          {row.name}
        </span>
      ),
    },
    {
      key: 'billingType',
      header: 'Billing Type',
      render: (row) => (
        <span className="font-medium text-gray-700 text-xs sm:text-sm">
          {row.billingType}
        </span>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      sortable: true,
      render: (row) => (
        <span className="font-bold text-gray-900 text-xs sm:text-sm">
          {row.price.startsWith('$') ? row.price : `$${row.price}`}
        </span>
      ),
    },
    {
      key: 'features',
      header: 'Features',
      render: (row) => (
        <span className="text-gray-600 text-xs sm:text-sm font-medium">
          {row.features.length} features
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${row.status === 'Active'
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
              : 'bg-gray-100 text-gray-600 border border-gray-200'
            }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleViewPlan(row)}
            className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleEditPlan(row)}
            className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            title="Edit Plan"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleTogglePlanStatus(row.id)}
            className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            title="Toggle Status"
          >
            <Power className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleDeletePlan(row.id)}
            className="p-1 text-red-500 hover:text-red-600 transition-colors cursor-pointer"
            title="Delete Plan"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ]

  const userColumns: Column<SubscribedUser>[] = [
    {
      key: 'businessName',
      header: 'Business Name',
      sortable: true,
      render: (row) => (
        <span className="font-bold text-gray-900 text-xs sm:text-sm">
          {row.businessName}
        </span>
      ),
    },
    {
      key: 'planName',
      header: 'Current Plan',
      render: (row) => (
        <span className="font-medium text-gray-800 text-xs sm:text-sm">
          {row.planName}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${row.status === 'Active'
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
              : 'bg-rose-50 text-rose-600 border border-rose-100'
            }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: 'startDate',
      header: 'Start Date',
      render: (row) => (
        <span className="text-gray-600 text-xs sm:text-sm font-medium">
          {row.startDate}
        </span>
      ),
    },
    {
      key: 'renewalDate',
      header: 'Renewal Date',
      render: (row) => (
        <span className="text-gray-600 text-xs sm:text-sm font-medium">
          {row.renewalDate}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleViewUser(row)}
            className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleChangeUserPlan(row)}
            className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            title="Change Plan"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleToggleUserStatus(row.id)}
            className="p-1 transition-colors cursor-pointer"
            title={row.status === 'Active' ? 'Cancel Subscription' : 'Renew Subscription'}
          >
            {row.status === 'Active' ? (
              <XCircle className="w-4 h-4 text-red-500 hover:text-red-600" />
            ) : (
              <RefreshCw className="w-4 h-4 text-emerald-500 hover:text-emerald-600" />
            )}
          </button>
        </div>
      ),
    },
  ]

  const handleAssignSubscription = () => {
    setEditingUser(null)
    setIsChangePlanOpen(true)
  }

  return (
    <PostloginLayout
      title="Subscription Management"
      subtitle="Manage subscription plans and user subscriptions"
      headerActions={
        activeTab === 'plans' ? (
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4 shrink-0" />}
            onClick={handleCreateNewPlan}
            className="bg-[#0052cc] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            Create Plan
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            leftIcon={<UserPlus className="w-4 h-4 shrink-0" />}
            onClick={handleAssignSubscription}
            className="bg-[#0052cc] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            Assign Subscription
          </Button>
        )
      }
    >
      <div className="space-y-6">
        {/* Navigation Tabs & View Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-3">
          {/* Tabs */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setActiveTab('plans')}
              className={`pb-2.5 text-xs sm:text-sm font-semibold transition-all relative cursor-pointer ${activeTab === 'plans'
                  ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-900 font-medium'
                }`}
            >
              Subscription Plans ({plans.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('users')}
              className={`pb-2.5 text-xs sm:text-sm font-semibold transition-all relative cursor-pointer ${activeTab === 'users'
                  ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-900 font-medium'
                }`}
            >
              Subscribed Users ({users.length})
            </button>
          </div>

          {activeTab === 'plans' && (
            <div className="bg-gray-100/90 p-1 rounded-xl flex items-center gap-1 border border-gray-200/60 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${viewMode === 'cards'
                    ? 'bg-white text-blue-600 shadow-2xs border border-gray-200/60'
                    : 'text-gray-600 hover:text-gray-900 font-medium'
                  }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-2xs border border-gray-200/60'
                    : 'text-gray-600 hover:text-gray-900 font-medium'
                  }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>List</span>
              </button>
            </div>
          )}
        </div>

        {activeTab === 'plans' && (
          <>
            {viewMode === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan) => {
                  const priceVal = plan.price.startsWith('$')
                    ? plan.price
                    : `$${plan.price}`
                  const priceSuffix =
                    plan.billingType.toLowerCase() === 'annual' ? '/yr' : '/mo'
                  const visibleFeatures = plan.features.slice(0, 4)
                  const hiddenFeaturesCount = plan.features.length - 4

                  return (
                    <div
                      key={plan.id}
                      className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                            {plan.name}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${plan.status === 'Active'
                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                : 'bg-gray-100 text-gray-600 border border-gray-200'
                              }`}
                          >
                            {plan.status}
                          </span>
                        </div>

                        <p className="text-xs text-gray-500 font-medium mt-1">
                          {plan.billingType}
                        </p>

                        <div className="mt-4 flex items-baseline gap-0.5">
                          <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            {priceVal}
                          </span>
                          <span className="text-xs text-gray-500 font-normal">
                            {priceSuffix}
                          </span>
                        </div>

                        <p className="text-xs font-semibold text-gray-500 mt-5 mb-2.5">
                          Features:
                        </p>

                        <div className="space-y-2">
                          {visibleFeatures.map((feat, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-medium"
                            >
                              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                              <span className="truncate">{feat}</span>
                            </div>
                          ))}

                          {hiddenFeaturesCount > 0 && (
                            <button
                              type="button"
                              onClick={() => handleViewPlan(plan)}
                              className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer block pt-1"
                            >
                              +{hiddenFeaturesCount} more features
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleViewPlan(plan)}
                          className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEditPlan(plan)}
                          className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                          title="Edit Plan"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTogglePlanStatus(plan.id)}
                          className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                          title="Toggle Status"
                        >
                          <Power className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePlan(plan.id)}
                          className="p-1.5 text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete Plan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {viewMode === 'list' && (
              <DataTable
                columns={planColumns}
                data={plans}
                keyExtractor={(row) => row.id}
                currentPage={1}
                totalPages={10}
              />
            )}
          </>
        )}

        {activeTab === 'users' && (
          <DataTable
            columns={userColumns}
            data={users}
            keyExtractor={(row) => row.id}
            currentPage={1}
            totalPages={10}
          />
        )}
      </div>

      <PlanFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleSavePlan}
        initialData={editingPlan}
      />

      <PlanDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        plan={viewingPlan}
      />

      <UserSubscriptionDetailsModal
        isOpen={isUserDetailsOpen}
        onClose={() => setIsUserDetailsOpen(false)}
        user={viewingUser}
      />

      <ChangeUserPlanModal
        isOpen={isChangePlanOpen}
        onClose={() => setIsChangePlanOpen(false)}
        onSubmit={handleSaveUserPlan}
        user={editingUser}
      />
    </PostloginLayout>
  )
}

export default Subscriptions
