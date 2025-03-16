import { Box, Container, Grid, Link, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { footerStyles } from './Footer.styles';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    about: [
      { text: 'About Us', href: '#' },
      { text: 'Contact', href: '#' },
      { text: 'Terms of Service', href: '#' },
      { text: 'Privacy Policy', href: '#' },
    ],
    recipes: [
      { text: 'Recipe Index', href: '#' },
      { text: 'Popular Recipes', href: '#' },
      { text: 'Latest Recipes', href: '#' },
      { text: 'Submit Recipe', href: '#' },
    ],
    resources: [
      { text: 'Cooking Tips', href: '#' },
      { text: 'Kitchen Guide', href: '#' },
      { text: 'Meal Planning', href: '#' },
      { text: 'FAQ', href: '#' },
    ],
  };

  return (
    <Box component="footer" sx={footerStyles.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={footerStyles.gridContainer}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={footerStyles.sectionTitle}>
              About
            </Typography>
            {links.about.map((link) => (
              <Link
                key={link.text}
                href={link.href}
                sx={footerStyles.link}
                color="inherit"
              >
                {link.text}
              </Link>
            ))}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={footerStyles.sectionTitle}>
              Recipes
            </Typography>
            {links.recipes.map((link) => (
              <Link
                key={link.text}
                href={link.href}
                sx={footerStyles.link}
                color="inherit"
              >
                {link.text}
              </Link>
            ))}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={footerStyles.sectionTitle}>
              Resources
            </Typography>
            {links.resources.map((link) => (
              <Link
                key={link.text}
                href={link.href}
                sx={footerStyles.link}
                color="inherit"
              >
                {link.text}
              </Link>
            ))}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={footerStyles.sectionTitle}>
              Connect With Us
            </Typography>
            <Box sx={footerStyles.socialIcons}>
              <IconButton
                color="inherit"
                href="#"
                aria-label="GitHub"
                sx={footerStyles.iconButton}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="#"
                aria-label="LinkedIn"
                sx={footerStyles.iconButton}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="#"
                aria-label="Twitter"
                sx={footerStyles.iconButton}
              >
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={footerStyles.copyright}>
          © {currentYear} AI Recipe Generator. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 