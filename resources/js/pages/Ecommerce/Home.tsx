import BannerAndSlider from '@/components/Ecommerce/Homepage/BannerAndSlider';
import BestSeller from '@/components/Ecommerce/Homepage/BestSeller';
import Blog from '@/components/Ecommerce/Homepage/Blog';
import Brand from '@/components/Ecommerce/Homepage/Brand';
import SpecialOffer from '@/components/Ecommerce/Homepage/SpecialOffer';
import EcomLayout from '@/layouts/ecom-layout';

export default function Home() {
    return (
        <EcomLayout>
            <BannerAndSlider />
            <BestSeller />
            <SpecialOffer />
            <Brand />
            <Blog />
        </EcomLayout>
    );
}
