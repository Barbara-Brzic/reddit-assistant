import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Save } from 'lucide-react';
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
        <p className="text-muted-foreground">Enter API credentials</p>
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
                      className="pr-10"
                      {...field}
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
            variant={'default'}
            type="submit"
            className="w-full cursor-pointer mt-3"
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
