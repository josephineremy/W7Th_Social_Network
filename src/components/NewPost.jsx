import { useSelector, useDispatch } from 'react-redux';

const NewPost = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
}
export default NewPost