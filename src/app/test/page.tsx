import MainContent from "@/components/test/MainContent";
import { Container } from "@mui/material";
import { blue, grey, red } from "@mui/material/colors";


function TestPage() {
  return (
    <Container

      maxWidth='lg'
      component='main'
      sx={{
        display:'flex',
        flexDirection:'column',
        my:16,
        gap:4,
        
      }}
    >
      <MainContent></MainContent>
    </Container>
  );
}

export default TestPage;