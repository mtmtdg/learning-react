/* non free library pdftron
   https://www.pdftron.com/api/web/
   https://www.pdftron.com/api/web/global.html#WebViewerOptions
 */
import WebViewer, { Core, WebViewerInstance } from '@pdftron/webviewer';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Observable, Observer, take, throttleTime } from 'rxjs';

import styles from './Viewer.module.css';

interface ViewerProps {
  lastPlayedTo: number;
  setLastPlayedTo: Dispatch<SetStateAction<number>>;
  setFinished: Dispatch<SetStateAction<boolean>>;
  config: { resume: boolean };
}

export default function Viewer(props: ViewerProps) {
  const { lastPlayedTo, setLastPlayedTo, setFinished, config } = props;

  const viewerElementRef = useRef(null);
  const viewerInstanceRef = useRef<WebViewerInstance>();

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(100);

  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: 'page4.pptx',
        disabledElements: ['header'],
        isReadOnly: true,
        enableAnnotations: false,
        forceClientSideInit: true,
        disableLogs: true,
      },
      viewerElementRef.current!
    ).then(instance => {
      viewerInstanceRef.current = instance;

      const { documentViewer, annotationManager, Tools } = instance.Core;
      const UI = instance.UI;

      documentViewer.enableReadOnlyMode();
      annotationManager.enableReadOnlyMode();

      // only show one page
      UI.setLayoutMode(UI.LayoutMode.Single);

      // disable pan and select button
      UI.disableTools([Tools.ToolNames.PAN, Tools.ToolNames.EDIT, Tools.ToolNames.MARQUEE]);

      // disable more buttons like [search, comments]
      UI.disableFeatures([
        UI.Feature.Search, // search
        UI.Feature.NotesPanel, // comments
        UI.Feature.PageNavigation, // mouse scroll
        UI.Feature.Ribbons, // [View Annotate Shapes Insert EditText FillAndSign Forms]
        UI.Feature.TextSelection,
        UI.Feature.Download,
        UI.Feature.Print,
        UI.Feature.MultiTab,
        UI.Feature.MultiViewerMode,
      ]);

      // hide buttons on header or hide header itself
      UI.disableElements(['menuButton', 'leftPanelButton', 'viewControlsButton', 'zoomOverlayButton']);
      UI.disableElements(['header']);

      documentViewerEventAsObservable(documentViewer, 'finishedRendering')
        .pipe(take(2), throttleTime(500, undefined, { leading: false, trailing: true }))
        .subscribe(() => {
          // [setCurrentPage, getPageCount] not working soon after documentLoaded but after finishedRendering
          // finishedRendering emits every page, so just take first 2
          // with these pdf has only one page, throttleTime send event after 500ms for a result
          config.resume && documentViewer.setCurrentPage(lastPlayedTo, false);
          setTotalPage(documentViewer.getPageCount());
        });

      documentViewer.addEventListener('pageNumberUpdated', (page: number) => {
        setPage(page);
      });
    });
  }, []);

  useEffect(() => {
    return () => {
      setLastPlayedTo(page);
    };
  }, [page]);

  useEffect(() => {
    page === totalPage && setFinished(true);
  }, [page, totalPage]);

  return (
    <>
      <div className={styles.webviewer} ref={viewerElementRef}></div>
      {/* <button onClick={prevPage}>prev</button>
      <button onClick={nextPage}>next</button> */}
    </>
  );
}

function documentViewerEventAsObservable(documentViewer: Core.DocumentViewer, eventName: string): Observable<void> {
  return new Observable((observer: Observer<void>) => {
    documentViewer.addEventListener(eventName, () => {
      observer.next();
    });
  });
}
