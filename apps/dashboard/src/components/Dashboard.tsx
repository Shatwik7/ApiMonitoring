import Typography from '@mui/material/Typography';
import ApiIcon from '@mui/icons-material/Api';
import ApiChart from './ApiChart';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
interface Api {
    id: number;
    name: string;
    url: string;
}
const APIS: Api[] = [
    { id: 1, name: 'API 1', url: 'https://httpbin.org/get' },
    { id: 2, name: 'API 2', url: 'https://jsonplaceholder.typicode.com/posts' },
    // Add more APIs here
];

function ApiList({ onApiClick }: { onApiClick: (id: number) => void }) {
    return (
        <Paper sx={{ width: '100%', p: 2, boxShadow: 3 }}>
            <List sx={{ p: 0 }}>
                {APIS.map((api) => (
                    <ListItem
                        key={api.id}
                        disablePadding
                        sx={{
                            borderBottom: '1px solid #e0e0e0',
                            transition: 'background-color 0.3s ease',
                        }}
                    >
                        <ListItemButton onClick={() => onApiClick(api.id)}
                            sx={{ p: 0.5 }}>
                            <ListItemIcon>
                                <ApiIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography variant="h6">{api.name}</Typography>}
                                secondary={<Typography variant="body2" color="textSecondary">{api.url}</Typography>}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}
function ApiDetail({ apiId, onBack }: { apiId: number; onBack: () => void }) {
    const api = APIS.find((api) => api.id === apiId);

    if (!api) {
        return <Typography>API not found</Typography>;
    }

    return (
        <Paper sx={{ width: '100%', p: 2, position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 16, left: 16, mb: 3 }}>
                <ArrowBack onClick={onBack} sx={{
                    fontSize: 24,
                    color: 'gray',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                        transition: "0.4s",
                        scale: 1.5
                    },
                    '&:active': {
                        transform: 'scale(0.9)',
                    },
                }} />
            </Box>
            <Box sx={{ mt: 10 }}>
                <ApiChart apiId={api.id} />
            </Box>
        </Paper>
    );
}
export const DashboardSection = ({ selectedApiId, handleApiClick, handleBack }: any) => {
    return (
        <>
            {selectedApiId ? (
                <ApiDetail apiId={selectedApiId} onBack={handleBack} />
            ) : (
                <ApiList onApiClick={handleApiClick} />
            )}
        </>);
}