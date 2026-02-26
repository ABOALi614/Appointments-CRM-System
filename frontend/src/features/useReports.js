import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client.js';

export const useReports = () =>
  useQuery({
    queryKey: ['overview-report'],
    queryFn: async () => {
      const { data } = await apiClient.get('/reports/overview');
      return data;
    }
  });
