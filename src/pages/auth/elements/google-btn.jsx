import React from 'react'
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';

export const GoogleBtn = React.memo(({ loginWithGoogle }) => (
	<GoogleLogin
		onSuccess={loginWithGoogle}
		onError={() => {
			toast.error('Google Login Failed');
		}}
	/>
));