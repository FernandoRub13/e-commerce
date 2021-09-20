import { useAdminAuth } from './../customsHook'

const WithAdminAuth = props => useAdminAuth(props) && props.children;

export default WithAdminAuth;