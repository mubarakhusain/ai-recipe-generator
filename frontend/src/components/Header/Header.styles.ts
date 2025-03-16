import { SxProps, Theme } from '@mui/material';

export const headerStyles = {
  appBar: {
    backgroundColor: '#FFA500',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  } as SxProps<Theme>,

  logo: {
    fontSize: '2rem',
    color: '#fff',
  } as SxProps<Theme>,

  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    fontFamily: '"Poppins", "Open Sans", sans-serif',
    color: '#fff',
    letterSpacing: '0.5px',
  } as SxProps<Theme>,

  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  } as SxProps<Theme>,
}; 