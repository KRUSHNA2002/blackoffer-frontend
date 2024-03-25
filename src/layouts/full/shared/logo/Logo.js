import { Link } from 'react-router-dom';

import { styled } from '@mui/material';


const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      {/* <LogoDark height={70} /> */}
      <div className='d-flex justify-content-center mt-4'>
      <img src="https://blackcoffer.com/wp-content/uploads/2023/10/Black-720x172-4.png" alt="" className='h-100 w-100' />
      </div>
    </LinkStyled>
  )
};

export default Logo;
