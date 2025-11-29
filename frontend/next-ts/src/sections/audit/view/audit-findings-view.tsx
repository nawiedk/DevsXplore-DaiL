'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function AuditFindingsView() {
    return (
        <DashboardContent maxWidth="xl">
            <Box sx={{ mb: 2 }}>
                <Box component="h1" sx={{ typography: 'h4' }}>Audit Findings</Box>
            </Box>

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

function Duplicates() {
    return (
        <Card>
            <CardHeader title="Duplicates" />
            <List>
                {[
                    { id: 1, text: 'Duplicate receipt #12345' },
                    { id: 2, text: 'Duplicate transaction on 2023-10-27' },
                ].map((item) => (
                    <ListItem key={item.id}>
                        <ListItemIcon>
                            <Iconify icon="solar:danger-triangle-bold" color="error.main" />
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Card>
    );
}

// ----------------------------------------------------------------------

function MismatchedTotals() {
    return (
        <Card>
            <CardHeader title="Mismatched Totals" />
            <List>
                {[
                    { id: 1, text: 'Receipt #56789 total does not match line items' },
                ].map((item) => (
                    <ListItem key={item.id}>
                        <ListItemIcon>
                            <Iconify icon="solar:danger-bold" color="warning.main" />
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Card>
    );
}

// ----------------------------------------------------------------------

function SuspiciousCategories() {
    return (
        <Card>
            <CardHeader title="Suspicious Categories" />
            <List>
                {[
                    { id: 1, text: 'Alcohol purchase detected' },
                    { id: 2, text: 'Tobacco purchase detected' },
                ].map((item) => (
                    <ListItem key={item.id}>
                        <ListItemIcon>
                            <Iconify icon="solar:forbidden-circle-bold" color="error.main" />
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Card>
    );
}

// ----------------------------------------------------------------------

function MissingVAT() {
    return (
        <Card>
            <CardHeader title="Missing VAT" />
            <List>
                {[
                    { id: 1, text: 'Receipt #90123 missing VAT number' },
                ].map((item) => (
                    <ListItem key={item.id}>
                        <ListItemIcon>
                            <Iconify icon="solar:stop-circle-bold" color="info.main" />
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Card>
    );
}
