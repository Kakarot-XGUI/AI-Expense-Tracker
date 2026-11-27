'use client';

import { useEffect, useRef, useState } from 'react';
import addExpenseRecord from '@/app/actions/addExpenseRecord';
import { suggestCategory } from '@/app/actions/suggestCategory';

export default function AddNewRecord() {
  const formRef = useRef<HTMLFormElement>(null);
  const [amount, setAmount] = useState(50);
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [isLoading, setIsLoading] = useState(false);
  const [isCategorizingAI, setIsCategorizingAI] = useState(false);

  useEffect(() => {
    setDate(new Date().toISOString().slice(0, 10));
  }, []);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setAlertMessage(null);

    formData.set('amount', amount.toString());
    formData.set('category', category);
    formData.set('date', date);

    try {
      const { error } = await addExpenseRecord(formData);
      if (error) {
        setAlertMessage(error);
        setAlertType('error');
        return;
      }

      setAlertMessage('Expense added successfully');
      setAlertType('success');
      formRef.current?.reset();
      setAmount(50);
      setCategory('');
      setDescription('');
      setDate(new Date().toISOString().slice(0, 10));
    } catch (error) {
      console.error('Failed to submit expense:', error);
      setAlertMessage('Could not save this expense. Please try again.');
      setAlertType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAISuggestCategory = async () => {
    if (!description.trim()) {
      setAlertMessage('Enter a description before asking Gemini.');
      setAlertType('error');
      return;
    }

    setIsCategorizingAI(true);
    setAlertMessage(null);
    try {
      const result = await suggestCategory(description);
      if (result.error) {
        setAlertMessage(result.error);
        setAlertType('error');
      } else {
        setCategory(result.category);
        setAlertMessage(`Gemini suggested ${result.category}`);
        setAlertType('success');
      }
    } catch (error) {
      console.error('Failed to suggest an expense category:', error);
      setAlertMessage('Gemini could not suggest a category right now.');
      setAlertType('error');
    } finally {
      setIsCategorizingAI(false);
    }
  };

  return (
    <section className='panel form-panel' id='add-expense'>
      <div className='panel-header'>
        <div className='panel-heading'>
          <span className='panel-icon' aria-hidden='true'>
            <svg
              width='17'
              height='17'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.8'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M12 5v14M5 12h14' />
            </svg>
          </span>
          <div>
            <h2 className='panel-title'>Add New Expense</h2>
            <p className='panel-subtitle'>Track your spending with AI assistance</p>
          </div>
        </div>
      </div>

      <form
        ref={formRef}
        className='expense-form'
        action={handleSubmit}
      >
        <div className='expense-form-row'>
          <label className='form-field' htmlFor='expense-description'>
            <span className='form-label'>
              <span aria-hidden='true'>▣</span> Expense Description
            </span>
            <span className='form-control-wrap'>
              <input
                className='form-control has-action'
                id='expense-description'
                name='text'
                placeholder='e.g. groceries'
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
              <button
                className='form-action'
                type='button'
                onClick={handleAISuggestCategory}
                disabled={isCategorizingAI || !description.trim()}
                title='Suggest a category with Gemini'
                aria-label='Suggest a category with Gemini'
              >
                {isCategorizingAI ? '…' : '✦'}
              </button>
            </span>
          </label>

          <label className='form-field' htmlFor='expense-date'>
            <span className='form-label'>
              <span aria-hidden='true'>▦</span> Expense Date
            </span>
            <input
              className='form-control'
              type='date'
              id='expense-date'
              name='date'
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </label>
        </div>

        <div className='expense-form-row'>
          <label className='form-field' htmlFor='expense-category'>
            <span className='form-label'>
              <span aria-hidden='true'>◆</span> Category
            </span>
            <select
              className='form-select'
              id='expense-category'
              name='category'
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            >
              <option value='' disabled>
                Select category...
              </option>
              <option value='Food'>🍴 Food &amp; Dining</option>
              <option value='Shopping'>🛍 Shopping</option>
              <option value='Transportation'>🚗 Travel</option>
              <option value='Bills'>💡 Bills</option>
              <option value='Healthcare'>✚ Healthcare</option>
              <option value='Entertainment'>♫ Entertainment</option>
              <option value='Other'>◈ Others</option>
            </select>
          </label>

          <label className='form-field' htmlFor='expense-amount'>
            <span className='form-label'>
              <span aria-hidden='true'>₹</span> Amount
            </span>
            <span className='form-control-wrap'>
              <span className='currency-input' aria-hidden='true'>
                ₹
              </span>
              <input
                className='form-control with-currency'
                type='number'
                id='expense-amount'
                name='amount'
                min='0.01'
                max='1000000'
                step='0.01'
                value={amount}
                onChange={(event) =>
                  setAmount(parseFloat(event.target.value) || 0)
                }
                required
              />
            </span>
          </label>
        </div>

        <button className='form-submit' type='submit' disabled={isLoading}>
          <span aria-hidden='true'>{isLoading ? '◌' : '➤'}</span>
          {isLoading ? 'Saving expense...' : 'Add Expense'}
        </button>

        {alertMessage && (
          <p className={`form-alert ${alertType}`} role='status' aria-live='polite'>
            {alertMessage}
          </p>
        )}
      </form>
    </section>
  );
}
