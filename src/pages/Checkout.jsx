import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Truck, Shield, Lock, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_dummy');

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState('shipping');
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [savingAddress, setSavingAddress] = useState(false);

  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    try {
      if (paymentMethod === 'card') {
        const { error, paymentMethod: pm } = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement)
        });

        if (error) {
          toast.error(error.message);
          setProcessing(false);
          return;
        }

        const { data } = await api.post('/orders/create-checkout-session', {
          shippingAddress,
          paymentMethod: { type: 'card', paymentMethodId: pm.id }
        });

        if (data.url) {
          window.location.href = data.url;
        }
      } else {
        const { data } = await api.post('/orders', {
          shippingAddress,
          paymentMethod: { type: paymentMethod }
        });
        await clearCart();
        toast.success('Order placed successfully!');
        navigate(`/orders/${data.order._id}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Checkout failed');
    } finally {
      setProcessing(false);
    }
  };

  const saveAddress = async () => {
    setSavingAddress(true);
    try {
      await api.put('/auth/profile', { addresses: [...(user.addresses || []), { ...shippingAddress, isDefault: true }] });
      toast.success('Address saved!');
    } catch (error) {
      toast.error('Failed to save address');
    } finally {
      setSavingAddress(false);
    }
  };

  if (cart.items.length === 0) {
    return null;
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          {['shipping', 'payment', 'review'].map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  ['shipping', 'payment', 'review'].indexOf(step) >= i
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i + 1}
              </div>
              {i < 2 && <div className="w-16 h-1 bg-gray-200 mx-2" />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 'shipping' && (
            <div className="card p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={user.name}
                    readOnly
                    className="input bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="input bg-gray-50"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input
                      type="text"
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                      className="input"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                    className="input"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="saveAddress"
                  checked={false}
                  onChange={() => {}}
                  className="text-primary-600 focus:ring-primary-500 rounded"
                />
                <label htmlFor="saveAddress" className="text-sm text-gray-700">
                  Save this address for future orders
                </label>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className="btn btn-primary flex items-center gap-2"
                >
                  Continue to Payment
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="card p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
              <div className="space-y-4 mb-6">
                {['card', 'paypal', 'cod'].map((method) => (
                  <label
                    key={method}
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      paymentMethod === method
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                        {method === 'card' && (
                          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        )}
                        {method === 'paypal' && (
                          <span className="text-blue-600 font-bold text-lg">PP</span>
                        )}
                        {method === 'cod' && (
                          <span className="text-green-600 font-bold text-lg">$</span>
                        )}
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">
                          {method === 'card' ? 'Credit/Debit Card' : method === 'paypal' ? 'PayPal' : 'Cash on Delivery'}
                        </span>
                        <p className="text-sm text-gray-500">
                          {method === 'card' ? 'Pay securely with Stripe' : method === 'paypal' ? 'Redirect to PayPal' : 'Pay when delivered'}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Details</label>
                  <div className="bg-white border border-gray-300 rounded-lg p-4">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#1f2937',
                            '::placeholder': { color: '#9ca3af' }
                          },
                          invalid: { color: '#ef4444' }
                        }
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="btn btn-secondary"
                >
                  <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep('review')}
                  className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  Review Order
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="card p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Order</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Shipping Address</h3>
                  <address className="text-gray-700 not-italic space-y-1">
                    <p>{user.name}</p>
                    <p>{shippingAddress.street}</p>
                    <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                    <p>{shippingAddress.country}</p>
                  </address>
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="text-sm text-primary-600 hover:text-primary-700 mt-3 inline-flex items-center gap-1"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Change
                  </button>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>
                  <p className="text-gray-700 capitalize">{paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod}</p>
                  <button
                    type="button"
                    onClick={() => setStep('payment')}
                    className="text-sm text-primary-600 hover:text-primary-700 mt-3 inline-flex items-center gap-1"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Change
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className="btn btn-secondary"
                >
                  <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  {processing ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gray-50 rounded-lg">
            <Truck className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Fast Shipping</p>
            <p className="text-xs text-gray-500">Free on orders $100+</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <Shield className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Secure Payment</p>
            <p className="text-xs text-gray-500">SSL encrypted</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <Lock className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Privacy Protected</p>
            <p className="text-xs text-gray-500">We don't store card details</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Checkout() {
  const { cart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <a href="/products" className="btn btn-primary inline-flex">Continue Shopping</a>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}