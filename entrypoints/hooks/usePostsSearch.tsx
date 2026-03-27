import { useFormData } from '@/entrypoints/hooks/useFormData.ts';
import {
  extractJsonListFromMarkdown,
  IPost,
} from '@/entrypoints/content/scripts/scrap.ts';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function usePostsSearch() {
  const [geminiResponse, setGeminiResponse] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const { formData } = useFormData();

  const searchPosts = async (searchQuery: string, posts: IPost[]) => {
    setLoading(true);
    setGeminiResponse([]);

    const url = `${formData.endpoint}?key=${formData.apiKey}`;
    const payload = createGeminiPayload(searchQuery, posts);

    try {
      const response = await axios.post(url, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      setGeminiResponse(extractGeminiResponse(response));
    } catch (error) {
      toast.error('Failed to fetch data from Gemini. Check your API key');
      console.error('Error fetching data:', error);
      setGeminiResponse([]);
    } finally {
      setLoading(false);
    }
  };

  const createGeminiPayload = (searchQuery: string, posts: IPost[]) => {
    return {
      contents: [
        {
          parts: [
            {
              text: `
          This is the prompt: ${searchQuery}
          This is the dataset of posts in js array: '''${JSON.stringify(posts)}'''.
          
          Now based on this dataset, return the posts that match the prompt.
          Use description, title, tag, score and comments fields of the post for matching.
          Give me the list of posts in js array in the same format as the dataset.
          Don't provide any extra text even if you failed to find any post, just return an empty array. 
          `,
            },
          ],
        },
      ],
    };
  };

  const extractGeminiResponse = (response: any) => {
    const data =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || [];
    return extractJsonListFromMarkdown(data);
  };

  return { searchPosts, geminiResponse, loading };
}
