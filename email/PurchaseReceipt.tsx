import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
} from '@react-email/components';
import OrderInformation from './OrderInformation';

PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: 'Test Product 1',
    description: 'This is Test Product 1.',
    imagePath:
      '/products/964b1e6a-bacf-447f-a4e5-299506cb1c1d-eniko-kis-KsLPTsYaqIQ-unsplash.jpg',
  },
  order: {
    id: '669550',
    createdAt: new Date(),
    pricePaidInCents: 10000,
  },
};

export default function PurchaseReceiptEmail({
  product,
  order,
  downloadVerificationId,
}: PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>Download {product.name} and view receipt</Preview>
      <Tailwind>
        <Head />
        <Body className='font-sans bg-white'>
          <Container className='max-w-xl'>
            <Heading>Purchase Receipt</Heading>
            <OrderInformation
              order={order}
              product={product}
              downloadVerificationId={downloadVerificationId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
