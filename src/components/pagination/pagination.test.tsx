import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Pagination } from './pagination';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import styles from './styles.module.css';

describe('Pagination Component', () => {
  const setCurrentPageMock = vi.fn();

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders the Previous and Next buttons', () => {
    render(<Pagination currentPage={1} totalPages={5} setCurrentPage={setCurrentPageMock} />);
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('disables the Previous button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} setCurrentPage={setCurrentPageMock} />);
    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  it('disables the Next button on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} setCurrentPage={setCurrentPageMock} />);
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('calls setCurrentPage with the correct value when Next is clicked', () => {
    render(<Pagination currentPage={1} totalPages={5} setCurrentPage={setCurrentPageMock} />);
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(setCurrentPageMock).toHaveBeenCalledWith(expect.any(Function));
    expect(setCurrentPageMock).toHaveBeenCalledTimes(1);
  });

  it('calls setCurrentPage with the correct value when Previous is clicked', () => {
    render(<Pagination currentPage={2} totalPages={5} setCurrentPage={setCurrentPageMock} />);
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);
    expect(setCurrentPageMock).toHaveBeenCalledWith(expect.any(Function));
    expect(setCurrentPageMock).toHaveBeenCalledTimes(1);
  });

  it('renders correct page numbers for total pages <= 5', () => {
    render(<Pagination currentPage={1} totalPages={5} setCurrentPage={setCurrentPageMock} />);
    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons).toHaveLength(7); // Previous + Next + 5 pages
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders correct page numbers with ellipsis for total pages > 5', () => {
    render(<Pagination currentPage={3} totalPages={10} setCurrentPage={setCurrentPageMock} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getAllByText('...')).toHaveLength(2); // Two ellipses
  });

  it('renders active button style for the current page', () => {
    render(<Pagination currentPage={3} totalPages={10} setCurrentPage={setCurrentPageMock} />);
    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toHaveClass(styles.btnActive);
  });

  it('calls setCurrentPage with the correct page number when a page button is clicked', () => {
    render(<Pagination currentPage={3} totalPages={10} setCurrentPage={setCurrentPageMock} />);
    const pageButton = screen.getByText('1');
    fireEvent.click(pageButton);
    expect(setCurrentPageMock).toHaveBeenCalledWith(1);
  });
});
