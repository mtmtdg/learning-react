import { Button, Chip, Modal, Switch } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';

import './App.css';

function App() {
  const [lastPlayedTo, setLastPlayedTo] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);

  const [config, setConfig] = useState({
    progressControl: true,
    resume: true,
  });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfig({
      ...config,
      [event.target.name]: event.target.checked,
    });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="App">
      <div>last time played to: {lastPlayedTo.toFixed(0)} seconds</div>

      <div>{finished ? <Chip label="finished" color="success" /> : <Chip label="non-finished" />}</div>

      <div>
        <Switch checked={config.progressControl} onChange={handleChange} name="progressControl" />
        <label>show seek bar</label>
      </div>

      <div>
        <Switch checked={config.resume} onChange={handleChange} name="resume" />
        <label>resume from last time</label>
      </div>

      <Button variant="contained" onClick={handleOpen}>
        play
      </Button>

      <Modal open={open} onClose={handleClose}>
        <VideoPlayer
          lastPlayedTo={lastPlayedTo}
          setLastPlayedTo={setLastPlayedTo}
          setFinished={setFinished}
          config={config}
        />
      </Modal>
    </div>
  );
}

export default App;
