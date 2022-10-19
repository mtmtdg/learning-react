import { Button, Chip, Modal, Switch } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import PdfViewer from './components/PdfViewer/PdfViewer';

import './App.css';

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
      <div>last time shown page: {lastPlayedTo.toFixed(0)}</div>

      <div>{finished ? <Chip label="finished" color="success" /> : <Chip label="non-finished" />}</div>

      <div>
        <Switch checked={config.resume} onChange={handleChange} name="resume" />
        <label>resume</label>
      </div>

      <Button variant="contained" onClick={handleOpen}>
        View
      </Button>

      <Modal open={open} onClose={handleClose}>
        <PdfViewer
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
