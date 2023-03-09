import PropTypes from 'prop-types';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

const queryClient = new QueryClient();
// {defaultOptions: {queries: {retry: false, staleTime: Infinity, refetchOnMount: false}}}
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
