import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CircleQuestionMark, Eye, EyeOff, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFormData } from '@/entrypoints/hooks/useFormData.ts';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip.tsx';

const formSchema = z.object({
  endpoint: z
    .string()
    .min(1, 'Endpoint is required')
    .refine(
      (value) => {
        try {
          new URL(value);
          return true;
        } catch (e) {
          return false;
        }
      },
      { message: 'Endpoint must be a URL' }
    ),
  apiKey: z
    .string()
    .min(1, 'API key is required')
    .min(8, 'API key must be at least 8 characters'),
});

type FormValues = z.infer<typeof formSchema>;

export default function CredentialForm() {
  const [showApiKey, setShowApiKey] = useState(false);
  const { formData, setFormData } = useFormData();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  useEffect(() => {
    form.reset(formData);
  }, [formData, form]);

  const onSubmit = (data: FormValues) => {
    setFormData(data);
    chrome.storage.local.set({ formData: data }, () =>
      toast.success('API credentials saved')
    );
  };

  return (
    <div className="mx-auto p-6 w-110">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">API Configuration</h2>
        <div className={'flex gap-2'}>
          <p className="text-muted-foreground">Enter Gemini API credentials</p>
          <Tooltip>
            <TooltipTrigger>
              <CircleQuestionMark className="h-4 w-4 text-muted-foreground cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                You will need to obtain an API key from Gemini. You can get one{' '}
                <a
                  href="https://ai.google.dev/gemini-api/docs/get-started"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here.
                </a>
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="endpoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endpoint</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="https://api.example.com"
                    {...field}
                    className={'focus:ring-1 focus:ring-ring'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Key</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showApiKey ? 'text' : 'password'}
                      placeholder="Enter your API key"
                      {...field}
                      className={'pr-10 focus:ring-1 focus:ring-ring'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showApiKey ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer mt-3 button-gradient"
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
