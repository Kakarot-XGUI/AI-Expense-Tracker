'use server';

import { categorizeExpense, isAIConfigured } from '@/lib/ai';

export async function suggestCategory(
  description: string
): Promise<{ category: string; error?: string }> {
  try {
    if (!description || description.trim().length < 2) {
      return {
        category: 'Other',
        error: 'Description too short for AI analysis',
      };
    }

    if (!isAIConfigured()) {
      return {
        category: 'Other',
        error: 'Add GEMINI_API_KEY to .env to enable AI suggestions',
      };
    }

    const category = await categorizeExpense(description.trim());
    return { category };
  } catch (error) {
    console.error('❌ Error in suggestCategory server action:', error);
    return {
      category: 'Other',
      error: 'Unable to suggest category at this time',
    };
  }
}
