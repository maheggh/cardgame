import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = (token) => {
	return(
		(token.token) ? <Outlet/> : <Navigate to="/login"/>
	)
}

export default PrivateRoutes;