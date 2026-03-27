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
              text: `You are a Reddit discussion analysis assistant. Analyze the post and its comments to answer the user's query.
                    
                    **User Query:**
                    ${searchQuery}
                    
                    **Reddit Post:**
                    \`\`\`json
                    ${JSON.stringify(post, null, 2)}
                    \`\`\`
                    
                    **Comments (${comments.length} total):**
                    \`\`\`json
                    ${JSON.stringify(comments, null, 2)}
                    \`\`\`
                    
                    **Task:**
                    1. Analyze the post content and context
                    2. Review all comments for relevant insights
                    3. Identify key themes, opinions, and patterns
                    4. Consider comment scores to gauge community sentiment
                    5. Provide a comprehensive answer to the user's query
                    
                    **Response Guidelines:**
                    - Be concise and direct
                    - Use markdown formatting for readability
                    - Cite specific comments when relevant (mention author)
                    - Summarize key points with bullet points when appropriate
                    - **Primary focus**: Answer based on the post and comments
                    - **Fallback**: If the comments don't contain enough information, use your general knowledge to answer the query
                    - Clearly indicate when you're using external knowledge vs. comment-based insights

                    Provide your analysis.`,
            },
          ],
        },
      ],
    };
  };

  const resetGeminiResponse = () => setGeminiResponse(null);

  return { geminiResponse, loading, searchComments, resetGeminiResponse };
}
