import { createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};

color: ${({ theme }) => theme.text};

font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;

transition: all 0.50s linear;
  }

  nav {
    background: ${({ theme }) => theme.navbar};

  }

  #foot{
    background: ${({ theme }) => theme.navbar};

  }
  footer{
    background: ${({ theme }) => theme.footer};

  }
  #navbtn{
     
    background: ${({ theme }) => theme.buttons};
   
  }
  #mainer{
    background: ${({ theme }) => theme.mainer};
  }
  #strip{
      border-bottom: 1px solid  ${({ theme }) => theme.strip};
  }
  #primary{
        background: ${({ theme }) => theme.primary};
      border-color:${({ theme }) => theme.primary};
  }
  #searchbar{
    
  border-color:${({ theme }) => theme.primary};
}
#times{
     
    border-color:${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary};
  }

  `