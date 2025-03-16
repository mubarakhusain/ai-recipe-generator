import { SxProps, Theme } from '@mui/material';

export const mealTimeSelectorStyles = {
  container: {
    width: '100%',
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '0 1rem',
  } as SxProps<Theme>,

  title: {
    marginBottom: '1.5rem',
    color: '#333333',
    fontWeight: 600,
    textAlign: 'center',
  } as SxProps<Theme>,

  buttonGroup: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
    '& .MuiToggleButton-root': {
      flex: '1 1 calc(50% - 0.5rem)',
      maxWidth: 'calc(50% - 0.5rem)',
      '@media (min-width: 600px)': {
        flex: '1 1 calc(25% - 0.75rem)',
        maxWidth: 'calc(25% - 0.75rem)',
      },
    },
  } as SxProps<Theme>,

  toggleButton: {
    border: '2px solid #e0e0e0',
    borderRadius: '12px !important',
    padding: '1rem',
    '&:hover': {
      backgroundColor: '#FFA50010',
      borderColor: '#FFA500',
    },
    '&.Mui-selected': {
      backgroundColor: '#FFA50020',
      borderColor: '#FFA500',
      color: '#FFA500',
      '&:hover': {
        backgroundColor: '#FFA50030',
      },
    },
  } as SxProps<Theme>,

  buttonContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    '& .MuiTypography-root': {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1.5rem',
    },
  } as SxProps<Theme>,
}; 