import { ArrowBack } from '@mui/icons-material';
import { AppBar, Chip, Container, CssBaseline, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import styles from './Home.module.css';

interface HomeProps {}

export default function Home(props: HomeProps) {
  return (
    <div className={styles.Home}>
      <AppBar>
        <Toolbar>
          <IconButton>
            <ArrowBack />
          </IconButton>

          <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Chip label="test"></Chip>
              <Typography variant="h6">title</Typography>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}
