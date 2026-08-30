import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}?populate=reviews`);
        setProduct(data.product);
        setSelectedImage(0);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        toast.error('Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to cart');
      return;
    }
    setAdding(true);
    try {
      await addToCart(id, quantity);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-200 animate-pulse rounded-xl"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
            <div className="h-8 bg-gray-200 animate-pulse rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
            <div className="h-12 bg-gray-200 animate-pulse rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="container py-8">
      <nav className="flex gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-gray-700">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-gray-700">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900 truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 relative">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-lg">
                -{discount}%
              </span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary-600' : 'border-transparent hover:border-gray-300'
                  }`}
                  aria-label={`View image ${index + 1}`}
                  aria-current={selectedImage === index ? 'true' : 'false'}
                >
                  <img src={image} alt={`${product.name} - view ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <span className="text-sm text-primary-600 font-medium">{product.brand || product.category}</span>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(product.ratings.average) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-2">({product.ratings.count} reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t border-b border-gray-100 py-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            {discount > 0 && (
              <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                Save {discount}%
              </span>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Availability</h3>
            <div className="flex items-center gap-3">
              <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                product.stock > 10 ? 'bg-green-100 text-green-800' :
                product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
              </span>
              {product.stock > 0 && (
                <span className="text-sm text-gray-500">Usually ships within 1-2 business days</span>
              )}
            </div>
          </div>

          {product.specifications && product.specifications.size > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Specifications</h3>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                {Array.from(product.specifications.entries()).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-gray-500">{key}</dt>
                    <dd className="font-medium text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="flex items-center gap-4 pt-4">
            <label className="text-sm font-medium text-gray-700">Qty:</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                aria-label="Decrease quantity"
              >−</button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                max={product.stock}
                min="1"
                className="w-16 text-center border-x border-gray-300 focus:outline-none"
                aria-label="Quantity"
              />
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
                className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                aria-label="Increase quantity"
              >+</button>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={adding || product.stock === 0}
              className="btn btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {adding ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className="btn btn-secondary p-3"
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={2} />
            </button>
            <button className="btn btn-secondary p-3" aria-label="Share product">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div className="flex flex-col items-center gap-2 text-center p-4 bg-gray-50 rounded-lg">
              <Truck className="w-6 h-6 text-primary-600" />
              <span className="text-sm font-medium text-gray-900">Free Shipping</span>
              <span className="text-xs text-gray-500">On orders $100+</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center p-4 bg-gray-50 rounded-lg">
              <Shield className="w-6 h-6 text-primary-600" />
              <span className="text-sm font-medium text-gray-900">Secure Payment</span>
              <span className="text-xs text-gray-500">100% protected</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center p-4 bg-gray-50 rounded-lg">
              <RotateCcw className="w-6 h-6 text-primary-600" />
              <span className="text-sm font-medium text-gray-900">Easy Returns</span>
              <span className="text-xs text-gray-500">30-day policy</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-8">
        <div className="flex gap-4 border-b border-gray-200 mb-6">
          {['description', 'specifications', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="prose max-w-none">
          {activeTab === 'description' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
            </div>
          )}

          {activeTab === 'specifications' && product.specifications && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from(product.specifications.entries()).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-100 pb-2">
                    <dt className="text-gray-500 text-sm">{key}</dt>
                    <dd className="font-medium text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
              {product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-4">
                  {product.reviews.map((review) => (
                    <div key={review._id || review.user._id} className="border border-gray-100 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-primary-600 font-medium text-sm">
                              {review.user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">{review.user.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}