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
} from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: (theme.vars || theme).palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
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

function Author({ authors }: { authors: { name: string; avatar: string }[] }) {
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
      <Typography variant="caption">July 14, 2021</Typography>
    </Box>
  );
}

// 单张卡片的数据类型
type CardItem = {
  img: string;
  tag: string;
  title: string;
  description: string;
  authors:{ name: string; avatar: string }[]
};



// 单卡组件
function MainContentCard({
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
  md?:number
}) {
  return (
    <Grid size={{ xs: 12, md: md }}>
      <StyledCard
        variant="outlined"
        onFocus={() => onFocus(index)}
        onBlur={onBlur}
        tabIndex={0}
        className={focusedCardIndex === index ? "Mui-focused" : ""}
      >
        <CardMedia
          component="img"
          alt={data.title}
          image={data.img}
          sx={{
            aspectRatio: "16 / 9",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        />
        <StyledCardContent>
          <Typography gutterBottom variant="caption" component="div">
            {data.tag}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {data.title}
          </Typography>
          <StyledTypography variant="body2" color="text.secondary" gutterBottom>
            {data.description}
          </StyledTypography>
        </StyledCardContent>
        <Author authors={data.authors} />
      </StyledCard>
    </Grid>
  );
}



// 网格组件：自动渲染多个卡片
export default function MainContentGrid({ data , md = 6}: { data: CardItem[] ,md?:number}) {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null
  );

  const handleFocus = (index: number) => setFocusedCardIndex(index);
  const handleBlur = () => setFocusedCardIndex(null);

  return (
    <Grid container spacing={2} columns={12}>
      {data.map((item, i) => (
        <MainContentCard
          key={i}
          data={item}
          index={i}
          focusedCardIndex={focusedCardIndex}
          onFocus={handleFocus}
          onBlur={handleBlur}
          md = {md}
        />
      ))}
    </Grid>
  );
}
