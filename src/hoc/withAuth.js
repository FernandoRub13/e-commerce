import { useAuth } from "../customsHook"; 

const WithAuth = props => useAuth(props) && props.children;

export default WithAuth;