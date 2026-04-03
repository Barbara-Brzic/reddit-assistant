import { useEffect, useState } from 'react';

export interface IFormData {
  endpoint: string;
  apiKey: string;
}

export const useFormData = () => {
  const [formData, setFormData] = useState<IFormData>({
    endpoint: '',
    apiKey: '',
  });

  useEffect(() => {
    // Load initial data
    chrome.storage.local.get('formData', (result: { formData?: IFormData }) => {
      if (result.formData) {
        setFormData(result.formData);
      }
    });

    // Listen for storage changes
    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string
    ) => {
      if (areaName === 'local' && changes.formData) {
        const newFormData = changes.formData.newValue as IFormData;
        if (newFormData) {
          setFormData(newFormData);
        }
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  return { formData, setFormData };
};
