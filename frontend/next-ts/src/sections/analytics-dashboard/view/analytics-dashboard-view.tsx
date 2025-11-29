'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';

import { DashboardContent } from 'src/layouts/dashboard';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export function AnalyticsDashboardView() {
    return (
        <DashboardContent maxWidth="xl">
            <Box sx={{ mb: 2 }}>
                <Box component="h1" sx={{ typography: 'h4' }}>Analytics Dashboard</Box>
            </Box>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <CategorySpending />
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 8 }}>
                    <MonthlySpend />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <VendorSummary />
                </Grid>
            </Grid>
        </DashboardContent>
    );
}

// ----------------------------------------------------------------------

function CategorySpending() {
    const chartOptions = useChart({
        labels: ['Office Supplies', 'Software', 'Travel', 'Marketing', 'Other'],
        stroke: { colors: ['transparent'] },
        legend: { floating: true, horizontalAlign: 'center' },
        dataLabels: { enabled: true, dropShadow: { enabled: false } },
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (value: number) => `$${value}`,
                title: {
                    formatter: (seriesName: string) => `${seriesName}`,
                },
            },
        },
        plotOptions: {
            pie: { donut: { labels: { show: false } } },
        },
    });

    return (
        <Card>
            <CardHeader title="Category Spending" />
            <Chart
                type="pie"
                series={[44, 55, 13, 43, 22]}
                options={chartOptions}
                sx={{ width: '100%', height: 300 }}
            />
        </Card>
    );
}

// ----------------------------------------------------------------------

function MonthlySpend() {
    const chartOptions = useChart({
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        tooltip: {
            y: {
                formatter: (value: number) => `$${value}`,
            },
        },
    });

    return (
        <Card>
            <CardHeader title="Monthly Spend" />
            <Chart
                type="bar"
                series={[{ name: 'Spend', data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49] }]}
                options={chartOptions}
                sx={{ width: '100%', height: 320 }}
            />
        </Card>
    );
}

// ----------------------------------------------------------------------

import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import { Scrollbar } from 'src/components/scrollbar';

function VendorSummary() {
    return (
        <Card>
            <CardHeader title="Vendor Summary" sx={{ mb: 3 }} />
            <TableContainer sx={{ overflow: 'unset' }}>
                <Scrollbar>
                    <Table sx={{ minWidth: 640 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Vendor</TableCell>
                                <TableCell>Total Spend</TableCell>
                                <TableCell>Transactions</TableCell>
                                <TableCell>Average Transaction</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[
                                { vendor: 'Amazon', total: 1200, transactions: 10, average: 120 },
                                { vendor: 'Google Cloud', total: 5000, transactions: 5, average: 1000 },
                                { vendor: 'Uber', total: 300, transactions: 15, average: 20 },
                            ].map((row) => (
                                <TableRow key={row.vendor}>
                                    <TableCell>{row.vendor}</TableCell>
                                    <TableCell>${row.total}</TableCell>
                                    <TableCell>{row.transactions}</TableCell>
                                    <TableCell>${row.average}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Scrollbar>
            </TableContainer>
        </Card>
    );
}
