import { SxProps, Theme } from '@mui/material';

export const recipeCardStyles = {
  card: {
    maxWidth: '800px',
    margin: '2rem auto',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  } as SxProps<Theme>,

  media: {
    height: 300,
    objectFit: 'cover',
  } as SxProps<Theme>,

  content: {
    padding: '2rem',
  } as SxProps<Theme>,

  title: {
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#333333',
  } as SxProps<Theme>,

  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  } as SxProps<Theme>,

  tag: {
    backgroundColor: '#FFA50020',
    color: '#FFA500',
    borderRadius: '16px',
    '& .MuiChip-label': {
      fontWeight: 500,
    },
  } as SxProps<Theme>,

  infoContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  } as SxProps<Theme>,

  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    '& .MuiSvgIcon-root': {
      color: '#FFA500',
      fontSize: '1.25rem',
    },
    '& .MuiTypography-root': {
      color: '#666666',
    },
  } as SxProps<Theme>,

  divider: {
    margin: '1.5rem 0',
    borderColor: '#e0e0e0',
  } as SxProps<Theme>,

  sectionTitle: {
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#333333',
    fontSize: '1.25rem',
  } as SxProps<Theme>,

  list: {
    padding: 0,
  } as SxProps<Theme>,

  listItem: {
    padding: '0.5rem 0',
  } as SxProps<Theme>,

  bulletPoint: {
    minWidth: '24px',
    color: '#FFA500',
    fontSize: '1.25rem',
  } as SxProps<Theme>,

  stepNumber: {
    minWidth: '32px',
    color: '#FFA500',
    fontWeight: 600,
  } as SxProps<Theme>,
}; 