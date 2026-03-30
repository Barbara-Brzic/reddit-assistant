const DEFAULT_LIMIT = 50;

export default function useQueryLimit(type: 'posts' | 'comments') {
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
  const storageKey = type === 'posts' ? 'postsLimit' : 'commentsLimit';

  useEffect(() => {
    const loadQueryLimit = async () => {
      const storedLimit: { [key: string]: number } =
        await chrome.storage.local.get(storageKey);
      if (storedLimit?.[storageKey]) {
        setLimit(storedLimit[storageKey]);
      } else {
        setLimit(DEFAULT_LIMIT);
      }
    };

    loadQueryLimit();
  }, [storageKey]);

  useEffect(() => {
    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string
    ) => {
      if (areaName === 'local' && changes[storageKey]) {
        const newLimit =
          (changes[storageKey].newValue as number) ?? DEFAULT_LIMIT;
        if (newLimit <= 1) {
          setLimit(10);
          return;
        }
        setLimit(newLimit);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, [storageKey]);

  const updateLimit = (newLimit: number) => {
    setLimit(newLimit);
    chrome.storage.local.set({ [storageKey]: newLimit });
  };

  return { limit, updateLimit };
}
