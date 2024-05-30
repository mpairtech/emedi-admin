import React from 'react'
import DashboardStatsGrid from '../components/DashboardStatsGrid'
import TransactionChart from '../components/TransactionChart'
import RecentOrders from '../components/RecentOrders'



export default function Dashboard() {
	return (
		<div className="gap-4">
			<DashboardStatsGrid />

      <div className="gap-4 w-full">
				<TransactionChart />
			</div>

      <div className="gap-4 w-full">
				<RecentOrders />
			</div>

		</div>
	)
}