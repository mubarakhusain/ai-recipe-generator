import { SxProps, Theme } from '@mui/material';

export const moodCuisineSelectorStyles = {
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

  input: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
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

  chip: {
    backgroundColor: '#FFA50020',
    color: '#FFA500',
    borderRadius: '16px',
    margin: '2px',
    '& .MuiChip-deleteIcon': {
      color: '#FFA500',
      '&:hover': {
        color: '#FF8C00',
      },
    },
    '& .MuiSvgIcon-root': {
      color: '#FFA500',
    },
  } as SxProps<Theme>,

  option: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    '&:hover': {
      backgroundColor: '#FFA50010',
    },
    '&[aria-selected="true"]': {
      backgroundColor: '#FFA50020',
    },
    '& .MuiSvgIcon-root': {
      color: '#FFA500',
      fontSize: '1.25rem',
    },
  } as SxProps<Theme>,

  optionText: {
    flex: 1,
    fontSize: '0.875rem',
  } as SxProps<Theme>,

  optionType: {
    color: '#666666',
    textTransform: 'capitalize',
    fontSize: '0.75rem',
    marginLeft: 'auto',
  } as SxProps<Theme>,
}; 