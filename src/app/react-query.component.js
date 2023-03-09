import PropTypes from 'prop-types';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

const queryClientOptions = {
  defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: false } },
};

const queryClient = new QueryClient(queryClientOptions);
export const ReactQuery = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactQuery.propTypes = {
  children: PropTypes.node,
};
