import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledHeader = styled.div`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`

export interface HeaderProps {}

export const Header = (props: HeaderProps) => {
  return (
    <StyledHeader>
      <Link to="/tables">Tables</Link>
      <Link to="/batches">Batches</Link>
      <Link to="/test">Test</Link>
      <Link to="/login">Login</Link>
    </StyledHeader>
  )
}

export default Header
