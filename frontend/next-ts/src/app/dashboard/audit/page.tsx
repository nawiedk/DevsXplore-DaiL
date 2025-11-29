import { CONFIG } from 'src/global-config';

import { AuditFindingsView } from 'src/sections/audit/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Audit Findings | Dashboard - ${CONFIG.appName}` };

export default function Page() {
    return <AuditFindingsView />;
}
