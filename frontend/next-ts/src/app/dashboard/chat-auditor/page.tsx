import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { ChatAuditorView } from 'src/sections/chat-auditor/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `AI Auditor - ${CONFIG.appName}` };

export default function Page() {
    return <ChatAuditorView />;
}
