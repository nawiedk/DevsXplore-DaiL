'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { alpha, useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

const VENDOR_STATS = [
    {
        title: 'Total Vendors',
        value: '24',
        icon: 'solar:users-group-rounded-bold',
        color: 'primary',
        change: '+12%',
        changeType: 'increase',
    },
    {
        title: 'Total Spend',
        value: '$12,450',
        icon: 'solar:dollar-bold',
        color: 'success',
        change: '+8.2%',
        changeType: 'increase',
    },
    {
        title: 'Avg Transaction',
        value: '$518',
        icon: 'solar:chart-2-bold',
        color: 'warning',
        change: '-3.1%',
        changeType: 'decrease',
    },
    {
        title: 'Active Contracts',
        value: '18',
        icon: 'solar:document-text-bold',
        color: 'info',
        change: '+5',
        changeType: 'increase',
    },
];

// ----------------------------------------------------------------------

export function VendorAnalyticsView() {
    return (
        <DashboardContent maxWidth="xl">
            <Box sx={{ mb: 3 }}>
                <Box component="h1" sx={{ typography: 'h4', mb: 1 }}>
                    Vendor Analytics
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Track vendor performance, spending patterns, and contract status
                </Typography>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {VENDOR_STATS.map((stat) => (
                    <Grid key={stat.title} size={{ xs: 12, sm: 6, md: 3 }}>
                        <StatsCard {...stat} />
                    </Grid>
                ))}
            </Grid>

            {/* Charts */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 8 }}>
                    <SpendingTrends />
                </Grid>

                <Grid size={{ xs: 12, lg: 4 }}>
                    <TopMerchants />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <VendorDistribution />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <PaymentMethods />
                </Grid>
            </Grid>
        </DashboardContent>
    );
}

// ----------------------------------------------------------------------

function StatsCard({ title, value, icon, color, change, changeType }: any) {
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

                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Iconify
                            icon={
                                changeType === 'increase'
                                    ? 'solar:alt-arrow-up-bold'
                                    : 'solar:alt-arrow-down-bold'
                            }
                            width={16}
                            sx={{
                                color: changeType === 'increase' ? 'success.main' : 'error.main',
                            }}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                color: changeType === 'increase' ? 'success.main' : 'error.main',
                                fontWeight: 'bold',
                            }}
                        >
                            {change}
                        </Typography>
                    </Stack>
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

function TopMerchants() {
    const chartOptions = useChart({
        chart: { sparkline: { enabled: false } },
        plotOptions: {
            bar: {
                borderRadius: 8,
                horizontal: true,
                barHeight: '60%',
            },
        },
        xaxis: {
            categories: ['Amazon', 'Google Cloud', 'Microsoft', 'Apple', 'Uber'],
        },
        colors: ['#00AB55'],
        tooltip: {
            y: {
                formatter: (value: number) => `$${value.toLocaleString()}`,
            },
        },
    });

    return (
        <Card>
            <CardHeader
                title="Top Vendors"
                subheader="By total spend"
            />
            <Box sx={{ p: 3, pt: 0 }}>
                <Chart
                    type="bar"
                    series={[{ name: 'Spend', data: [5200, 4800, 3200, 2800, 1200] }]}
                    options={chartOptions}
                    sx={{ width: '100%', height: 360 }}
                />
            </Box>
        </Card>
    );
}

// ----------------------------------------------------------------------

function SpendingTrends() {
    const chartOptions = useChart({
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        stroke: {
            width: 3,
            curve: 'smooth',
        },
        tooltip: {
            y: {
                formatter: (value: number) => `$${value.toLocaleString()}`,
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
        },
    });

    return (
        <Card>
            <CardHeader
                title="Spending Trends"
                subheader="Monthly vendor spending comparison"
            />
            <Box sx={{ p: 3, pt: 0 }}>
                <Chart
                    type="line"
                    series={[
                        { name: 'Amazon', data: [850, 920, 780, 1100, 950, 1200, 1050, 980, 1150, 1300, 1100, 1250] },
                        { name: 'Google Cloud', data: [1200, 1300, 1250, 1400, 1350, 1500, 1450, 1380, 1520, 1600, 1480, 1650] },
                        { name: 'Microsoft', data: [650, 700, 680, 750, 720, 800, 780, 760, 820, 850, 800, 880] },
                    ]}
                    options={chartOptions}
                    sx={{ width: '100%', height: 360 }}
                />
            </Box>
        </Card>
    );
}

// ----------------------------------------------------------------------

function VendorDistribution() {
    const chartOptions = useChart({
        labels: ['Software', 'Hardware', 'Services', 'Supplies', 'Travel'],
        colors: ['#00AB55', '#00B8D9', '#FFAB00', '#FF5630', '#7635DC'],
        legend: {
            position: 'bottom',
        },
        tooltip: {
            y: {
                formatter: (value: number) => `$${value.toLocaleString()}`,
            },
        },
    });

    return (
        <Card>
            <CardHeader
                title="Vendor Distribution"
                subheader="By category"
            />
            <Box sx={{ p: 3, pt: 0 }}>
                <Chart
                    type="donut"
                    series={[5200, 2800, 1800, 1200, 1000]}
                    options={chartOptions}
                    sx={{ width: '100%', height: 300 }}
                />
            </Box>
        </Card>
    );
}

// ----------------------------------------------------------------------

function PaymentMethods() {
    const chartOptions = useChart({
        chart: { sparkline: { enabled: false } },
        plotOptions: {
            bar: {
                borderRadius: 8,
                columnWidth: '50%',
            },
        },
        xaxis: {
            categories: ['Credit Card', 'Bank Transfer', 'PayPal', 'Check', 'Cash'],
        },
        colors: ['#7635DC'],
        tooltip: {
            y: {
                formatter: (value: number) => `${value} transactions`,
            },
        },
    });

    return (
        <Card>
            <CardHeader
                title="Payment Methods"
                subheader="Transaction count by method"
            />
            <Box sx={{ p: 3, pt: 0 }}>
                <Chart
                    type="bar"
                    series={[{ name: 'Transactions', data: [145, 98, 67, 34, 12] }]}
                    options={chartOptions}
                    sx={{ width: '100%', height: 300 }}
                />
            </Box>
        </Card>
    );
}
