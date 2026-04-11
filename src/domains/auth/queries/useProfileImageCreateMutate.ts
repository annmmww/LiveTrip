import { useMutation } from '@tanstack/react-query';
import { mutateProfileImageCreate } from '@/domains/auth/api';

export const useProfileImageCreateMutate = () => {
  return useMutation({
    mutationFn: mutateProfileImageCreate,
  });
};
