import { CONFIG } from 'src/global-config';

import { VendorAnalyticsView } from 'src/sections/vendor/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Vendor Analytics | Dashboard - ${CONFIG.appName}` };

export default function Page() {
    return <VendorAnalyticsView />;
}
