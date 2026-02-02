<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Wishlist;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $userId = $user->id;
        //get recent user order
        $recentOrder = Order::where('user_id', $userId)
            ->with('orderItems.product')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'status' => $order->status,
                    'payment_status' => $order->payment_status,
                    'total_price' => $order->total_price,
                    'created_at' => $order->created_at->format('M d, Y'),
                    'items_count' => $order->orderItems->count(),
                ];
            });

        $orderStats = [
            'total_orders' => Order::where('user_id', $userId)->count(),
            'completed_orders' => Order::where('status', 'completed')->count(),
            'pending_orders' => Order::where('status', 'pending')->count()
        ];

        //get wishilist items
        $wishList = Cart::where('user_id', $userId)->where('saved_for_later', true)->count();
        //Get user address
        $userAddress = [
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'address' => $user->address

        ];
        return Inertia::render('Ecommerce/Dashboard', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'address' => $user->address,
                'avatar' => $user->avatar
            ],
            'dashboardData' => [
                'recentOrders' => $recentOrder,
                'orderStatus' => $orderStats,
                'wishListCount' => $wishList,
                'userAddress' => $userAddress
            ]
        ]);

    }



    public function orders()
    {
        $user = Auth::user();
        $orders = Order::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'status' => $order->status,
                    'payment_status' => $order->payment_status,
                    'total_price' => $order->total_price,
                    'created_at' => $order->created_at->format('M d, Y'),
                    'items_count' => $order->orderItems->count(),
                ];
            });

        return Inertia::render('Ecommerce/Orders/Index', [
            'orders' => $orders
        ]);
    }


    public function wishlists()
    {
        $user = Auth::user();
        $wishlists = Wishlist::with('product')->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($wishlist) {
                return [
                    'id' => $wishlist->id,
                    'name' => $wishlist->product->name,
                    'slug' => $wishlist->product->slug,
                    'price' => $wishlist->product->price,
                    'image' => $wishlist->product->getFirstMediaUrl('images'),
                    'created_at' => $wishlist->created_at->format('M d, Y'),
                ];
            });

        return Inertia::render('Ecommerce/Wishlists/Index', [
            'wishlists' => $wishlists
        ]);
    }


    public function showOrder($id)
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)
            ->with(['orderItems.product'])
            ->findOrFail($id);

        return Inertia::render('Ecommerce/Orders/Show', [
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'status' => $order->status,
                'payment_status' => $order->payment_status,
                'payment_method' => $order->payment_method,
                'total_price' => $order->total_price,
                'subtotal' => $order->subtotal,
                'tax_amount' => $order->tax_amount,
                'shipping_amount' => $order->shipping_amount,
                'discount_amount' => $order->discount_amount,
                'created_at' => $order->created_at->format('M d, Y'),
                'estimated_delivery' => $order->estimated_delivery ? $order->estimated_delivery->format('M d, Y') : null,
                'shipped_at' => $order->shipped_at ? $order->shipped_at->format('M d, Y') : null,
                'delivered_at' => $order->delivered_at ? $order->delivered_at->format('M d, Y') : null,
                'tracking_number' => $order->tracking_number,
                'shipping_method' => $order->shipping_method,
                'customer_notes' => $order->customer_notes,

                //Billing Information
                'billing_first_name' => $order->billing_first_name,
                'billing_last_name' => $order->billing_last_name,
                'billing_email' => $order->billing_email,
                'billing_phone' => $order->billing_phone,
                'billing_address' => $order->billing_address,
                'billing_city' => $order->billing_city,
                'billing_state' => $order->billing_state,
                'billing_zip' => $order->billing_zip,
                'billing_country' => $order->billing_country,
                'billing_full_name' => $order->billing_full_name,
                //Shipping Information
                'shipping_first_name' => $order->shipping_first_name,
                'shipping_last_name' => $order->shipping_last_name,
                'shipping_address' => $order->shipping_address,
                'shipping_city' => $order->shipping_city,
                'shipping_state' => $order->shipping_state,
                'shipping_zip' => $order->shipping_zip,
                'shipping_country' => $order->shipping_country,
                'shipping_full_name' => $order->shipping_full_name,
                'is_shipping_same_as_billing' => $order->isShippingSameAsBilling(),
                //order items
                'order_items' => $order->orderItems->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'product_id' => $item->product_id,
                        'product_name' => $item->product_name,
                        'product_sku' => $item->product_sku,
                        'product_image' => $item->product_image,
                        'unit_price' => $item->unit_price,
                        'total_price' => $item->total_price,
                        'quantity' => $item->quantity,
                        'variation_data' => $item->variation_data,
                        'notes' => $item->notes,
                        'product' => $item->product ? [
                            'id' => $item->product->id,
                            'name' => $item->product->name,
                            'slug' => $item->product->slug,
                            'image' => $item->product->getFirstMediaUrl('images'),
                        ] : null,
                    ];
                })
            ],
        ]);
    }


    public function accountDetails()
    {
        $user = Auth::user();
        return Inertia::render("Ecommerce/Users/AccountDetails", [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'address' => $user->address,
                'avatar' => $user->avatar,
                'username' => $user->username,
                'email_verified_at' => $user->email_verified_at,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'newsletter_subscription' => true,
                'marketing_emails' => true,
                'order_notification' => true,
                'security_notifications' => true,

            ]
        ]);
    }


    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['nullable', 'string', 'max:255', Rule::unique('users', 'username')->ignore($user->id)],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:500'],
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);


        if ($request->hasFile('avatar')) {
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }

            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $validated['avatar'] = $avatarPath;
        }


        $user->update($validated);
        return redirect()->back()->with('success', 'Profile udpated successfully');

    }


    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'password_confirmation' => ['required']
        ]);

        $user = Auth::user();

        $user->update([
            'password' => Hash::make($validated['password'])
        ]);

        return redirect()->back()->with('success', 'Password udpated successfully');

    }
}
