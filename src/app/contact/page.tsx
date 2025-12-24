import FramePage from "@/components/Frame";
import { Typography } from "@mui/material";

const contact = 
  `
  若您對本隱私權政策有任何疑問，請透過以下方式聯絡我們： 
  📧 6619766@gmail.com 
  🌐 網站：https://qingshu.shop
  `
;

function ContactContent(){
    return (<>
        <Typography variant="h1" gutterBottom>
            聯絡我們
        </Typography>
        <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
          {contact}
        </Typography>
    </>);
}
export default function Contact() {
  return (
    <FramePage>
        <ContactContent></ContactContent>
    </FramePage>
  );
}