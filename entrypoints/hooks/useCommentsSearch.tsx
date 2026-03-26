import { IComment, IPost } from '@/entrypoints/content/scripts/scrap.ts';
import { useFormData } from '@/entrypoints/hooks/useFormData.ts';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function useCommentsSearch(post: IPost, comments: IComment[]) {
  const [geminiResponse, setGeminiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { formData } = useFormData();

  const searchComments = async (searchQuery: string) => {
    setLoading(true);
    setGeminiResponse(null);

    const url = `${formData.endpoint}?key=${formData.apiKey}`;
    const payload = createGeminiPayload(searchQuery);

    try {
      const response = await axios.post(url, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      setGeminiResponse(
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
          null
      );
    } catch (error) {
      toast.error('Failed to fetch data from Gemini');
      console.error('Error fetching data:', error);
      setGeminiResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const createGeminiPayload = (searchQuery: string) => {
    return {
      contents: [
        {
          parts: [
            {
              text: `
          This is the prompt: ${searchQuery}
          This is the dataset of comments in js array: '''${JSON.stringify(comments)}'''.
          This is the post dataset: '''${JSON.stringify(post)}'''
          
          Now based on the post data, the comments data, and the user prompt, generate a response that directly answers the prompt.
          `,
            },
          ],
        },
      ],
    };
  };

  return { searchComments, geminiResponse, loading };
}
