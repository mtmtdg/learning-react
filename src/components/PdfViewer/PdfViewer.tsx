import { usePdf } from '@mikecousins/react-pdf';
import { Button, Grid } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ArrowForward, ArrowBack, PlayArrow, Stop } from '@mui/icons-material';

interface PdfViewerProps {
  lastPlayedTo: number;
  setLastPlayedTo: Dispatch<SetStateAction<number>>;
  setFinished: Dispatch<SetStateAction<boolean>>;
  config: { resume: boolean };
}

export default function PdfViewer({ lastPlayedTo, setLastPlayedTo, setFinished, config }: PdfViewerProps) {
  const canvasRef = useRef(null);

  const [page, setPage] = useState(1);
  const [autoPlay, setAutoPlay] = useState(false);

  const pageRef = useRef(page);
  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  const { pdfDocument, pdfPage } = usePdf({
    file: 'page4.wps.pdf',
    page,
    canvasRef,
  });

  useEffect(() => {
    config.resume && setPage(lastPlayedTo || 1);
  }, []);

  useEffect(() => {
    return () => {
      setLastPlayedTo(pageRef.current || 1);
    };
  }, []);

  useEffect(() => {
    if (pdfDocument && page === pdfDocument.numPages) {
      setFinished(true);
    }
  }, [page]);

  useEffect(() => {
    if (pdfDocument && page === pdfDocument.numPages) {
      setAutoPlay(false);
    }
  }, [page]);

  useEffect(() => {
    if (autoPlay) {
      console.log('start auto play');
      const subscription = setInterval(() => {
        setPage((oldPage: number) => oldPage + 1);
      }, 2000);
      return () => clearInterval(subscription);
    } else {
      console.log('auto play stopped');
    }
  }, [autoPlay]);

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  return (
    <div style={{ width: '960px' }}>
      {!pdfDocument && <span>Loading...</span>}
      <canvas ref={canvasRef} />
      <Grid container justifyContent="space-between" spacing={1}>
        <Grid item>
          <Button variant="contained" onClick={toggleAutoPlay} startIcon={autoPlay ? <Stop /> : <PlayArrow />}>
            {autoPlay ? 'Stop' : 'AutoPlay'}
          </Button>
        </Grid>

        <Grid item xs />

        <Grid item>
          <Button variant="contained" startIcon={<ArrowBack />} disabled={page === 1} onClick={() => setPage(page - 1)}>
            previous
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            disabled={page === pdfDocument?.numPages}
            onClick={() => setPage(page + 1)}
          >
            next
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
