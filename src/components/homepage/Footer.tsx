"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import SitemarkIcon from './SitemarkIcon';
import { Email } from '@mui/icons-material';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link color="text.secondary" href="https://qingshu.shop">
        情書
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <SitemarkIcon />
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
              加入情書
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              訂閱即可每週收到最新資訊。絕無垃圾郵件！
            </Typography>
            <InputLabel htmlFor="email-newsletter">信箱</InputLabel>
            <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                id="email-newsletter"
                hiddenLabel
                size="small"
                variant="outlined"
                fullWidth
                aria-label="Enter your email address"
                placeholder="您的郵件地址"
                slotProps={{
                  htmlInput: {
                    autoComplete: 'off',
                    'aria-label': 'Enter your email address',
                  },
                }}
                sx={{ width: '250px' }}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ flexShrink: 0 }}
              >
                訂閱
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' } ,
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            情書
          </Typography>
          <Link color="text.secondary" variant="body2" href="/selected">
            精選
          </Link>
          <Link color="text.secondary" variant="body2" href="/latest">
            最新
          </Link>
          <Link color="text.secondary" variant="body2" href="/confessing">
            表白專欄
          </Link>
          <Link color="text.secondary" variant="body2" href="/end">
            散場信箱
          </Link>
          <Link color="text.secondary" variant="body2" href="/blog_zh">
            中文文章
          </Link>
          <Link color="text.secondary" variant="body2" href="/shakespeare">
            莎士比亞
          </Link>
          <Link color="text.secondary" variant="body2" href="/ja">
            日文文章
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            情書Club
          </Typography>
          <Link color="text.secondary" variant="body2" href="/about">
            關於情書
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            願景
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            規劃
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            合法的
          </Typography>
          <Link color="text.secondary" variant="body2" href="/policy">
            隱私權政策
          </Link>
          <Link color="text.secondary" variant="body2" href="/service">
            服務條款
          </Link>
          <Link color="text.secondary" variant="body2" href="/about">
            關於我們
          </Link>
          <Link color="text.secondary" variant="body2" href="/contact">
            聯絡我們
          </Link>
          <Link color="text.secondary" variant="body2" href="/devlog">
            開發
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>
          <Link color="text.secondary" variant="body2" href="policy">
            隱私權政策
          </Link>
          <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" variant="body2" href="/service">
            服務條款
          </Link>
          <Copyright />
        </div>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: 'left', color: 'text.secondary' }}
        >
          {/* <IconButton
            color="inherit"
            size="small"
            href="/"
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="/"
            aria-label="X"
            sx={{ alignSelf: 'center' }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="/"
            aria-label="LinkedIn"
            sx={{ alignSelf: 'center' }}
          >
            <LinkedInIcon />
          </IconButton> */
          <IconButton
            color="inherit"
            size="small"
            href="/contact"
            aria-label="Email"
            sx={{ alignSelf: 'center' }}
          >
            <Email />
          </IconButton>}
        </Stack>
      </Box>
    </Container>
  );
}
