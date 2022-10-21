import { Button, Chip, Modal, Switch } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import './App.css';
import Viewer from './components/Viewer/Viewer';

function App() {
  const [lastPlayedTo, setLastPlayedTo] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);

  const [config, setConfig] = useState({
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
      <div> 前回ページ数: {lastPlayedTo.toFixed(0)}</div>

      <div>{finished ? <Chip label="修了" color="success" /> : <Chip label="未修了" />}</div>

      <div>
        <Switch checked={config.resume} onChange={handleChange} name="resume" />
        <label>再開</label>
      </div>

      <Button variant="contained" onClick={handleOpen}>
        閲覧
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Viewer
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
