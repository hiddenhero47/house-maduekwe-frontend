import { useQuery, useMutation } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../../../store/slice/auth';

const useGetUserQuery = () => {
	return useQuery(
		['user/getMe'],
		() =>
			axiosCall({
				url: '/api/users/getMe',
				method: 'GET',
			}),
		{
			refetchOnWindowFocus: false,
		}
	);
};

const useRegisterUserMutation = () => {
	const dispatch = useDispatch();
	return useMutation(
		(data) => axiosCall({ url: '/api/users', method: 'POST', data }),
		{
			onSuccess: (data) => {
				dispatch(setToken(data?.token));
				dispatch(setUser(data));
				toast.success('You have been registered');
			},
		}
	);
};

const useLoginUserMutation = () => {
	const dispatch = useDispatch();
	return useMutation(
		(data) => axiosCall({ url: '/api/users/login', method: 'POST', data }),
		{
			onSuccess: (data) => {
				console.log(data, 'kkkdddddddddd');

				dispatch(setToken(data?.token));
				dispatch(setUser(data));
				toast.success('Log in successful');
			},
		}
	);
};

const useSetup2faMutation = () => {
	return useMutation(['user/2fa/setup'], () =>
		axiosCall({
			url: '/api/users/2fa/setup',
			method: 'GET',
		})
	);
};

const useVerify2faMutation = () => {
	return useMutation((token) =>
		axiosCall({
			url: '/api/users/2fa/verify',
			method: 'POST',
			data: { token },
		})
	);
};

const useGoogleLoginMutation = () => {
	const dispatch = useDispatch();

	return useMutation(
		({ idToken, token }) =>
			axiosCall({
				url: '/api/users/social/google',
				method: 'POST',
				data: { idToken, token },
			}),
		{
			onSuccess: (data) => {
				dispatch(setToken(data?.token));
				dispatch(setUser(data));
				toast.success('Login successful');
			},
		}
	);
};

const useAppleLoginMutation = () => {
	const dispatch = useDispatch();

	return useMutation(
		({ identityToken, token }) =>
			axiosCall({
				url: '/api/users/social/apple',
				method: 'POST',
				data: { identityToken, token },
			}),
		{
			onSuccess: (data) => {
				dispatch(setToken(data?.token));
				dispatch(setUser(data));
				toast.success('Login successful');
			},
		}
	);
};

const useUpdateProfileMutation = () => {
	return useMutation((data) =>
		axiosCall({
			url: '/api/users/profile',
			method: 'PUT',
			data,
		})
	);
};

// Export hooks individually
export { useGetUserQuery, useRegisterUserMutation, useLoginUserMutation };

// Optionally, provide a wrapper hook
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
