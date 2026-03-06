import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser, setToken, updateUser } from '../../../store/slice/auth';
import { useNavigate } from 'react-router-dom';

const useGetUserQuery = () => {
	const dispatch = useDispatch();
	return useQuery({
		queryKey: ['users/getMe'],
		queryFn: () =>
			axiosCall({
				url: '/api/users/getMe',
				method: 'GET',
			}),
		onSuccess: (data) => {
			dispatch(setUser(data));
			toast.success('You have been registered');
		},
		refetchOnWindowFocus: false,
	});
};

const useRegisterUserMutation = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/users',
				method: 'POST',
				data,
			}),
		onSuccess: (data) => {
			const { token, ...others } = data;
			dispatch(setToken(token));
			dispatch(setUser({ ...others }));
			navigate('/');
			toast.success('You have been registered');
		},
	});
};

const useLoginUserMutation = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/users/login',
				method: 'POST',
				data,
			}),
		onSuccess: (data) => {
			const { token, ...others } = data;
			dispatch(setToken(token));
			dispatch(setUser({ ...others }));
			navigate('/');
			toast.success('Log in successful');
		},
	});
};

const useSetup2faMutation = () => {
	return useMutation({
		mutationFn: () =>
			axiosCall({
				url: '/api/users/2fa/setup',
				method: 'GET',
			}),
	});
};

const useVerify2faMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (token) =>
			axiosCall({
				url: '/api/users/2fa/verify',
				method: 'POST',
				data: { token },
			}),

		onSuccess: (data) => {
			queryClient.invalidateQueries(['users/getMe']);
			toast.success(data?.message || 'Two-Factor Authentication Verified');
		},
	});
};

const useToggle2faMutation = () => {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (enable) =>
			axiosCall({
				url: '/api/users/2fa/toggle',
				method: 'PUT',
				data: { enable },
			}),

		onSuccess: (data) => {
			dispatch(
				updateUser({
					user2fa: {
						enable: data?.user2fa?.enable,
					},
				})
			);
			// Optional but recommended for sync
			queryClient.invalidateQueries(['users/getMe']);
			toast.success(data?.message || '2FA updated successfully');
		},
	});
};

const useGoogleLoginMutation = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: ({ idToken, token }) =>
			axiosCall({
				url: '/api/users/social/google',
				method: 'POST',
				data: { idToken, token },
			}),
		onSuccess: (data) => {
			const { token, ...others } = data;
			dispatch(setToken(token));
			dispatch(setUser({ ...others }));
			navigate('/');
			toast.success('Login successful');
		},
	});
};

const useAppleLoginMutation = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: ({ identityToken, token }) =>
			axiosCall({
				url: '/api/users/social/apple',
				method: 'POST',
				data: { identityToken, token },
			}),
		onSuccess: (data) => {
			const { token, ...others } = data;
			dispatch(setToken(token));
			dispatch(setUser({ ...others }));
			navigate('/');
			toast.success('Login successful');
		},
	});
};

const useUpdateProfileMutation = () => {
	const queryClient = useQueryClient();
	const dispatch = useDispatch();

	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/users/profile',
				method: 'PUT',
				data,
			}),
		onSuccess: (data) => {
			dispatch(updateUser(data.user));
			queryClient.invalidateQueries(['users/getMe']);
			toast.success('Profile updated successfully');
		},
	});
};

export { useGetUserQuery, useRegisterUserMutation, useLoginUserMutation };

const UserServices = {
	register: useRegisterUserMutation,
	login: useLoginUserMutation,
	getMe: useGetUserQuery,
	toggle2fa: useToggle2faMutation,
	setup2fa: useSetup2faMutation,
	verify2fa: useVerify2faMutation,
	googleLogin: useGoogleLoginMutation,
	appleLogin: useAppleLoginMutation,
	updateProfile: useUpdateProfileMutation,
};

export default UserServices;
