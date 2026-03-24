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
    chrome.storage.local.get('formData', (result) => {
      if (result.formData) {
        // @ts-ignore
        setFormData(result.formData);
      }
    });
  }, []);

  return { formData, setFormData };
};
