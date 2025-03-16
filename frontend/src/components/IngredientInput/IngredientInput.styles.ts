import { SxProps, Theme } from '@mui/material';

export const ingredientInputStyles = {
  container: {
    width: '100%',
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '0 1rem',
  } as SxProps<Theme>,

  title: {
    marginBottom: '1rem',
    color: '#333333',
    fontWeight: 600,
    textAlign: 'center',
  } as SxProps<Theme>,

  paper: {
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  } as SxProps<Theme>,

  input: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '& fieldset': {
        borderColor: '#e0e0e0',
      },
      '&:hover fieldset': {
        borderColor: '#FFA500',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FFA500',
      },
    },
  } as SxProps<Theme>,

  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '1rem',
    minHeight: '48px',
  } as SxProps<Theme>,

  chip: {
    backgroundColor: '#FFA50020',
    color: '#FFA500',
    borderRadius: '16px',
    '& .MuiChip-deleteIcon': {
      color: '#FFA500',
      '&:hover': {
        color: '#FF8C00',
      },
    },
  } as SxProps<Theme>,
}; 