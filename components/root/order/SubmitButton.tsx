'use client';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' className='w-full' size='lg' disabled={pending}>
      {pending ? 'Sending...' : 'Send'}
    </Button>
  );
};

export default SubmitButton;
