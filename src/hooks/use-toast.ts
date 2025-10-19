import { toast } from 'sonner';

export function useToast() {
  return {
    toast: (message: string, options?: any) => {
      if (options?.type === 'success') {
        toast.success(message);
      } else if (options?.type === 'error') {
        toast.error(message);
      } else if (options?.type === 'warning') {
        toast.warning(message);
      } else if (options?.type === 'info') {
        toast.info(message);
      } else {
        toast(message);
      }
    },
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    warning: (message: string) => toast.warning(message),
    info: (message: string) => toast.info(message),
  };
}
