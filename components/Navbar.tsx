'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import { useExpenseSearch } from '@/contexts/ExpenseSearchContext';

const links = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/about', label: 'About', icon: 'info' },
  { href: '/contact', label: 'Contact', icon: 'mail' },
];

function NavigationIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    home: (
      <>
        <path d='m3 10 9-7 9 7' />
        <path d='M5 9v11h14V9M9 20v-6h6v6' />
      </>
    ),
    info: (
      <>
        <circle cx='12' cy='12' r='9' />
        <path d='M12 11v5m0-8h.01' />
      </>
    ),
    mail: (
      <>
        <rect x='3' y='5' width='18' height='14' rx='2' />
        <path d='m4 7 8 6 8-6' />
      </>
    ),
  };

  return (
    <svg
      aria-hidden='true'
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      {paths[name]}
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { query, setQuery } = useExpenseSearch();

  return (
    <>
      <aside className='dashboard-sidebar'>
        <Link className='sidebar-brand' href='/' aria-label='ExpenseTracker AI home'>
          <span className='brand-mark'>
            <svg
              aria-hidden='true'
              width='30'
              height='30'
              viewBox='0 0 32 32'
              fill='none'
            >
              <path
                d='M5 11.5 24 7c1.7-.4 3.5.8 3.5 2.6v12.7c0 1.4-.9 2.6-2.3 2.9L7.4 29C5.7 29.4 4 28.1 4 26.4V14.3c0-1.3.4-2.3 1-2.8Z'
                fill='white'
                fillOpacity='.96'
              />
              <path d='m5 11.5 4 4.2 18.5-4.4' stroke='#087850' strokeWidth='1.7' />
              <path
                d='M18.5 17.7h9v5.5h-9a2.8 2.8 0 0 1 0-5.5Z'
                fill='#37ce91'
              />
              <circle cx='21' cy='20.5' r='1' fill='white' />
              <path d='m11 5.5 2.5 2.2M21 3l.8 2.5M28 5l-1.8 2' stroke='#baf5d4' strokeWidth='1.5' strokeLinecap='round' />
            </svg>
          </span>
          <span className='sidebar-brand-name'>
            Expense
            <br />
            Tracker AI
          </span>
        </Link>

        <nav className='sidebar-nav' aria-label='Main navigation'>
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`sidebar-link${active ? ' active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <NavigationIcon name={link.icon} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <p className='sidebar-tagline'>
          Track Smart.
          <br />
          Spend Better.
          <span aria-hidden='true'>⌁</span>
        </p>
        <div className='sidebar-decoration' aria-hidden='true' />
      </aside>

      <header className='dashboard-topbar'>
        <label className='topbar-search'>
          <svg
            aria-hidden='true'
            width='15'
            height='15'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          >
            <circle cx='11' cy='11' r='7' />
            <path d='m20 20-4-4' />
          </svg>
          <input
            type='search'
            placeholder='Search expenses...'
            aria-label='Search expenses'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className='topbar-actions'>
          <ThemeToggle />
          <span className='icon-button' aria-label='Notifications'>
            <svg
              aria-hidden='true'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.7'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9' />
              <path d='M10 21h4' />
            </svg>
            <span className='notification-dot'>2</span>
          </span>
          <span className='profile-button' aria-label='Local profile'>
            L
          </span>
        </div>
      </header>
    </>
  );
}
