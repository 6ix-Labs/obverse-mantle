import { useQuery } from "@tanstack/react-query";
import Overview from "../../Components/Dashboard/Overview";
import Transactions from "../../Components/Dashboard/Transactions";
import { getOverview } from "../../api/services/dashboard";
import PreviewMeta from "../../Components/Seo/PreviewMeta";
import Cookies from "js-cookie";
import { getDashboardShareUrl } from "../../utils/shareUrls";

const OverviewPage = () => {
  const { data } = useQuery({
    queryKey: ["overview"],
    queryFn: getOverview,
  });

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const merchantCookie = Cookies.get("merchant");
  const dashboardId = (() => {
    if (!merchantCookie) return "";
    try {
      const parsed = JSON.parse(merchantCookie) as { id?: string };
      return parsed?.id || "";
    } catch {
      return "";
    }
  })();
  const dashboardShareUrl = dashboardId ? getDashboardShareUrl(dashboardId) : "";

  return (
    <div className="container px-6 py-8 mx-auto">
      <PreviewMeta
        title="Dashboard Overview | Obverse"
        description="Overview of your payment activity and recent transactions."
        pageUrl={pageUrl}
        previewImageUrl={data?.dashboard?.previewImageUrl}
      />
      <Overview dashboardShareUrl={dashboardShareUrl} />
      <div className="mt-8">
        <Transactions />
      </div>
    </div>
  );
};

export default OverviewPage;
