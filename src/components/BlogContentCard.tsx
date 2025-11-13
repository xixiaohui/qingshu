// components/BlogContent.tsx
import { Typography } from "@mui/material";

interface BlogContentProps {
  content?: string;
  variant?: "body1" | "body2" | "subtitle1" | "subtitle2";
  sx?: object;
}

const BlogContent: React.FC<BlogContentProps> = ({
  content = "",
  variant = "body2",
  sx = {},
}) => {
  return (
    <Typography
      variant={variant}
      sx={{
        whiteSpace: "pre-line", // 保留换行
        ...sx,
      }}
    >
      {content}
    </Typography>
  );
};

export default BlogContent;
