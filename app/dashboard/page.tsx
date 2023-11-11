import { lusitana } from "@/app/ui/fonts"
import { fetchRevenue } from "@/app/lib/data"
import RevenueChart from "@/app/ui/dashboard/revenue-chart"
import LatestInvoices from "@/app/ui/dashboard/latest-invoices"

const DashboardPage = async () => {
  const revenue = await fetchRevenue()

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card title="Collected" /> */}
        {/* <Card title="Pending" /> */}
        {/* <Card title="Total Invoices" /> */}
        {/* <Card title="Total Customers" /> */}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8 mt-6">
        <RevenueChart />
        <LatestInvoices />
      </div>
    </main>
  )
}

export default DashboardPage
