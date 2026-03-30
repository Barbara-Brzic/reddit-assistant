const DEFAULT_LIMIT = 50;

export default function useQueryLimit() {
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);

  useEffect(() => {
    const loadQueryLimit = async () => {
      const storedLimit: { limit?: number } =
        await chrome.storage.local.get('limit');
      console.log('Stored Limit:', storedLimit);
      if (storedLimit?.limit) {
        setLimit(storedLimit.limit);
      } else {
        setLimit(DEFAULT_LIMIT);
      }
    };

    loadQueryLimit();
  }, []);

  useEffect(() => {
    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string
    ) => {
      if (areaName === 'local' && changes.limit) {
        const newLimit = (changes.limit.newValue as number) ?? DEFAULT_LIMIT;
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
  }, []);

  const updateLimit = (newLimit: number) => {
    setLimit(newLimit);
    chrome.storage.local.set({ limit: newLimit });
  };

  return { limit, updateLimit };
}
