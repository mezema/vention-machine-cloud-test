import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useMarketplacePageStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: theme.spacing(2),
  },
}));
