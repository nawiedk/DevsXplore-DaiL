import { CONFIG } from 'src/global-config';

import { AnalyticsDashboardView } from 'src/sections/analytics-dashboard/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Analytics Dashboard | Dashboard - ${CONFIG.appName}` };

export default function Page() {
    return <AnalyticsDashboardView />;
}
