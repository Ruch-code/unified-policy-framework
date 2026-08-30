import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 0 });
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    sort: 'createdAt',
    order: 'desc'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    setFilters(prev => ({
      ...prev,
      category: params.category || '',
      minPrice: params.minPrice || '',
      maxPrice: params.maxPrice || '',
      search: params.search || ''
    }));
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: pagination.page,
          limit: pagination.limit,
          ...filters
        });
        if (filters.category) params.append('category', filters.category);
        if (filters.brand) params.append('brand', filters.brand);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        params.append('sort', filters.sort);
        params.append('order', filters.order);

        const { data } = await api.get(`/products?${params.toString()}`);
        setProducts(data.products);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchFilters = async () => {
      try {
        const [catsRes, brandsRes] = await Promise.all([
          api.get('/products/categories'),
          api.get('/products/brands')
        ]);
        setCategories(catsRes.data.categories);
        setBrands(brandsRes.data.brands);
      } catch (error) {
        console.error('Failed to fetch filters:', error);
      }
    };

    fetchProducts();
    fetchFilters();
  }, [pagination.page, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSortChange = (sort) => {
    setFilters(prev => ({
      ...prev,
      sort,
      order: prev.sort === sort && prev.order === 'desc' ? 'asc' : 'desc'
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      sort: 'createdAt',
      order: 'desc'
    });
    setSearchParams({});
  };

  const hasActiveFilters = filters.category || filters.brand || filters.minPrice || filters.maxPrice;

  if (loading && products.length === 0) {
    return (
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="aspect-square bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                className="lg:hidden btn btn-secondary text-sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-1" /> {showFilters ? 'Hide' : 'Show'} Filters
              </button>
            </div>

            {showFilters || !showFilters} && (
              <div className={`space-y-6 ${!showFilters ? 'lg:block hidden' : ''}`}>
                <fieldset>
                  <legend className="font-medium text-gray-900 mb-3">Category</legend>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value=""
                        checked={!filters.category}
                        onChange={() => handleFilterChange('category', '')}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">All Categories</span>
                    </label>
                    {categories.map((cat) => (
                      <label key={cat._id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={cat._id}
                          checked={filters.category === cat._id}
                          onChange={() => handleFilterChange('category', cat._id)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">{cat._id} ({cat.count})</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="font-medium text-gray-900 mb-3">Brand</legend>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          value={brand}
                          checked={filters.brand === brand}
                          onChange={() => handleFilterChange('brand', filters.brand === brand ? '' : brand)}
                          className="text-primary-600 focus:ring-primary-500 rounded"
                        />
                        <span className="text-sm text-gray-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="font-medium text-gray-900 mb-3">Price Range</legend>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="input text-sm w-1/2"
                      min="0"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="input text-sm w-1/2"
                      min="0"
                    />
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="font-medium text-gray-900 mb-3">Sort By</legend>
                  <select
                    value={`${filters.sort},${filters.order}`}
                    onChange={(e) => {
                      const [sort, order] = e.target.value.split(',');
                      handleSortChange(sort);
                    }}
                    className="input text-sm"
                  >
                    <option value="createdAt,desc">Newest</option>
                    <option value="createdAt,asc">Oldest</option>
                    <option value="price,asc">Price: Low to High</option>
                    <option value="price,desc">Price: High to Low</option>
                    <option value="name,asc">Name: A-Z</option>
                    <option value="name,desc">Name: Z-A</option>
                  </select>
                </fieldset>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="btn btn-secondary w-full text-sm"
                  >
                    <X className="w-4 h-4 mr-1" /> Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {filters.search ? `Search results for "${filters.search}"` : 'All Products'}
              </h1>
              <p className="text-gray-500 mt-1">
                {pagination.total} product{pagination.total !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
              <button onClick={clearFilters} className="btn btn-primary">
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {pagination.pages > 1 && (
                <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={pagination.page === 1}
                    className="btn btn-secondary p-2"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    let pageNum;
                    if (pagination.pages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.page <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.page >= pagination.pages - 2) {
                      pageNum = pagination.pages - 4 + i;
                    } else {
                      pageNum = pagination.page - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                          pagination.page === pageNum
                            ? 'bg-primary-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                        aria-label={`Page ${pageNum}`}
                        aria-current={pagination.page === pageNum ? 'page' : undefined}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={pagination.page === pagination.pages}
                    className="btn btn-secondary p-2"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </nav>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}