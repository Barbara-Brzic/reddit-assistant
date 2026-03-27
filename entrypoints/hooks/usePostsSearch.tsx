import { useFormData } from '@/entrypoints/hooks/useFormData.ts';
import {
  extractJsonListFromMarkdown,
  IPost,
} from '@/entrypoints/content/scripts/utils.ts';
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
              text: `You are a Reddit post filtering assistant. Filter posts based on the user's search criteria.

                    **User Query:**
                    ${searchQuery}
                    
                    **Posts Dataset:**
                    \`\`\`json
                    ${JSON.stringify(posts, null, 2)}
                    \`\`\`
                    
                    **Task:**
                    1. Analyze each post against the user query
                    2. Match based on: title, description, tag, score, and comment count
                    3. Consider semantic similarity, keywords, and relevance
                    4. Return ONLY relevant posts that match the query
                    
                    **Output Requirements:**
                    - Return a valid JSON array with the same structure as input
                    - If no matches found, return: []
                    - NO explanatory text, markdown code blocks, or additional commentary
                    - Return ONLY the raw JSON array`,
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

  const resetGeminiResponse = () => setGeminiResponse([]);

  return { geminiResponse, loading, searchPosts, resetGeminiResponse };
}
