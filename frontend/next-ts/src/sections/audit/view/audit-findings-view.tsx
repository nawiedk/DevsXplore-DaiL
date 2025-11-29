'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { alpha, useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const AUDIT_STATS = [
    {
        title: 'Total Issues',
        value: '12',
        icon: 'solar:danger-triangle-bold',
        color: 'error',
        severity: 'high',
    },
    {
        title: 'Duplicates',
        value: '3',
        icon: 'solar:copy-bold',
        color: 'warning',
        severity: 'medium',
    },
    {
        title: 'Missing VAT',
        value: '5',
        icon: 'solar:document-text-bold',
        color: 'info',
        severity: 'low',
    },
    {
        title: 'Resolved',
        value: '8',
        icon: 'solar:check-circle-bold',
        color: 'success',
        severity: 'resolved',
    },
];

// ----------------------------------------------------------------------

export function AuditFindingsView() {
    return (
        <DashboardContent maxWidth="xl">
            <Box sx={{ mb: 3 }}>
                <Box component="h1" sx={{ typography: 'h4', mb: 1 }}>
                    Audit Findings
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Review and resolve compliance issues, duplicates, and anomalies
                </Typography>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {AUDIT_STATS.map((stat) => (
                    <Grid key={stat.title} size={{ xs: 12, sm: 6, md: 3 }}>
                        <AuditStatsCard {...stat} />
                    </Grid>
                ))}
            </Grid>

            {/* Findings */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Duplicates />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <MismatchedTotals />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <SuspiciousCategories />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <MissingVAT />
                </Grid>
            </Grid>
        </DashboardContent>
    );
}

// ----------------------------------------------------------------------

function AuditStatsCard({ title, value, icon, color, severity }: any) {
    const theme = useTheme();

    return (
        <Card>
            <Stack spacing={2} sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Avatar
                        sx={{
                            width: 48,
                            height: 48,
                            bgcolor: alpha(theme.palette[color].main, 0.16),
                            color: `${color}.main`,
                        }}
                    >
                        <Iconify icon={icon} width={24} />
                    </Avatar>

                    <Chip
                        label={severity}
                        size="small"
                        color={color}
                        sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}
                    />
                </Stack>

                <Stack spacing={0.5}>
                    <Typography variant="h3">{value}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {title}
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
}

// ----------------------------------------------------------------------

function Duplicates() {
    const duplicates = [
        {
            id: 1,
            receiptIds: ['RCP-12345', 'RCP-12346'],
            vendor: 'Amazon',
            amount: '$125.50',
            date: '2024-01-15',
            reason: 'Same vendor, amount, and date',
        },
        {
            id: 2,
            receiptIds: ['RCP-23456', 'RCP-23457'],
            vendor: 'Google Cloud',
            amount: '$500.00',
            date: '2024-01-20',
            reason: 'Identical receipt numbers',
        },
        {
            id: 3,
            receiptIds: ['RCP-34567', 'RCP-34568'],
            vendor: 'Microsoft',
            amount: '$89.99',
            date: '2024-02-03',
            reason: 'Duplicate transaction detected',
        },
    ];

    return (
        <Card>
            <CardHeader
                title="Duplicate Receipts"
                subheader={`${duplicates.length} potential duplicates found`}
                avatar={
                    <Avatar sx={{ bgcolor: 'warning.main' }}>
                        <Iconify icon="solar:copy-bold" />
                    </Avatar>
                }
            />
            <Divider />
            <List>
                {duplicates.map((item, index) => (
                    <Box key={item.id}>
                        <ListItem sx={{ py: 2 }}>
                            <ListItemIcon>
                                <Iconify icon="solar:danger-triangle-bold" color="warning.main" width={28} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                                        <Typography variant="subtitle2">{item.vendor}</Typography>
                                        <Chip label={item.amount} size="small" variant="outlined" />
                                        <Chip label={item.date} size="small" color="default" />
                                    </Stack>
                                }
                                secondary={
                                    <Stack spacing={0.5} sx={{ mt: 1 }}>
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                            {item.reason}
                                        </Typography>
                                        <Stack direction="row" spacing={0.5}>
                                            {item.receiptIds.map((id) => (
                                                <Chip key={id} label={id} size="small" color="warning" variant="outlined" />
                                            ))}
                                        </Stack>
                                    </Stack>
                                }
                            />
                        </ListItem>
                        {index < duplicates.length - 1 && <Divider />}
                    </Box>
                ))}
            </List>
        </Card>
    );
}

// ----------------------------------------------------------------------

function MismatchedTotals() {
    const mismatches = [
        {
            id: 1,
            receiptId: 'RCP-56789',
            vendor: 'Apple Store',
            declared: '$150.00',
            calculated: '$148.50',
            difference: '$1.50',
        },
        {
            id: 2,
            receiptId: 'RCP-67890',
            vendor: 'Starbucks',
            declared: '$89.99',
            calculated: '$91.49',
            difference: '-$1.50',
        },
    ];

    return (
        <Card>
            <CardHeader
                title="Mismatched Totals"
                subheader={`${mismatches.length} receipts with calculation errors`}
                avatar={
                    <Avatar sx={{ bgcolor: 'error.main' }}>
                        <Iconify icon="solar:calculator-bold" />
                    </Avatar>
                }
            />
            <Divider />
            <List>
                {mismatches.map((item, index) => (
                    <Box key={item.id}>
                        <ListItem sx={{ py: 2 }}>
                            <ListItemIcon>
                                <Iconify icon="solar:danger-bold" color="error.main" width={28} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                                        <Typography variant="subtitle2">{item.vendor}</Typography>
                                        <Chip label={item.receiptId} size="small" variant="outlined" />
                                    </Stack>
                                }
                                secondary={
                                    <Stack spacing={0.5} sx={{ mt: 1 }}>
                                        <Stack direction="row" spacing={2}>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                Declared: <strong>{item.declared}</strong>
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                Calculated: <strong>{item.calculated}</strong>
                                            </Typography>
                                        </Stack>
                                        <Chip
                                            label={`Difference: ${item.difference}`}
                                            size="small"
                                            color="error"
                                            variant="outlined"
                                            sx={{ width: 'fit-content' }}
                                        />
                                    </Stack>
                                }
                            />
                        </ListItem>
                        {index < mismatches.length - 1 && <Divider />}
                    </Box>
                ))}
            </List>
        </Card>
    );
}

// ----------------------------------------------------------------------

function SuspiciousCategories() {
    const suspicious = [
        {
            id: 1,
            receiptId: 'RCP-78901',
            vendor: 'Wine Shop',
            category: 'Alcohol',
            amount: '$85.00',
            date: '2024-01-25',
        },
        {
            id: 2,
            receiptId: 'RCP-89012',
            vendor: 'Convenience Store',
            category: 'Tobacco',
            amount: '$25.00',
            date: '2024-02-01',
        },
    ];

    return (
        <Card>
            <CardHeader
                title="Suspicious Categories"
                subheader={`${suspicious.length} flagged purchases`}
                avatar={
                    <Avatar sx={{ bgcolor: 'error.main' }}>
                        <Iconify icon="solar:forbidden-circle-bold" />
                    </Avatar>
                }
            />
            <Divider />
            <List>
                {suspicious.map((item, index) => (
                    <Box key={item.id}>
                        <ListItem sx={{ py: 2 }}>
                            <ListItemIcon>
                                <Iconify icon="solar:shield-warning-bold" color="error.main" width={28} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                                        <Typography variant="subtitle2">{item.vendor}</Typography>
                                        <Chip label={item.category} size="small" color="error" />
                                        <Chip label={item.amount} size="small" variant="outlined" />
                                    </Stack>
                                }
                                secondary={
                                    <Stack spacing={0.5} sx={{ mt: 1 }}>
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                            {item.category} purchase detected on {item.date}
                                        </Typography>
                                        <Chip
                                            label={item.receiptId}
                                            size="small"
                                            variant="outlined"
                                            sx={{ width: 'fit-content' }}
                                        />
                                    </Stack>
                                }
                            />
                        </ListItem>
                        {index < suspicious.length - 1 && <Divider />}
                    </Box>
                ))}
            </List>
        </Card>
    );
}

// ----------------------------------------------------------------------

function MissingVAT() {
    const missingVAT = [
        {
            id: 1,
            receiptId: 'RCP-90123',
            vendor: 'Local Supplier',
            amount: '$200.00',
            reason: 'No VAT number provided',
            date: '2024-01-18',
        },
        {
            id: 2,
            receiptId: 'RCP-01234',
            vendor: 'Freelancer Services',
            amount: '$500.00',
            reason: 'Missing VAT breakdown',
            date: '2024-01-22',
        },
        {
            id: 3,
            receiptId: 'RCP-12340',
            vendor: 'Office Supplies Co',
            amount: '$75.00',
            reason: 'Invalid VAT format',
            date: '2024-02-05',
        },
        {
            id: 4,
            receiptId: 'RCP-23401',
            vendor: 'Tech Services Ltd',
            amount: '$350.00',
            reason: 'VAT number not verified',
            date: '2024-02-10',
        },
        {
            id: 5,
            receiptId: 'RCP-34012',
            vendor: 'Consulting Group',
            amount: '$1,200.00',
            reason: 'Missing VAT registration',
            date: '2024-02-15',
        },
    ];

    return (
        <Card>
            <CardHeader
                title="Missing VAT Information"
                subheader={`${missingVAT.length} receipts require attention`}
                avatar={
                    <Avatar sx={{ bgcolor: 'info.main' }}>
                        <Iconify icon="solar:document-text-bold" />
                    </Avatar>
                }
            />
            <Divider />
            <List>
                {missingVAT.map((item, index) => (
                    <Box key={item.id}>
                        <ListItem sx={{ py: 2 }}>
                            <ListItemIcon>
                                <Iconify icon="solar:info-circle-bold" color="info.main" width={28} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                                        <Typography variant="subtitle2">{item.vendor}</Typography>
                                        <Chip label={item.amount} size="small" variant="outlined" />
                                        <Chip label={item.date} size="small" color="default" />
                                    </Stack>
                                }
                                secondary={
                                    <Stack spacing={0.5} sx={{ mt: 1 }}>
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                            {item.reason}
                                        </Typography>
                                        <Chip
                                            label={item.receiptId}
                                            size="small"
                                            color="info"
                                            variant="outlined"
                                            sx={{ width: 'fit-content' }}
                                        />
                                    </Stack>
                                }
                            />
                        </ListItem>
                        {index < missingVAT.length - 1 && <Divider />}
                    </Box>
                ))}
            </List>
        </Card>
    );
}
