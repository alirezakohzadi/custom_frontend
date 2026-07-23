import { Link } from 'react-router-dom';

function BtnNavbar({ url, title}) {


  return (
    <div>
      <Link to={url} className="flex w-full font-light items-center justify-center  hover:font-bold">
        {title}
      </Link>
    </div>
  );
}

export default BtnNavbar;
