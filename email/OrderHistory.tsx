import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
} from '@react-email/components';
import OrderInformation from './OrderInformation';

OrderHistory.PreviewProps = {
  orders: [
    {
      id: '669550',
      createdAt: new Date(),
      pricePaidInCents: 10000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: 'Test Product 1',
        description: 'This is Test Product 1.',
        imagePath:
          '/products/964b1e6a-bacf-447f-a4e5-299506cb1c1d-eniko-kis-KsLPTsYaqIQ-unsplash.jpg',
      },
    },
    {
      id: '615784',
      createdAt: new Date(),
      pricePaidInCents: 50000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: 'Test Product 2',
        description: 'This is Test Product 2.',
        imagePath:
          '/products/efd6927b-536c-4a05-bba7-54aa52636097-norbert-levajsics-dUx0gwLbhzs-unsplash.jpg',
      },
    },
  ],
} satisfies OrderHistoryProps;

export default function OrderHistory({ orders }: OrderHistoryProps) {
  return (
    <Html>
      <Preview>Order History & Download</Preview>
      <Tailwind>
        <Head />
        <Body className='font-sans bg-white'>
          <Container className='max-w-xl'>
            <Heading>Order History</Heading>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                <OrderInformation
                  order={order}
                  product={order.product}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
