declare interface DashboardCardProps {
  title: string;
  subtitle: string;
  body: string;
}

declare type ErrorsType = Record<string, string[] | undefined> & {
  global?: string;
};

declare type ProductSectionType = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};

declare type ProductCardProps = {
  id: string;
  name: string;
  priceInCents: number;
  description: string;
  imagePath: string;
};

declare type CheckoutFormProps = {
  product: {
    id: string;
    imagePath: string;
    name: string;
    priceInCents: number;
    description: string;
  };
  clientSecret: string;
};

declare interface DownloadFileOptions {
  filePath: string;
  fileName: string;
}

type ReceiptOrder = {
  id: string;
  createdAt: Date;
  pricePaidInCents: number;
};

declare type PurchaseReceiptEmailProps = {
  order: ReceiptOrder;
  product: { name: string; description: string; imagePath: string };
  downloadVerificationId: string;
};

declare type OrderHistoryProps = {
  orders: {
    id: string;
    pricePaidInCents: number;
    createdAt: Date;
    downloadVerificationId: string;
    product: { name: string; description: string; imagePath: string };
  }[];
};

declare type OrderInformationProps = {
  order: ReceiptOrder;
  product: { name: string; description: string; imagePath: string };
  downloadVerificationId: string;
};
