import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '500px',
  backgroundColor: '#0d0d0d',
  transition: 'all 0.3s ease',
  border: '2px solid transparent',
  '&:hover': {
    border: '2px solid #424242',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#EDF2F4',
  backgroundColor: '#252525',
  borderRadius: '500px',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#EDF2F4',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    marginLeft: '5px',
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    fontSize: '1.1rem',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export { Search, SearchIconWrapper, StyledInputBase };
