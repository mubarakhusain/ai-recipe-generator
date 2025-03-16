import { SxProps, Theme } from '@mui/material';

interface FooterStyles {
  footer: SxProps<Theme>;
  gridContainer: SxProps<Theme>;
  sectionTitle: SxProps<Theme>;
  link: SxProps<Theme>;
  socialIcons: SxProps<Theme>;
  iconButton: SxProps<Theme>;
  copyright: SxProps<Theme>;
}

export const footerStyles: FooterStyles = {
  footer: {
    bgcolor: 'primary.main',
    color: 'white',
    py: 6,
    mt: 'auto',
    position: 'relative',
    bottom: 0,
    width: '100%',
  },
  gridContainer: {
    mb: 3,
  },
  sectionTitle: {
    fontWeight: 600,
    mb: 2,
  },
  link: {
    display: 'block',
    mb: 1,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      opacity: 0.8,
    },
  },
  socialIcons: {
    display: 'flex',
    gap: 1,
  },
  iconButton: {
    '&:hover': {
      bgcolor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  copyright: {
    mt: 4,
    opacity: 0.8,
  },
}; 