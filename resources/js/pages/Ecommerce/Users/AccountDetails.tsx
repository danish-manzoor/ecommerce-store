import { Card } from '@/components/ui/card';
import UserLayout from '@/layouts/user-layout';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

const AccountDetails = ({ user }: { user: any }) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const avatarInputRef = useRef(null);

    // Profile form
    const profileForm = useForm({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        avatar: null,
    });

    // Password form
    const passwordForm = useForm({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });

    // Notification preferences form
    const notificationForm = useForm({
        newsletter_subscription: user.newsletter_subscription || false,
        marketing_emails: user.marketing_emails || false,
        order_notification: user.order_notification || false,
        security_notifications: user.security_notifications || false,
    });

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        profileForm.post(route('user.profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                // Handle success
            },
        });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        passwordForm.post(route('user.password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                passwordForm.reset();
            },
        });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            profileForm.setData('avatar', file);
        }
    };

    return (
        <UserLayout>
            <div className="min-h-screen bg-gray-50 p-4 md:p-8">
                {/* Header */}
                <div className="mx-auto mb-8 max-w-5xl">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        Account Details
                    </h1>
                    <p className="text-gray-600">
                        Manage your account settings and preferences
                    </p>
                </div>

                {/* Tabs Navigation */}
                <div className="mx-auto mb-8 max-w-5xl">
                    <Card className="p-2">
                        <div className="flex flex-col gap-2 md:flex-row">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-all ${
                                    activeTab === 'profile'
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                Profile Information
                            </button>
                            <button
                                onClick={() => setActiveTab('security')}
                                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-all ${
                                    activeTab === 'security'
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                                Security
                            </button>
                        </div>
                    </Card>
                </div>

                {/* Content */}
                <div className="mx-auto max-w-5xl">
                    {activeTab === 'profile' && (
                        <form
                            onSubmit={handleProfileSubmit}
                            className="space-y-6"
                        >
                            <Card className="p-6 md:p-8">
                                {/* Card Header */}
                                <div className="mb-6 border-b border-gray-200 pb-6">
                                    <div className="mb-2 flex items-center gap-2">
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            Personal Information
                                        </h2>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Update your personal information and
                                        profile picture
                                    </p>
                                </div>

                                {/* Profile Picture Section */}
                                <div className="mb-8 flex flex-col items-center gap-6 border-b border-gray-200 pb-8 md:flex-row">
                                    <div className="relative">
                                        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-3xl font-semibold text-white">
                                            {user.avatar ? (
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                user.name
                                                    ?.charAt(0)
                                                    .toUpperCase() || 'U'
                                            )}
                                        </div>
                                        <div className="absolute right-0 bottom-0 flex h-7 w-7 items-center justify-center rounded-full border-3 border-white bg-purple-600">
                                            <svg
                                                className="h-3 w-3 text-white"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                            Profile Picture
                                        </h3>
                                        <input
                                            ref={avatarInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                            className="hidden"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                avatarInputRef.current?.click()
                                            }
                                            className="rounded-lg bg-gray-900 px-5 py-2.5 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-gray-800"
                                        >
                                            Upload New Photo
                                        </button>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Full Name{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            value={profileForm.data.name}
                                            onChange={(e) =>
                                                profileForm.setData(
                                                    'name',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-purple-500"
                                        />
                                        {profileForm.errors.name && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {profileForm.errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            value={profileForm.data.username}
                                            onChange={(e) =>
                                                profileForm.setData(
                                                    'username',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-purple-500"
                                        />
                                        {profileForm.errors.username && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {profileForm.errors.username}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Email Address{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="email"
                                            value={profileForm.data.email}
                                            onChange={(e) =>
                                                profileForm.setData(
                                                    'email',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-purple-500"
                                        />
                                        {user.email_verified_at ? (
                                            <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
                                                <svg
                                                    className="h-3 w-3"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-800">
                                                Not Verified
                                            </span>
                                        )}
                                        {profileForm.errors.email && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {profileForm.errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={profileForm.data.phone}
                                            onChange={(e) =>
                                                profileForm.setData(
                                                    'phone',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-purple-500"
                                        />
                                        {profileForm.errors.phone && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {profileForm.errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            value={profileForm.data.address}
                                            onChange={(e) =>
                                                profileForm.setData(
                                                    'address',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-purple-500"
                                        />
                                        {profileForm.errors.address && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {profileForm.errors.address}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="mt-8 flex gap-4 border-t border-gray-200 pt-8">
                                    <button
                                        type="submit"
                                        disabled={profileForm.processing}
                                        className="flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-gray-800 disabled:transform-none disabled:cursor-not-allowed disabled:bg-gray-400"
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                                        </svg>
                                        {profileForm.processing
                                            ? 'Updating...'
                                            : 'Update Profile'}
                                    </button>
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-600 transition-all hover:bg-gray-50"
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                        Cancel
                                    </button>
                                </div>
                            </Card>
                        </form>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            {/* Change Password Card */}
                            <form onSubmit={handlePasswordSubmit}>
                                <Card className="p-6 md:p-8">
                                    <div className="mb-6 border-b border-gray-200 pb-6">
                                        <div className="mb-2 flex items-center gap-2">
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                />
                                            </svg>
                                            <h2 className="text-xl font-semibold text-gray-900">
                                                Change Password
                                            </h2>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Update your password to keep your
                                            account secure
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Current Password{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={
                                                        showCurrentPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    value={
                                                        passwordForm.data
                                                            .current_password
                                                    }
                                                    onChange={(e) =>
                                                        passwordForm.setData(
                                                            'current_password',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Enter current password"
                                                    required
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 transition-all focus:border-transparent focus:ring-2 focus:ring-purple-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowCurrentPassword(
                                                            !showCurrentPassword,
                                                        )
                                                    }
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    <svg
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                            {passwordForm.errors
                                                .current_password && (
                                                <p className="mt-2 text-sm text-red-500">
                                                    {
                                                        passwordForm.errors
                                                            .current_password
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    New Password{' '}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={
                                                            showNewPassword
                                                                ? 'text'
                                                                : 'password'
                                                        }
                                                        value={
                                                            passwordForm.data
                                                                .new_password
                                                        }
                                                        onChange={(e) =>
                                                            passwordForm.setData(
                                                                'new_password',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Enter new password"
                                                        required
                                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 transition-all focus:border-transparent focus:ring-2 focus:ring-purple-500"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowNewPassword(
                                                                !showNewPassword,
                                                            )
                                                        }
                                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                    >
                                                        <svg
                                                            className="h-5 w-5"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                                {passwordForm.errors
                                                    .new_password && (
                                                    <p className="mt-2 text-sm text-red-500">
                                                        {
                                                            passwordForm.errors
                                                                .new_password
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Confirm New Password{' '}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={
                                                            showConfirmPassword
                                                                ? 'text'
                                                                : 'password'
                                                        }
                                                        value={
                                                            passwordForm.data
                                                                .new_password_confirmation
                                                        }
                                                        onChange={(e) =>
                                                            passwordForm.setData(
                                                                'new_password_confirmation',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Confirm new password"
                                                        required
                                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 transition-all focus:border-transparent focus:ring-2 focus:ring-purple-500"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowConfirmPassword(
                                                                !showConfirmPassword,
                                                            )
                                                        }
                                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                    >
                                                        <svg
                                                            className="h-5 w-5"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                                {passwordForm.errors
                                                    .new_password_confirmation && (
                                                    <p className="mt-2 text-sm text-red-500">
                                                        {
                                                            passwordForm.errors
                                                                .new_password_confirmation
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex gap-4 border-t border-gray-200 pt-8">
                                        <button
                                            type="submit"
                                            disabled={passwordForm.processing}
                                            className="flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-gray-800 disabled:transform-none disabled:cursor-not-allowed disabled:bg-gray-400"
                                        >
                                            <svg
                                                className="h-4 w-4"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {passwordForm.processing
                                                ? 'Updating...'
                                                : 'Update Password'}
                                        </button>
                                        <button
                                            type="button"
                                            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-600 transition-all hover:bg-gray-50"
                                        >
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                            Cancel
                                        </button>
                                    </div>
                                </Card>
                            </form>

                            {/* Account Security Info Card */}
                            <Card className="p-6 md:p-8">
                                <div className="mb-6 border-b border-gray-200 pb-6">
                                    <div className="mb-2 flex items-center gap-2">
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            />
                                        </svg>
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            Account Security
                                        </h2>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Important security information about
                                        your account
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <p className="mb-1 text-sm font-medium text-gray-600">
                                            Email Verification
                                        </p>
                                        <p className="text-base font-medium">
                                            {user.email_verified_at ? (
                                                <span className="text-green-600">
                                                    ✓ Your email is verified
                                                </span>
                                            ) : (
                                                <span className="text-yellow-600">
                                                    ⚠ Your email is not
                                                    verified
                                                </span>
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="mb-1 text-sm font-medium text-gray-600">
                                            Account Created
                                        </p>
                                        <p className="text-base font-medium text-gray-900">
                                            {new Date(
                                                user.created_at,
                                            ).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="mb-1 text-sm font-medium text-gray-600">
                                            Last Updated
                                        </p>
                                        <p className="text-base font-medium text-gray-900">
                                            {new Date(
                                                user.updated_at,
                                            ).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            {/* Notification Preferences Card */}
                            <Card className="p-6 md:p-8">
                                <div className="mb-6 border-b border-gray-200 pb-6">
                                    <div className="mb-2 flex items-center gap-2">
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                            />
                                        </svg>
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            Notification Preferences
                                        </h2>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Manage how you receive notifications
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {/* Newsletter */}
                                    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-5 transition-colors hover:bg-gray-50">
                                        <div>
                                            <h4 className="mb-1 text-base font-semibold text-gray-900">
                                                Newsletter Subscription
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Receive weekly newsletter with
                                                updates and offers
                                            </p>
                                        </div>
                                        <label className="relative inline-flex cursor-pointer items-center">
                                            <input
                                                type="checkbox"
                                                className="peer sr-only"
                                            />
                                            <div className="peer h-7 w-12 rounded-full bg-gray-300 peer-checked:bg-purple-600 peer-focus:ring-4 peer-focus:ring-purple-300 peer-focus:outline-none after:absolute after:top-0.5 after:left-[2px] after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                        </label>
                                    </div>

                                    {/* Marketing */}
                                    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-5 transition-colors hover:bg-gray-50">
                                        <div>
                                            <h4 className="mb-1 text-base font-semibold text-gray-900">
                                                Marketing Emails
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Receive promotional emails about
                                                new products and sales
                                            </p>
                                        </div>
                                        <label className="relative inline-flex cursor-pointer items-center">
                                            <input
                                                type="checkbox"
                                                className="peer sr-only"
                                            />
                                            <div className="peer h-7 w-12 rounded-full bg-gray-300 peer-checked:bg-purple-600 peer-focus:ring-4 peer-focus:ring-purple-300 peer-focus:outline-none after:absolute after:top-0.5 after:left-[2px] after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                        </label>
                                    </div>

                                    {/* Order */}
                                    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-5 transition-colors hover:bg-gray-50">
                                        <div>
                                            <h4 className="mb-1 text-base font-semibold text-gray-900">
                                                Order Notifications
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Get notified about your order
                                                status and updates
                                            </p>
                                        </div>
                                        <label className="relative inline-flex cursor-pointer items-center">
                                            <input
                                                type="checkbox"
                                                className="peer sr-only"
                                            />
                                            <div className="peer h-7 w-12 rounded-full bg-gray-300 peer-checked:bg-purple-600 peer-focus:ring-4 peer-focus:ring-purple-300 peer-focus:outline-none after:absolute after:top-0.5 after:left-[2px] after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                        </label>
                                    </div>

                                    {/* Security */}
                                    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-5 transition-colors hover:bg-gray-50">
                                        <div>
                                            <h4 className="mb-1 text-base font-semibold text-gray-900">
                                                Security Notifications
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Receive alerts about account
                                                security and suspicious activity
                                            </p>
                                        </div>
                                        <label className="relative inline-flex cursor-pointer items-center">
                                            <input
                                                type="checkbox"
                                                className="peer sr-only"
                                            />
                                            <div className="peer h-7 w-12 rounded-full bg-gray-300 peer-checked:bg-purple-600 peer-focus:ring-4 peer-focus:ring-purple-300 peer-focus:outline-none after:absolute after:top-0.5 after:left-[2px] after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                        </label>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
};

export default AccountDetails;
