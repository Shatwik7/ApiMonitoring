import { createTheme } from '@mui/material/styles';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import {Outlet} from 'react-router-dom';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Dashboard',
  },
  {
    segment: 'dash',
    title: 'Monit',
    icon: <BarChartIcon />,
  },
  {
    segment: 'dash/createMonitoring',
    title: 'Create Monitoring',
    icon: <AddToQueueIcon/>,
  },
  {
    segment:'dash/incident',
    title:'Incident',
    icon: <GppMaybeIcon />
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },

  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'dash/settings',
    title: 'Settings',
    icon: <SettingsIcon />,
  },
];

const Theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});



interface DemoProps {
  window?: () => Window;
}

export default function DashboardLayoutBasic(props: DemoProps) {
  const { window } = props;

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={Theme}
      window={demoWindow}
    >
      <DashboardLayout>
      <Box
     sx={{
      py: 4,
      margin: '20px',
      textAlign: 'center', // Center text
      display: 'block', // Prevent parent from using flex
    }}
    >
      <Outlet />
      </Box>
      </DashboardLayout>
    </AppProvider>
  );
}