import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard';
import { AlertProvider } from '../components/shared/AlertContext';
import { CommunicationProvider } from '../components/shared/CommunicationContext';
import { LanguageProvider } from '../components/LanguageContext';

// Mock the context providers
const MockProviders = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AlertProvider>
      <CommunicationProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </CommunicationProvider>
    </AlertProvider>
  </BrowserRouter>
);

// Mock recharts for testing
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  PieChart: ({ children }: any) => <div data-testid="pie-chart">{children}</div>,
  Pie: () => <div data-testid="pie" />,
  Cell: () => <div data-testid="cell" />,
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => JSON.stringify({ name: 'Test User', institution: 'Test Institution' })),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });

  it('renders dashboard with user information', () => {
    render(
      <MockProviders>
        <Dashboard />
      </MockProviders>
    );

    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('displays emergency preparedness statistics', () => {
    render(
      <MockProviders>
        <Dashboard />
      </MockProviders>
    );

    expect(screen.getByText(/emergency preparedness/i)).toBeInTheDocument();
    expect(screen.getByText(/training progress/i)).toBeInTheDocument();
  });

  it('shows recent incidents section', () => {
    render(
      <MockProviders>
        <Dashboard />
      </MockProviders>
    );

    expect(screen.getByText(/recent incidents/i)).toBeInTheDocument();
  });

  it('displays training modules overview', () => {
    render(
      <MockProviders>
        <Dashboard />
      </MockProviders>
    );

    expect(screen.getByText(/training modules/i)).toBeInTheDocument();
    expect(screen.getByText(/earthquake safety/i)).toBeInTheDocument();
    expect(screen.getByText(/fire safety/i)).toBeInTheDocument();
  });

  it('renders charts for data visualization', () => {
    render(
      <MockProviders>
        <Dashboard />
      </MockProviders>
    );

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('shows quick action buttons', () => {
    render(
      <MockProviders>
        <Dashboard />
      </MockProviders>
    );

    expect(screen.getByText(/quick actions/i)).toBeInTheDocument();
    expect(screen.getByText(/emergency drill/i)).toBeInTheDocument();
    expect(screen.getByText(/view alerts/i)).toBeInTheDocument();
  });
});