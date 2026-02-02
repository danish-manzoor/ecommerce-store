import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { usePage } from '@inertiajs/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function () {
    const { brands } = usePage().props as any;
    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4">
                <h2 className="mb-8 text-center text-2xl font-bold">
                    Our Brands
                </h2>

                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={5}
                    // navigation
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    className="brand-slider"
                >
                    <div className="swiper-wrapper items-center">
                        {brands.map((brand: any) => {
                            return (
                                <SwiperSlide key={brand.id}>
                                    <div className="swiper-slide p-4 text-center">
                                        <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50 p-6">
                                            <img
                                                src={brand.image}
                                                alt={brand.name}
                                                className="max-h-16"
                                            />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </div>
                    <div className="swiper-pagination"></div>
                </Swiper>
            </div>
        </div>
    );
}
