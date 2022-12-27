import { Box, styled, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface ThemeTextProps {
  children?: ReactNode;
}

/**
 * 最初始的做法
 * 可读性最好
 */
export function ThemeText1({ children }: ThemeTextProps) {
  const theme = useTheme();

  return (
    <div
      style={{
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius + 'px',
      }}
    >
      {children}
    </div>
  );
}

/**
 * 进阶做法
 * sx可接收theme作为参数
 */
export function ThemeText2({ children }: ThemeTextProps) {
  return (
    <Box
      sx={{
        color: theme => theme.palette.primary.contrastText,
        backgroundColor: theme => theme.palette.primary.main,
        padding: theme => theme.spacing(1),
        borderRadius: theme => theme.shape.borderRadius + 'px',
      }}
    >
      {children}
    </Box>
  );
}

/**
 * 高级做法
 * 1. 一次性获取theme参数
 * 2. 免去对children的书写
 */
export const ThemeText3 = styled('div')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

/**
 * 对于Box等mui自带类型,使用类名,而非字符串
 */
export const ThemeText4 = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

/**
 * 结论
 * 1. 封装好后的组件,若输入参数有且只有一个children属性,则推荐使用styled省行数
 * 2. 此外情况,为了可读性,使用完整的形式
 */
