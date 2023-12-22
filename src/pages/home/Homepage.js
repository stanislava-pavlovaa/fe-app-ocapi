import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container className='mt-5 d-flex flex-column align-items-center'>
      <h1>Welcome to Our Online Store!</h1>
      <p>Explore our amazing collection of products. Find the perfect items for you!</p>
      <p>
        <Link to='/microsoft-xbox360-bundleM'>
          <Button variant='danger'>Shop Now</Button>
        </Link>
      </p>
    </Container>
  );
};

export default HomePage;
