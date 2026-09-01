import { categories, products, reviews, insights, curationSets, faqs } from '@/data/fixtures';
import { createReadOnlyEntity } from '@/lib/localData';
import { Inquiry as InquiryStore } from '@/lib/inquiryStore';

export const Category = createReadOnlyEntity(() => categories);
export const Product = createReadOnlyEntity(() => products, { searchFields: ['name', 'tags'] });
export const Review = createReadOnlyEntity(() => reviews);
export const Insight = createReadOnlyEntity(() => insights);
export const CurationSet = createReadOnlyEntity(() => curationSets);
export const Faq = createReadOnlyEntity(() => faqs);
export const Inquiry = InquiryStore;
