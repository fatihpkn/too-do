import { useAuth } from "context/auth";
import Link from "next/link";
import * as React from "react";
import { API } from "SupabaseAPI";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const currentUser = API.auth.user();


  return (
    <div className='py-2 mb-4'>
      <div className='flex justify-between'>
        <div>
          <h1 className='text-purple-500 font-extrabold px-2 py-1 border border-purple-400 rounded drop-shadow-md select-none'>TOO do</h1>
        </div>
        <div>
          <div className='rounded-lg inline-flex items-center py-2 px-3'>
            <span className='text-xs'>{currentUser?.email}</span>
            <Link href='logout' passHref>
              <a className='rounded-full ml-2 text-xs inline-flex items-center px-3 py-1 bg-red-500 text-white outline-red-600 outline-offset-2 transition-all'>
                Logout
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
