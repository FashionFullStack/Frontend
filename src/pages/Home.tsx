import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Product } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface Store {
  _id: string;
  name: string;
  logo: string;
  rating: number;
  productsCount: number;
}

export default function Home() {
  const navigate = useNavigate();
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [featuredStores, setFeaturedStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API calls
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTrendingProducts([
          {
            _id: "1",
            name: "Traditional Kurta",
            description: "Handcrafted traditional Nepali kurta",
            category: "traditional",
            subCategory: "mens_clothing",
            price: {
              regular: 2500,
              sale: 2000,
              wholesale: 1800
            },
            sizes: ["S", "M", "L", "XL"],
            colors: ["Red", "Blue", "Black"],
            images: ["https://images.unsplash.com/photo-1574791318626-bddf6cc43882"],
            stockQuantity: 50
          },
          // Add more mock products
        ]);

        setFeaturedStores([
          {
            _id: "1",
            name: "Nepal Traditional Store",
            logo: "https://images.unsplash.com/photo-1583922606661-0822ed0bd916",
            rating: 4.8,
            productsCount: 150
          },
          // Add more mock stores
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.section
        className="relative h-[500px] rounded-2xl overflow-hidden mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400" />
        <div className="absolute inset-0 bg-[url('path/to/hero-image.jpg')] bg-cover bg-center mix-blend-overlay" />
        <div className="relative h-full flex flex-col justify-center items-start px-12">
          <motion.h1
            className="text-5xl font-bold text-white mb-4"
            {...fadeInUp}
          >
            Discover Your Style
          </motion.h1>
          <motion.p
            className="text-xl text-white/90 mb-8 max-w-lg"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Experience personalized fashion with our AI-powered virtual try-on and styling assistant.
          </motion.p>
          <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
            <Button
              size="lg"
              onClick={() => navigate("/products")}
              className="bg-white text-blue-600 hover:bg-white/90"
            >
              Shop Now
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Trending Products */}
      <section className="mb-16">
        <motion.h2
          className="text-3xl font-bold mb-8"
          {...fadeInUp}
        >
          Trending Now
        </motion.h2>
        <Carousel className="w-full">
          <CarouselContent>
            {isLoading ? (
              Array(4).fill(0).map((_, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <Card>
                    <CardHeader>
                      <Skeleton className="h-48 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-2/3 mb-2" />
                      <Skeleton className="h-4 w-1/3" />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))
            ) : (
              trendingProducts.map((product) => (
                <CarouselItem key={product._id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => navigate(`/products/${product._id}`)}>
                    <CardHeader>
                      <div className="h-48 relative rounded-t-lg overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        {product.price.sale < product.price.regular && (
                          <Badge className="absolute top-2 right-2 bg-red-500">
                            Sale
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-blue-600">
                            Rs. {product.price.sale.toLocaleString()}
                          </span>
                          {product.price.sale < product.price.regular && (
                            <span className="text-sm text-gray-500 line-through">
                              Rs. {product.price.regular.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </CardDescription>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Featured Stores */}
      <section>
        <motion.h2
          className="text-3xl font-bold mb-8"
          {...fadeInUp}
        >
          Featured Stores
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-24 w-24 rounded-full mx-auto" />
                </CardHeader>
                <CardContent className="text-center">
                  <Skeleton className="h-4 w-1/2 mx-auto mb-2" />
                  <Skeleton className="h-4 w-1/3 mx-auto" />
                </CardContent>
              </Card>
            ))
          ) : (
            featuredStores.map((store) => (
              <motion.div
                key={store._id}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => navigate(`/stores/${store._id}`)}>
                  <CardHeader>
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                      <img
                        src={store.logo}
                        alt={store.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardTitle className="mb-2">{store.name}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center justify-center gap-2">
                        <span>⭐ {store.rating}</span>
                        <span>•</span>
                        <span>{store.productsCount} Products</span>
                      </div>
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Button variant="outline">Visit Store</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
} 