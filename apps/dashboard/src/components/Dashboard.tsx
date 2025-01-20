import Typography from '@mui/material/Typography';
import ApiIcon from '@mui/icons-material/Api';
import ApiChart from './ApiChart';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import {useNavigate,useParams} from 'react-router-dom';
import AvalabilityTable from './AvalabilityTable';
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

export function ApiList() {
    const navigator=useNavigate();

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
                        <ListItemButton onClick={() => navigator(`api/${api.id}`)}
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
export function ApiDetail() {
    const navigator=useNavigate();
    const { api_id } = useParams();
    const api = APIS.find((api) => api.id === Number(api_id));
    
    if (!api) {
        return <Typography>API not found</Typography>;
    }

    return (
        <>
        <Paper  sx={{
      width: {
        xs: '100%',
        sm: '100%', 
        md: '70%', 
      },
      p: {
        xs: 2,
        sm: 3, 
      },
      position: 'relative',
      boxShadow: 3,
      borderRadius: 2,
    }}>
            <Box sx={{ position: 'absolute', top: 16, left: 16, mb: 3 }}>
                <ArrowBack onClick={()=>navigator('/dash')} sx={{
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
            <Box>
                <ApiChart apiId={api.id} />
            </Box>
            <Box>
                <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
                    Availability
                </Typography>
            <AvalabilityTable></AvalabilityTable>
            </Box>
        </Paper>
        </>
    );
}
