'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SubmitButton from '@/components/root/order/SubmitButton';
import { useFormState } from 'react-dom';
import { emailOrderHistory } from '@/email/action';

const MyOrdersPage = () => {
  const [data, action] = useFormState(emailOrderHistory, {});
  return (
    <form className='max-w-2xl mx-auto' action={action}>
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>
            Enter your email and we will email you order history and download
            links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <Label>Email</Label>
            <Input
              type='email'
              name='email'
              id='email'
              placeholder='johndoe@gmail.com'
              required
            />
            {data.error && (
              <div className='text-destructive '>{data.error}</div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          {data.message ? (
            <p className='text-green-600'>{data.message}</p>
          ) : (
            <SubmitButton />
          )}
        </CardFooter>
      </Card>
    </form>
  );
};

export default MyOrdersPage;
