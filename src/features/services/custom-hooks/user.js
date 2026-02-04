import { useQuery, useMutation } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../../../store/slice/auth';
import { useNavigate } from 'react-router-dom';

const useGetUserQuery = () => {
	return useQuery({
		queryKey: ['users/getMe'],
		queryFn: () =>
			axiosCall({
				url: '/api/users/getMe',
				method: 'GET',
			}),
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
			dispatch(setToken(data?.token));
			dispatch(setUser(data));
			navigate("/");
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
			dispatch(setToken(data?.token));
			dispatch(setUser(data));
			navigate("/");
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
	return useMutation({
		mutationFn: (token) =>
			axiosCall({
				url: '/api/users/2fa/verify',
				method: 'POST',
				data: { token },
			}),
	});
};

const useGoogleLoginMutation = () => {
	const dispatch = useDispatch();

	return useMutation({
		mutationFn: ({ idToken, token }) =>
			axiosCall({
				url: '/api/users/social/google',
				method: 'POST',
				data: { idToken, token },
			}),
		onSuccess: (data) => {
			dispatch(setToken(data?.token));
			dispatch(setUser(data));
			toast.success('Login successful');
		},
	});
};

const useAppleLoginMutation = () => {
	const dispatch = useDispatch();

	return useMutation({
		mutationFn: ({ identityToken, token }) =>
			axiosCall({
				url: '/api/users/social/apple',
				method: 'POST',
				data: { identityToken, token },
			}),
		onSuccess: (data) => {
			dispatch(setToken(data?.token));
			dispatch(setUser(data));
			toast.success('Login successful');
		},
	});
};

const useUpdateProfileMutation = () => {
	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/users/profile',
				method: 'PUT',
				data,
			}),
	});
};

export { useGetUserQuery, useRegisterUserMutation, useLoginUserMutation };

const UserServices = {
	register: useRegisterUserMutation,
	login: useLoginUserMutation,
	getMe: useGetUserQuery,
	setup2fa: useSetup2faMutation,
	verify2fa: useVerify2faMutation,
	googleLogin: useGoogleLoginMutation,
	appleLogin: useAppleLoginMutation,
	updateProfile: useUpdateProfileMutation,
};

export default UserServices;
