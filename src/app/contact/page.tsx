import FramePage from "@/components/Frame";
import { Typography } from "@mui/material";



function ContactContent(){
    return (<>
        <Typography variant="h1" gutterBottom>
            聯絡我們
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