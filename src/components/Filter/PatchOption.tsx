import { useContext, useEffect, useState } from 'react';
import { ConfigurationContext } from '../../contexts/ConfigurationContext.tsx';
import TextCheckboxButton from '../GenericUI/TextCheckboxButton.tsx';

type PatchOptionProps = {
  patchName: string;
};

const PatchOption = ({ patchName }: PatchOptionProps) => {
  const { patches, onSelectPatch } = useContext(ConfigurationContext);
  const [isSelected, setIsSelected] = useState(patches.has(patchName));

  useEffect(() => {
    setIsSelected(patches.has(patchName));
  }, [patchName, patches]);

  return (
    <TextCheckboxButton
      buttonText={patchName}
      buttonValue={patchName}
      isSelected={isSelected}
      onClick={(pName, selected) => onSelectPatch([pName], selected)}
    />
  );
};

export default PatchOption;
