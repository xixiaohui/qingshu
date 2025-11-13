import * as React from "react";
import {
  Grid,
  Typography,
  CardMedia,
  styled,
  CardContent,
  Card,
  Box,
  AvatarGroup,
  Avatar,
  Link,
} from "@mui/material";
import { slugify } from "./Latest";
import { motion } from "framer-motion";
import { formatDateSmart } from "@/lib/util";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: (theme.vars || theme).palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
    boxShadow: 4,
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
}));

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export function Author({
  authors,
  time = "2025年11月12日",
}: {
  authors: { name: string; avatar: string }[];
  time?: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(", ")}
        </Typography>
      </Box>
      <Typography variant="caption">{formatDateSmart(time)}</Typography>
    </Box>
  );
}

// 单张卡片的数据类型
export type CardItem = {
  id?: number;
  img: string;
  tag: string;
  title: string;
  description: string;
  authors: { name: string; avatar: string }[];
  content?: string;
  created_at?: string;
};

// 单卡组件
function ContentCard({
  data,
  index,
  focusedCardIndex,
  onFocus,
  onBlur,
  md = 6,
}: {
  data: CardItem;
  index: number;
  focusedCardIndex: number | null;
  onFocus: (index: number) => void;
  onBlur: () => void;
  md?: number;
}) {
  return (
    <Grid size={{ xs: 12, md: md }}>
      <Link
        href={`/blog/${slugify(data.title)}`}
        style={{ textDecoration: "none" }}
      >
        <StyledCard
          variant="outlined"
          onFocus={() => onFocus(index)}
          onBlur={onBlur}
          tabIndex={0}
          className={focusedCardIndex === index ? "Mui-focused" : ""}
        >
          <motion.img
            src={data.img}
            alt={data.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              width: "100%",
              aspectRatio: "16 / 9",
              borderBottom: "1px solid var(--mui-palette-divider)",
              cursor: "pointer",
            }}
          />
          <StyledCardContent>
            <Typography gutterBottom variant="caption" component="div">
              {data.tag}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {data.title}
            </Typography>
            <StyledTypography
              variant="body2"
              color="text.secondary"
              gutterBottom
            >
              {data.description}
            </StyledTypography>
          </StyledCardContent>
          <Author authors={data.authors} time={data.created_at} />
        </StyledCard>
      </Link>
    </Grid>
  );
}

function ContentCard2({
  data,
  index,
  focusedCardIndex,
  onFocus,
  onBlur,
}: {
  data: CardItem;
  index: number;
  focusedCardIndex: number | null;
  onFocus: (index: number) => void;
  onBlur: () => void;
}) {
  return (
    <>
      <Link
        href={`/blog/${slugify(data.title)}`}
        style={{ textDecoration: "none" }}
      >
        <StyledCard
          variant="outlined"
          onFocus={() => onFocus(index)}
          onBlur={onBlur}
          tabIndex={0}
          className={focusedCardIndex === index ? "Mui-focused" : ""}
        >
          <StyledCardContent>
            <Typography gutterBottom variant="caption" component="div">
              {data.tag}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {data.title}
            </Typography>
            <StyledTypography
              variant="body2"
              color="text.secondary"
              gutterBottom
            >
              {data.description}
            </StyledTypography>
          </StyledCardContent>
          <Author authors={data.authors} time={data.created_at} />
        </StyledCard>
      </Link>
    </>
  );
}

// 网格组件：自动渲染多个卡片
export default function MainContentCard({
  data,
  md = 6,
  isHaveImage = true,
  message = "",
}: {
  data: CardItem[];
  md?: number;
  isHaveImage?: boolean;
  message?: string;
}) {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null
  );

  const handleFocus = (index: number) => setFocusedCardIndex(index);
  const handleBlur = () => setFocusedCardIndex(null);

  return (
    <>
      {data.map((item, i) =>
        isHaveImage ? (
          <ContentCard
            key={i}
            data={item}
            index={i}
            focusedCardIndex={focusedCardIndex}
            onFocus={handleFocus}
            onBlur={handleBlur}
            md={md}
          />
        ) : (
          <ContentCard2
            key={i}
            data={item}
            index={i}
            focusedCardIndex={focusedCardIndex}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )
      )}
    </>
  );
}
