import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import type { Router, Session } from '@toolpad/core';
import { DashboardSection } from './components/Dashboard';
import ApiForm from './components/ApiCreateForm';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import SettingsIcon from '@mui/icons-material/Settings';
import Settings from './components/Settings';

const demoTheme = createTheme({
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

function DemoPageContent({
  pathname,
  navigate,
}: {
  pathname: string;
  navigate: (path: string | URL) => void;
}) {
  const [selectedApiId, setSelectedApiId] = React.useState<number | null>(null);

  const handleApiClick = (id: number) => {
    setSelectedApiId(id);
  };

  const handleBack = () => {
    setSelectedApiId(null);
  };
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {pathname.startsWith('/createMonitoring') ? (
        <ApiForm />
      ) : null}
      {pathname.startsWith('/orders') ? (
        <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
          <Button
            onClick={() => {
              navigate('/orders/1');
            }}
          >
            Order 1
          </Button>
          <Button
            onClick={() => {
              navigate('/orders/2');
            }}
          >
            Order 2
          </Button>
          <Button
            onClick={() => {
              navigate('/orders/3');
            }}
          >
            Order 3
          </Button>
        </Stack>
      ) : null}
      {pathname.startsWith('/dashboard') ? (
        <DashboardSection selectedApiId={selectedApiId}
          handleApiClick={handleApiClick}
          handleBack={handleBack} />
      ) : null}

{pathname.startsWith('/settings') ? (
  <Settings />
      ) : null}


    </Box>
  );
}

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function DashboardLayoutPattern(props: DemoProps) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/orders');
  const navigate = React.useCallback(
    (path: string | URL) => setPathname(String(path)),
    [],
  );

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate,
    };
  }, [pathname, navigate]);

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;
  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: 'Bharat Kashyap',
      email: 'bharatkashyap@outlook.com',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: 'Bharat Kashyap',
            email: 'bharatkashyap@outlook.com',
            image: 'https://avatars.githubusercontent.com/u/19550456',
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);
  return (
    // preview-start
    <AppProvider
      navigation={[
        {
          segment: 'dashboard',
          title: 'Dashboard',
          icon: <DashboardIcon />,
        },
        {
          segment: 'orders',
          title: 'Orders',
          icon: <ShoppingCartIcon />,
          pattern: '/orders{/:orderId}*',
        },
        {
          segment: 'createMonitoring',
          title: 'Create Monitoring',
          icon: <AddToQueueIcon />,
        },
        {
          segment: 'settings',
          title: 'Settings',
          icon: <SettingsIcon />,
        },
      ]}
      session={session}
      authentication={authentication}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} navigate={navigate} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}
