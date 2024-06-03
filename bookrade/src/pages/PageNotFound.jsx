import image from '../assets/images/404.png';

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
        <h1 className='text-5xl text-green-800  mb-10'>The page you were looking for was not found</h1>
      <img src={image} alt="Page Not Found" className='w-4/12' />
    </div>
  );
}

export default PageNotFound;
