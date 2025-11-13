"use client";

import FramePage from "@/components/Frame";
import CatalogePage from "@/components/test/CatalogePage";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useState } from "react";
import { useRouter } from "next/navigation";

function SearchContent() {
  const router = useRouter()
  const [message, setMessage] = useState("");

  const handleSearch = () => {
    if (message.trim()) {
      router.push(`/search?message=${encodeURIComponent(message)}`);
    }
  };
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <FormControl
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              flexDirection: "row",
              gap: 1,
              
            }}
            variant="outlined"
          >
            <OutlinedInput
              size="small"
              id="search"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="查找..."
              sx={{ flexGrow: 1 }}
              startAdornment={
                <InputAdornment position="start" sx={{ color: "text.primary" }}>
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              }
              inputProps={{
                "aria-label": "search",
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  handleSearch();
                }
              }}
            />
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            搜索
          </Button>
        </Box>
      </Container>
    </>
  );
}

function NoMessageSearchPage() {
  return (
    <>
      <FramePage>
        <SearchContent></SearchContent>
      </FramePage>
    </>
  );
}

export default function SelectedPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") as string;

  return (
    <>
      {message ? (
        <CatalogePage catalogeName={message}></CatalogePage>
      ) : (
        <NoMessageSearchPage></NoMessageSearchPage>
      )}
    </>
  );
}
