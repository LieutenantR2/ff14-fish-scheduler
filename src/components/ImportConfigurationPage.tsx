/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import LaunchIcon from '@mui/icons-material/Launch';
import TextButton from './GenericUI/TextButton.tsx';
import { useCallback, useContext, useState } from 'react';
import { parseCarbunclePlushySettings } from './Import/parser.ts';
import { ConfigurationContext } from '../contexts/ConfigurationContext.tsx';

const Styles = css({
  width: '100%',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',

  '.text-button': {
    margin: '8px 0',
    alignSelf: 'start',
  },
});

const ImportConfigurationPage = () => {
  const { loadCarbunclePlushySettings } = useContext(ConfigurationContext);

  const [content, setContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const handleImport = useCallback(() => {
    if (!content) {
      setMessage('Export the settings from Carbuncle Plushy and paste in the box.');
      return;
    }

    setIsProcessing(true);
    const importedSettings = parseCarbunclePlushySettings(content);
    if (importedSettings !== null) {
      loadCarbunclePlushySettings(importedSettings);
      setMessage('Import complete!');
      setContent('');
    } else {
      setMessage('Failed to import from settings.');
    }
    setIsProcessing(false);
  }, [content, loadCarbunclePlushySettings]);

  return (
    <div css={Styles}>
      <h1 className="heading">
        <a href="https://ff14fish.carbuncleplushy.com/" target="_blank">
          <span>Carbuncle Plushy Fish Tracker</span>
          <LaunchIcon fontSize="medium" className="icon" />
        </a>
      </h1>
      <textarea onChange={(e) => setContent(e.target.value)} disabled={isProcessing}></textarea>
      <TextButton
        buttonText="Import"
        onSubmit={handleImport}
        isDisabled={isProcessing || !content}
      />
      {isProcessing ? 'Processing...' : ''}
      {!!message && <span>{message}</span>}
    </div>
  );
};

export default ImportConfigurationPage;
