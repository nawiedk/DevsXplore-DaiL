'use client';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    receiptIds?: string[];
    timestamp: Date;
};

const EXAMPLE_QUERIES = [
    'Show me all travel receipts above 100 EUR',
    'How much did we spend on hardware last quarter?',
    'Which receipts contain alcohol?',
    'Find duplicates',
];

// ----------------------------------------------------------------------

export function ChatAuditorView() {
    const theme = useTheme();
    const router = useRouter();

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Hello! I\'m your AI Auditor assistant. Ask me anything about your receipts and expenses.',
            timestamp: new Date(),
        },
    ]);

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = useCallback(
        async (query: string) => {
            if (!query.trim()) return;

            const userMessage: Message = {
                id: Date.now().toString(),
                role: 'user',
                content: query,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, userMessage]);
            setInput('');
            setIsLoading(true);

            // Simulate API call
            setTimeout(() => {
                const assistantMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: getMockResponse(query),
                    receiptIds: ['RCP-001', 'RCP-002'],
                    timestamp: new Date(),
                };

                setMessages((prev) => [...prev, assistantMessage]);
                setIsLoading(false);
            }, 1500);
        },
        []
    );

    const handleExampleClick = useCallback(
        (query: string) => {
            handleSendMessage(query);
        },
        [handleSendMessage]
    );

    const handleKeyPress = useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSendMessage(input);
            }
        },
        [input, handleSendMessage]
    );

    const handleReceiptClick = useCallback(
        (receiptId: string) => {
            router.push(paths.dashboard.general.receipts);
        },
        [router]
    );

    return (
        <DashboardContent maxWidth="xl">
            <Box sx={{ mb: 2 }}>
                <Box component="h1" sx={{ typography: 'h4' }}>
                    AI Auditor
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Ask questions about your receipts and expenses
                </Typography>
            </Box>

            <Card sx={{ height: 'calc(100vh - 280px)', display: 'flex', flexDirection: 'column' }}>
                {/* Example Queries */}
                <Box sx={{ p: 2, borderBottom: `1px solid ${alpha(theme.palette.grey[500], 0.12)}` }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                        Try these examples:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {EXAMPLE_QUERIES.map((query) => (
                            <Button
                                key={query}
                                size="small"
                                variant="outlined"
                                onClick={() => handleExampleClick(query)}
                                sx={{ mb: 1 }}
                            >
                                {query}
                            </Button>
                        ))}
                    </Stack>
                </Box>

                {/* Messages */}
                <Scrollbar sx={{ flex: 1, p: 3 }}>
                    <Stack spacing={2}>
                        {messages.map((message) => (
                            <MessageItem
                                key={message.id}
                                message={message}
                                onReceiptClick={handleReceiptClick}
                            />
                        ))}

                        {isLoading && (
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Avatar
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        bgcolor: 'primary.main',
                                    }}
                                >
                                    <Iconify icon="solar:chat-round-dots-bold" width={24} />
                                </Avatar>
                                <Box
                                    sx={{
                                        p: 2,
                                        borderRadius: 1.5,
                                        bgcolor: alpha(theme.palette.grey[500], 0.08),
                                        maxWidth: '70%',
                                    }}
                                >
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Analyzing...
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Stack>
                </Scrollbar>

                {/* Input */}
                <Box sx={{ p: 2, borderTop: `1px solid ${alpha(theme.palette.grey[500], 0.12)}` }}>
                    <TextField
                        fullWidth
                        multiline
                        maxRows={4}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about your receipts..."
                        disabled={isLoading}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleSendMessage(input)}
                                        disabled={!input.trim() || isLoading}
                                    >
                                        <Iconify icon="solar:pen-bold" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Card>
        </DashboardContent>
    );
}

// ----------------------------------------------------------------------

function MessageItem({
    message,
    onReceiptClick,
}: {
    message: Message;
    onReceiptClick: (id: string) => void;
}) {
    const theme = useTheme();
    const isUser = message.role === 'user';

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                justifyContent: isUser ? 'flex-end' : 'flex-start',
            }}
        >
            {!isUser && (
                <Avatar
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: 'primary.main',
                    }}
                >
                    <Iconify icon="solar:chat-round-dots-bold" width={24} />
                </Avatar>
            )}

            <Box sx={{ maxWidth: '70%' }}>
                <Box
                    sx={{
                        p: 2,
                        borderRadius: 1.5,
                        bgcolor: isUser
                            ? 'primary.main'
                            : alpha(theme.palette.grey[500], 0.08),
                        color: isUser ? 'primary.contrastText' : 'text.primary',
                    }}
                >
                    <Typography variant="body2">{message.content}</Typography>

                    {message.receiptIds && message.receiptIds.length > 0 && (
                        <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: 'wrap' }} useFlexGap>
                            {message.receiptIds.map((id) => (
                                <Button
                                    key={id}
                                    size="small"
                                    variant="outlined"
                                    onClick={() => onReceiptClick(id)}
                                    sx={{
                                        borderColor: isUser ? 'primary.contrastText' : 'primary.main',
                                        color: isUser ? 'primary.contrastText' : 'primary.main',
                                        '&:hover': {
                                            borderColor: isUser ? 'primary.contrastText' : 'primary.dark',
                                            bgcolor: isUser
                                                ? alpha(theme.palette.common.white, 0.1)
                                                : alpha(theme.palette.primary.main, 0.08),
                                        },
                                    }}
                                >
                                    {id}
                                </Button>
                            ))}
                        </Stack>
                    )}
                </Box>

                <Typography
                    variant="caption"
                    sx={{
                        color: 'text.disabled',
                        mt: 0.5,
                        display: 'block',
                        textAlign: isUser ? 'right' : 'left',
                    }}
                >
                    {message.timestamp.toLocaleTimeString()}
                </Typography>
            </Box>

            {isUser && (
                <Avatar
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: 'grey.400',
                    }}
                >
                    <Iconify icon="solar:user-id-bold" width={24} />
                </Avatar>
            )}
        </Box>
    );
}

// ----------------------------------------------------------------------

function getMockResponse(query: string): string {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('travel') || lowerQuery.includes('100')) {
        return 'I found 2 travel receipts above 100 EUR. See the receipt IDs below for details.';
    }

    if (lowerQuery.includes('hardware') || lowerQuery.includes('quarter')) {
        return 'Total hardware spending last quarter was €2,450. This includes 5 transactions from various vendors.';
    }

    if (lowerQuery.includes('alcohol')) {
        return 'I found 1 receipt containing alcohol purchases. This has been flagged in the audit findings.';
    }

    if (lowerQuery.includes('duplicate')) {
        return 'I found 2 potential duplicate receipts with matching amounts and dates. Please review the receipts below.';
    }

    return 'I understand your query. Based on the current receipt data, I can help you analyze expenses, find specific categories, detect anomalies, and more. Could you please provide more specific details?';
}
