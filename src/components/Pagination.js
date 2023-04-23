import React from 'react';
//import './pagination.css'; 

const Pagination = ({

  pageIndex,
  pageCount,
  canPreviousPage,
  previousPage,
  canNextPage,
  nextPage,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0' }}>
      <button style={{ padding: '0.5rem 1rem', marginRight: '1rem', backgroundColor: canPreviousPage ? '#007bff' : '#ccc', color: '#fff', border: 'none', borderRadius: '0.25rem', cursor: canPreviousPage ? 'pointer' : 'not-allowed' }} onClick={() => previousPage()} disabled={!canPreviousPage}>
        {'<'}
      </button>{' '}
      <span style={{ fontWeight: 'bold' }}>
        Page{' '}
        <span style={{ color: '#007bff' }}>{pageIndex + 1}</span>{' '}
        {' '}
        <span style={{ color: '#007bff' }}>{pageCount}</span>
      </span>
      <button style={{ padding: '0.5rem 1rem', marginLeft: '1rem', backgroundColor: canNextPage ? '#007bff' : '#ccc', color: '#fff', border: 'none', borderRadius: '0.25rem', cursor: canNextPage ? 'pointer' : 'not-allowed' }} onClick={() => nextPage()} disabled={!canNextPage}>
        {'>'}
      </button>{' '}
    </div>
  );
};

export default Pagination;