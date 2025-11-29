import { CONFIG } from 'src/global-config';

import { ReceiptsListView } from 'src/sections/receipts/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Receipts | Dashboard - ${CONFIG.appName}` };

export default function Page() {
    return <ReceiptsListView />;
}
