export function Pagination({
  hasPreviousPage,
  hasNextPage,
  onPreviousPageClick,
  onNextPageClick,
}) {
  return (
    <>
      <button
        className={'ui primary button ' + (!hasPreviousPage ? 'disabled' : '')}
        onClick={onPreviousPageClick}
      >
        Previous Page
      </button>

      <button
        className={'ui primary button ' + (!hasNextPage ? 'disabled' : '')}
        onClick={onNextPageClick}
      >
        Next Page
      </button>
    </>
  );
}
