'use client';

import { useEffect, useState } from 'react';
import { generateInsightAnswer } from '@/app/actions/generateInsightAnswer';
import { getAIInsights } from '@/app/actions/getAIInsights';

interface InsightAnswer {
  insightId: string;
  answer: string;
  isLoading: boolean;
}

const insightIcons: Record<string, string> = {
  warning: '⚠️',
  info: '✦',
  success: '💎',
  tip: '💡',
};

export default function AIInsights() {
  const [insights, setInsights] = useState<
    Awaited<ReturnType<typeof getAIInsights>>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [answers, setAnswers] = useState<InsightAnswer[]>([]);
  const [error, setError] = useState<string | null>(null);

  const refreshInsights = async () => {
    setIsLoading(true);
    setError(null);
    try {
      setInsights(await getAIInsights());
      setLastUpdated(new Date());
    } catch (caughtError) {
      console.error('Failed to load AI insights:', caughtError);
      setError('Insights could not be loaded. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refreshInsights();
  }, []);

  const handleInsightAction = async (
    insightId: string,
    title: string,
    action: string
  ) => {
    const existing = answers.find((answer) => answer.insightId === insightId);
    if (existing) {
      setAnswers((current) =>
        current.filter((answer) => answer.insightId !== insightId)
      );
      return;
    }

    setAnswers((current) => [
      ...current,
      { insightId, answer: '', isLoading: true },
    ]);

    try {
      const answer = await generateInsightAnswer(`${title}: ${action}`);
      setAnswers((current) =>
        current.map((item) =>
          item.insightId === insightId
            ? { ...item, answer, isLoading: false }
            : item
        )
      );
    } catch (caughtError) {
      console.error('Failed to generate an insight answer:', caughtError);
      setAnswers((current) =>
        current.map((item) =>
          item.insightId === insightId
            ? {
                ...item,
                answer: 'Could not generate an answer right now.',
                isLoading: false,
              }
            : item
        )
      );
    }
  };

  const minutesSinceUpdate = lastUpdated
    ? Math.max(0, Math.floor((Date.now() - lastUpdated.getTime()) / 60000))
    : 0;
  const updatedLabel =
    minutesSinceUpdate < 1 ? 'Just now' : `${minutesSinceUpdate}m ago`;

  return (
    <section className='panel insights-panel' id='insights'>
      <div className='panel-header'>
        <div className='panel-heading'>
          <span className='panel-icon' aria-hidden='true'>✦</span>
          <div>
            <h2 className='panel-title'>AI Insights</h2>
            <p className='panel-subtitle'>AI financial analysis</p>
          </div>
        </div>
        <div className='insights-header-actions'>
          <span className='updated-indicator'>
            <span aria-hidden='true' />
            {updatedLabel}
          </span>
          <button
            className='insights-refresh'
            type='button'
            onClick={refreshInsights}
            disabled={isLoading}
            aria-label='Refresh insights'
          >
            <span aria-hidden='true'>⟳</span>
          </button>
        </div>
      </div>

      {error ? (
        <p className='chart-error' role='alert'>
          {error}
        </p>
      ) : isLoading ? (
        <div className='insights-grid' aria-label='Loading insights'>
          {[0, 1].map((item) => (
            <div className='insight-skeleton' key={item} />
          ))}
        </div>
      ) : insights.length === 0 ? (
        <p className='history-no-results'>No insights are available yet.</p>
      ) : (
        <div className='insights-grid'>
          {insights.map((insight) => {
            const answer = answers.find(
              (item) => item.insightId === insight.id
            );
            const action = insight.action;

            return (
              <article className='insight-card' key={insight.id}>
                <span className='insight-icon' aria-hidden='true'>
                  {insightIcons[insight.type] ?? '✦'}
                </span>
                <div className='insight-copy'>
                  <h3>{insight.title}</h3>
                  <p>{insight.message}</p>
                  {action && (
                    <button
                      className='insight-action'
                      type='button'
                      onClick={() =>
                        handleInsightAction(
                          insight.id,
                          insight.title,
                          action
                        )
                      }
                      aria-expanded={Boolean(answer)}
                    >
                      {action}
                      <span aria-hidden='true'>
                        {answer ? ' ↑' : ' →'}
                      </span>
                    </button>
                  )}
                  {answer && (
                    <p className='insight-answer' aria-live='polite'>
                      {answer.isLoading ? 'Thinking…' : answer.answer}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className='insights-footer'>
        <span>
          <span aria-hidden='true'>✦ </span>Powered by Gemini analysis
        </span>
        <button
          className='insights-refresh'
          type='button'
          onClick={refreshInsights}
          disabled={isLoading}
        >
          Refresh Insights <span aria-hidden='true'>→</span>
        </button>
      </div>
    </section>
  );
}
