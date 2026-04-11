import { useMutation } from '@tanstack/react-query';
import { mutateProfileEdit } from '@/domains/auth/api';

export const useProfileEditMutate = () => {
  return useMutation({
    mutationFn: mutateProfileEdit,
  });
};
