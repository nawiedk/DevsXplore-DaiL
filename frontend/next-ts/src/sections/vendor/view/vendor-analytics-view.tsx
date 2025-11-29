'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';

import { DashboardContent } from 'src/layouts/dashboard';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export function VendorAnalyticsView() {
    return (
        <DashboardContent maxWidth="xl">
            <Box sx={{ mb: 2 }}>
                <Box component="h1" sx={{ typography: 'h4' }}>Vendor Analytics</Box>
            </Box>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TopMerchants />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <SpendingTrends />
                </Grid>
            </Grid>
        </DashboardContent>
    );
}

// ----------------------------------------------------------------------

function TopMerchants() {
    const chartOptions = useChart({
        chart: { sparkline: { enabled: true } },
        plotOptions: {
            bar: { borderRadius: 2, columnWidth: '80%' },
        },
        xaxis: {
            categories: ['Amazon', 'Google', 'Uber', 'Apple', 'Microsoft'],
        },
        tooltip: {
            y: {
                formatter: (value: number) => `$${value}`,
            },
        },
    });

    return (
        <Card>
            <CardHeader title="Top Merchants" />
            <Box sx={{ p: 3, pb: 1 }}>
                <Chart
                    type="bar"
                    series={[{ data: [1200, 5000, 300, 2000, 1500] }]}
                    options={chartOptions}
                    sx={{ width: '100%', height: 300 }}
                />
            </Box>
        </Card>
    );
}

// ----------------------------------------------------------------------

function SpendingTrends() {
    const chartOptions = useChart({
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        },
        tooltip: {
            y: {
                formatter: (value: number) => `$${value}`,
            },
        },
    });

    return (
        <Card>
            <CardHeader title="Spending Trends" />
            <Box sx={{ p: 3, pb: 1 }}>
                <Chart
                    type="line"
                    series={[
                        { name: 'Amazon', data: [100, 200, 150, 300, 250, 400] },
                        { name: 'Google', data: [500, 600, 550, 700, 650, 800] },
                    ]}
                    options={chartOptions}
                    sx={{ width: '100%', height: 300 }}
                />
            </Box>
        </Card>
    );
}
