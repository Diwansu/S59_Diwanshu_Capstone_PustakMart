import React from 'react';
import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="/">
              PustakMart
            </Link>{' '}
            {new Date().getFullYear()}
          </Typography>

          <Box sx={{ mt: { xs: 2, sm: 0 } }}>
            <IconButton
              aria-label="github"
              color="inherit"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub />
            </IconButton>
            <IconButton
              aria-label="linkedin"
              color="inherit"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              aria-label="twitter"
              color="inherit"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
